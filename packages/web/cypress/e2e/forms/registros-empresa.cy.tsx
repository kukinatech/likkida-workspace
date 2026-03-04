import { fakerPT_PT as faker } from "@faker-js/faker";

const generateNifEmpresa = () => (
  `${faker.helpers.shuffle([1, 2, 5])[0]}${faker.helpers.replaceSymbols('#########')}`
)
const generateNifSingular = () => (`${faker.helpers.replaceSymbols('#########??###')}`)


describe('Formulário de Login', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/registrar-empresa'); // URL da sua aplicação
  });

  it('deve preencher todos os campos e submeter o formulário', () => {

    cy.intercept('POST', '/api/empresas', (req) => {

      const empresa = {
        id: faker.string.uuid(),
        nome: faker.company.name(),
        email: faker.internet.email(),
        empresaId: faker.string.uuid()
      }
      console.debug()
      req.reply({ delay: 2000, statusCode: 201, body: { data: empresa} })
    })
    // Campos obrigatórios
    cy.get('[data-cy="empresa-nome"]')
      .type(faker.company.name());

    cy.get('[data-cy="empresa-nif"]')
      .type(generateNifEmpresa());

    cy.get('[data-cy="empresa-email"]')
      .type('empresa@teste.co.ao');

    // Campos opcionais
    cy.get('[data-cy="empresa-contactos"]')
      .type('+244 923 000 000');

    cy.get('[data-cy="empresa-endereco"]')
      .type('Rua da Missão, nº 10, Luanda');

    // Submeter
    cy.get('[data-cy="empresa-submit"]').click();
  });

  // it('deve exibir erros ao submeter formulário vazio', () => {
  //   cy.get('[data-cy="empresa-submit"]').click();

  //   cy.contains('O nome da empresa é obrigatório').should('be.visible');
  //   cy.contains('O nif da empresa é obrigatório').should('be.visible');
  // });

  // it('deve bloquear inputs enquanto está a carregar', () => {
  //   // Interceta para simular loading
  //   cy.intercept('POST', '/api/empresas', (req) => {
  //     req.reply({ delay: 2000, statusCode: 200, body: { } });
  //   }).as('registarEmpresa');

  //   cy.get('[data-cy="empresa-nome"]').type('Empresa Teste Lda');
  //   cy.get('[data-cy="empresa-nif"]').type('123456789');
  //   cy.get('[data-cy="empresa-email"]').type('empresa@teste.co.ao');
  //   cy.get('[data-cy="empresa-submit"]').click();

  //   // Durante o loading, inputs devem estar desabilitados
  //   cy.get('[data-cy="empresa-nome"]').should('be.disabled');
  //   cy.get('[data-cy="empresa-nif"]').should('be.disabled');
  //   cy.get('[data-cy="empresa-email"]').should('be.disabled');

  //   cy.wait('@registarEmpresa');
  // });

  // it('deve registar empresa com sucesso', () => {
  //   cy.intercept('POST', '/api/empresas', {
  //     statusCode: 201,
  //     body: { id: 1, nome: 'Empresa Teste Lda' }
  //   }).as('registarEmpresa');

  //   cy.get('[data-cy="empresa-nome"]').type('Empresa Teste Lda');
  //   cy.get('[data-cy="empresa-nif"]').type('123456789');
  //   cy.get('[data-cy="empresa-email"]').type('empresa@teste.co.ao');
  //   cy.get('[data-cy="empresa-contactos"]').type('+244 923 000 000');
  //   cy.get('[data-cy="empresa-endereco"]').type('Rua da Missão, nº 10, Luanda');

  //   cy.get('[data-cy="empresa-submit"]').click();
  //   cy.wait('@registarEmpresa');

  //   // Verifica redirecionamento ou mensagem de sucesso
  //   cy.url().should('include', '/dashboard');
  // });


});