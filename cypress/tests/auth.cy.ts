import loginPageLocators from "../support/locators/loginPageLocators";

describe("login", function () {
  beforeEach(function () {
    cy.visit("/");
  });

  interface User {
    userName: string;
    password: string;
  }

  const user: User = {
    userName: "Katharina_Bernier",
    password: "s3cret",
  };

  it("Should do login with valid credentials", function () {
    cy.get(loginPageLocators.inputUsername).type(user.userName);
    cy.get(loginPageLocators.inputPassword).type(user.password);

    cy.get("[data-test='signin-submit']").click();

    cy.get("[data-test='app-name-logo']").should("exist");
  });
  it("Should not do login with a non existent username", function () {});
});
