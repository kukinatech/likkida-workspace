
describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });
  it('deve preencher todos os campos e submeter o formulário', () => {
    cy.get('[data-cy="login-email"]')
      .type('admin@demo.com');

    cy.get('[data-cy="login-password"]')
      .type('123456');
    cy.get('[data-cy="login-submit"]')
      .click()
  });
})