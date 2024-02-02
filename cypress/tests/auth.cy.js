import loginPageLocators from "../support/locators/loginPageLocators";
import homePageLocators from "../support/locators/homePageLocators";
import toastErrors from "../support/locators/components/toastComponents";

describe("login tests", function () {
  beforeEach(function () {
    cy.visit("/");
  });

  const user = {
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
  it("Should not do login with a non existent password", function () {
    cy.get(loginPageLocators.inputUsername).type(user.userName);
    cy.get(loginPageLocators.inputPassword).type("invalidPass");

    cy.get(loginPageLocators.btnSignIn).click();

    cy.get(toastErrors.signError)
      .should("exist")
      .contains("Username or password is invalid");
  });
  it("Should display an input error when using a blank username", function () {
    cy.get(loginPageLocators.inputUsername).type("testBlank").clear();
    cy.get(loginPageLocators.inputPassword).type(user.password);

    cy.get("#username-helper-text")
      .should("exist")
      .contains("Username is required");
    cy.get(loginPageLocators.btnSignIn).should("have.attr", "disabled");
  });

  it("Should display an input error when using a blank password", function () {
    cy.get(loginPageLocators.inputUsername).type(user.userName);
    cy.get(loginPageLocators.inputPassword).type(" ");

    cy.get(loginPageLocators.btnSignIn).should("have.attr", "disabled");
  });
  it("Should display an input error when password doesn't has at least 4 characters", function () {
    cy.get(loginPageLocators.inputUsername).type(user.userName);
    cy.get(loginPageLocators.inputPassword).type("1234{backspace}");

    // Helper
    cy.get(loginPageLocators.inputUsername).click();

    cy.get("#password-helper-text")
      .should("exist")
      .contains("Password must contain at least 4 characters");

    cy.get(loginPageLocators.btnSignIn).should("have.attr", "disabled");
  });
  it("Should do logout with a valid logged user", function () {
    cy.get(loginPageLocators.inputUsername).type(user.userName);
    cy.get(loginPageLocators.inputPassword).type(user.password);

    cy.get(loginPageLocators.btnSignIn).click();

    cy.get(homePageLocators.homeAppTitle).should("exist");

    cy.get(homePageLocators.homeLogOutBtn).click();

    cy.location("pathname").should("equal", "/signin");
  });
});
