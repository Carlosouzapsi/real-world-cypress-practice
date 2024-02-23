import signupPageLocators from "../../support/locators/signupPageLocators";
import loginPageLocators from "../../support/locators/loginPageLocators";
import helpersComponents from "../../support/locators/components/helpersComponents";

describe("create new user account tests", () => {
  beforeEach(() => {
    cy.task("db:seed");
    cy.visit("/");
  });
  const user = {
    firstName: "John",
    lastName: "Doe",
    userName: "doeJohn",
    password: "pwd123",
    passConfirm: "pwd123",
  };
  it("Should create a new user account using valid credentials", () => {
    cy.get(loginPageLocators.btnLinkSignup).click();

    cy.location("pathname").should("equal", "/signup");

    cy.get(signupPageLocators.inputFirstName).type(user.firstName);
    cy.get(signupPageLocators.inputLastName).type(user.lastName);
    cy.get(signupPageLocators.inputUserName).type(user.userName);
    cy.get(signupPageLocators.inputPassword).type(user.password);
    cy.get(signupPageLocators.inputConfirmPass).type(user.passConfirm);

    cy.get(signupPageLocators.btnSignup).click();

    cy.findUserOnDB("filter", "users").then((users) => {
      const comparedUser = user.userName;
      const userFound = users.find((user) => user.username === comparedUser);
      expect(userFound.username).to.eq("doeJohn");
    });
  });
  it("Should not create a new user account using blank values on firstname input", () => {
    cy.get(loginPageLocators.btnLinkSignup).click();

    cy.get(signupPageLocators.inputFirstName).type(user.firstName).clear();

    cy.get(signupPageLocators.inputLastName).type(user.lastName);
    cy.get(signupPageLocators.inputUserName).type(user.userName);
    cy.get(signupPageLocators.inputPassword).type(user.password);
    cy.get(signupPageLocators.inputConfirmPass).type(user.passConfirm);

    cy.get(helpersComponents.firstNameHelper)
      .should("exist")
      .contains("First Name is required");
    cy.get(signupPageLocators.btnSignup).should("have.attr", "disabled");
  });

  it("Should not create a new user account using blank values on lastname input", () => {
    cy.get(loginPageLocators.btnLinkSignup).click();

    cy.get(signupPageLocators.inputFirstName).type(user.firstName);

    cy.get(signupPageLocators.inputLastName).type(user.lastName).clear();
    cy.get(signupPageLocators.inputUserName).type(user.userName);
    cy.get(signupPageLocators.inputPassword).type(user.password);
    cy.get(signupPageLocators.inputConfirmPass).type(user.passConfirm);

    cy.get(helpersComponents.lastNameHelper)
      .should("exist")
      .contains("Last Name is required");
    cy.get(signupPageLocators.btnSignup).should("have.attr", "disabled");
  });

  it("Should not create a new user account using blank values on username input", () => {
    cy.get(loginPageLocators.btnLinkSignup).click();

    cy.get(signupPageLocators.inputFirstName).type(user.firstName);

    cy.get(signupPageLocators.inputLastName).type(user.lastName);
    cy.get(signupPageLocators.inputUserName).type(user.userName).clear();
    cy.get(signupPageLocators.inputPassword).type(user.password);
    cy.get(signupPageLocators.inputConfirmPass).type(user.passConfirm);

    cy.get(helpersComponents.userNameHelper)
      .should("exist")
      .contains("Username is required");
    cy.get(signupPageLocators.btnSignup).should("have.attr", "disabled");
  });

  it("Should not create a new user account using blank values on password input", () => {
    cy.get(loginPageLocators.btnLinkSignup).click();

    cy.get(signupPageLocators.inputFirstName).type(user.firstName);

    cy.get(signupPageLocators.inputLastName).type(user.lastName);
    cy.get(signupPageLocators.inputUserName).type(user.userName);
    cy.get(signupPageLocators.inputPassword).type(user.password).clear();
    cy.get(signupPageLocators.inputConfirmPass).type(user.passConfirm);

    cy.get(helpersComponents.passwordHelper)
      .should("exist")
      .contains("Enter your password");
    cy.get(signupPageLocators.btnSignup).should("have.attr", "disabled");
  });
  it("Should not create a new user account using blank values on confirm password input", () => {
    cy.get(loginPageLocators.btnLinkSignup).click();

    cy.get(signupPageLocators.inputFirstName).type(user.firstName);

    cy.get(signupPageLocators.inputLastName).type(user.lastName);
    cy.get(signupPageLocators.inputUserName).type(user.userName);
    cy.get(signupPageLocators.inputPassword).type(user.password);
    cy.get(signupPageLocators.inputConfirmPass).type(user.passConfirm).clear();

    // Workaround to trigger helper
    cy.get(signupPageLocators.inputPassword).click();

    cy.get(helpersComponents.confirmPassHelper)
      .should("exist")
      .contains("Confirm your password");
    cy.get(signupPageLocators.btnSignup).should("have.attr", "disabled");
  });

  it("Should not create a new user account using confirm password different than password", () => {
    cy.get(loginPageLocators.btnLinkSignup).click();

    cy.get(signupPageLocators.inputFirstName).type(user.firstName);

    cy.get(signupPageLocators.inputLastName).type(user.lastName);
    cy.get(signupPageLocators.inputUserName).type(user.userName);
    cy.get(signupPageLocators.inputPassword).type(user.password);
    cy.get(signupPageLocators.inputConfirmPass).type("pwd1235");

    cy.get(helpersComponents.confirmPassHelper)
      .should("exist")
      .contains("Password does not match");
    cy.get(signupPageLocators.btnSignup).should("have.attr", "disabled");
  });
  it("Should not create a new user account using less than 4 characters on password field", () => {
    cy.get(loginPageLocators.btnLinkSignup).click();

    cy.get(signupPageLocators.inputFirstName).type(user.firstName);

    cy.get(signupPageLocators.inputLastName).type(user.lastName);
    cy.get(signupPageLocators.inputUserName).type(user.userName);
    cy.get(signupPageLocators.inputPassword).type("pwd");
    cy.get(signupPageLocators.inputConfirmPass).type("pwd");

    cy.get(helpersComponents.passwordHelper)
      .should("exist")
      .contains("Password must contain at least 4 characters");
    cy.get(signupPageLocators.btnSignup).should("have.attr", "disabled");
  });
});
