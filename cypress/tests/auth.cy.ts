import loginPageLocators from "../support/locators/loginPageLocators";
import homePageLocators from "../support/locators/homePageLocators";
import toastErrors from "../support/locators/components/toastComponents";

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

    cy.get(loginPageLocators.btnSignIn).click();

    cy.get(homePageLocators.homeAppTitle).should("exist");
  });
  it("Should not do login with a non existent username", function () {
    cy.get(loginPageLocators.inputUsername).type("nonUser");
    cy.get(loginPageLocators.inputPassword).type(user.password);

    cy.get(loginPageLocators.btnSignIn).click();

    cy.get(toastErrors.signError)
      .should("exist")
      .contains("Username or password is invalid");
  });
});
