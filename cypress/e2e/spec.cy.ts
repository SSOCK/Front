describe('Login', () => {
  it('Wrong Uswer', () => {
    cy.visit('http://localhost:3000/signin');
    cy.get('#email').type('test@test.com');
    cy.get('#password').type('123123');
    cy.get('#signin').click();
    cy.contains('아이디와 비밀번호를 다시 입력해주세요.');
  });

  it('Right Uswer', () => {
    cy.visit('http://localhost:3000/signin');
    cy.get('#email').type('test@test.com');
    cy.get('#password').type('testtest');
    cy.get('#signin').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
