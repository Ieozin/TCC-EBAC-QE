class LoginPage {
  visit() {
    cy.visit("minha-conta/");
  }

  fillEmailLogin(email) {
    cy.get("#username").type(email);
  }

  fillPasswordLogin(password) {
    cy.get("#password").type(password, { log: false });
  }

  clickLogin() {
    cy.get('input[name="login"]').click();
  }

  fillEmailRegister(email) {
    cy.get("#reg_email").type(email);
  }

  fillPasswordRegister(password) {
    cy.get("#reg_password").type(password, { log: false });
  }

  clickRegister() {
    cy.get('input[name="register"]').click();
  }

  getWelcomeMessage(userName) {
    return cy
      .get(".woocommerce-MyAccount-content")
      .should("contain.text", `Olá, ${userName}`);
  }

  getErrorMessage() {
    return cy.get(".woocommerce-error > li");
  }
}
export default new LoginPage();
