describe('Страница конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('POST', 'api/auth/token', { statusCode: 200, body: {} });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    cy.setCookie('accessToken', 'mock-access-token');
    localStorage.setItem('refreshToken', 'mock-refresh-token');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    cy.clearLocalStorage('refreshToken');
  });

  it('должен добавить булку и ингредиент в конструктор', () => {
    cy.get('[data-testid="ingredient-item"]')
      .first()
      .within(() => {
        cy.contains('Добавить').click();
      });
    cy.get('[data-testid="ingredient-item"]')
      .eq(1)
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.get('[data-testid="constructor-elements-list"]')
      .find('[data-testid="constructor-element"]')
      .should('have.length', 3);
    // 2 булки
    cy.get('[data-testid="constructor-element"]')
      .first()
      .should('contain.text', 'Краторная булка N-200i (верх)');
    cy.get('[data-testid="constructor-element"]')
      .last()
      .should('contain.text', 'Краторная булка N-200i (низ)');

    // начинка
    cy.get('[data-testid="constructor-element"]')
      .eq(1)
      .should('contain.text', 'Биокотлета из марсианской Магнолии');
  });

  it('должен открыть модальное окно ингредиента и закрыть по крестику', () => {
    // Клик по карточке ингредиента
    cy.get('[data-testid="ingredient-item"]').first().click();
    // Проверяем открытие модального окна с деталями
    cy.get('#modals').contains('Детали ингредиента').should('be.visible');
    cy.get('#modals').contains('Краторная булка N-200i').should('be.visible');
    // Закрытие по крестику
    cy.get('#modals button').click();
    cy.get('#modals').should('be.empty');
  });

  it('должен закрыть модальное окно ингредиента по клику на оверлей', () => {
    cy.get('[data-testid="ingredient-item"]').first().click();
    cy.get('#modals').contains('Детали ингредиента').should('be.visible');
    // Клик по оверлею (используем data-атрибут или класс)
    cy.get('[data-testid="modal-overlay"]').click({ force: true });
    cy.get('#modals').should('be.empty');
  });

  it('должен создать заказ и очистить конструктор', () => {
    // Добавляем булку и начинку (обязательно)
    cy.get('[data-testid="ingredient-item"]')
      .first()
      .within(() => {
        cy.contains('Добавить').click();
      });
    cy.get('[data-testid="ingredient-item"]')
      .eq(2)
      .within(() => {
        cy.contains('Добавить').click();
      });
    // Клик по кнопке "Оформить заказ"
    cy.contains('button', 'Оформить заказ').click();
    // Ожидаем ответа от API создания заказа
    cy.wait('@createOrder');
    // Проверяем, что открылось модальное окно с номером заказа
    cy.get('#modals').contains('12345').should('be.visible');
    // Закрываем модальное окно
    cy.get('#modals button').click();
    // Проверяем, что конструктор пуст (нет выбранных ингредиентов)
    cy.get('.constructor-element_pos_top').should('not.exist');
    cy.get('.constructor-element_pos_bottom').should('not.exist');
    cy.get(
      '.constructor-element:not(.constructor-element_pos_top):not(.constructor-element_pos_bottom)'
    ).should('have.length', 0);
  });
});
