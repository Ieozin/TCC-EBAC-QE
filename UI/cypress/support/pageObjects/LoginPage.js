class LoginPage {
  visit() {
    cy.visit("minha-conta/");
  }

  fillEmailLogin(email) {
    cy.get("#username").clear().type(email);
  }

  fillPasswordLogin(password) {
    cy.get("#password").clear().type(password, { log: false });
  }

  clickLogin() {
    cy.get(".woocommerce-form > .button").click();
  }

  getWelcomeMessage(nomeUsuarioOuEmail) {
    const nomeBase = nomeUsuarioOuEmail.includes("@")
      ? nomeUsuarioOuEmail.split("@")[0]
      : nomeUsuarioOuEmail;

    cy.get(".woocommerce-MyAccount-content > :nth-child(2)", { timeout: 10000 })
      .should("contain.text", `Olá, ${nomeBase}`)
      .and("contain.text", `(não é ${nomeBase}? Sair)`);
  }

  getGenericErrorMessageElement() {
    return cy.get(".woocommerce-error > li", { timeout: 7000 });
  }

  getDirectErrorMessageElement() {
    return cy.get(".woocommerce-error", { timeout: 7000 });
  }

  clearLoginFields() {
    cy.get("#username").clear().should("have.value", "");
    cy.get("#password").clear().should("have.value", "");
  }
}
export default LoginPage;
