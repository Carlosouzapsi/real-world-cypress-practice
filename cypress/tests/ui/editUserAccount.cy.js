import sideBarComponents from "../../support/locators/components/sideBarComponents";
import userSettingsLocators from "../../support/locators/userSettingsPageLocators";

describe("edit user account tests", function () {
  const user = {
    userName: "Katharina_Bernier",
    password: "s3cret",
  };

  const userEdited = {
    firstname: "Tom",
    lastname: "Hanks",
    email: "tom.hank@world.com",
    phoneNumber: "777-222-1234",
  };
  before(function () {
    cy.visit("/");
    // 1)Logar com usuário registrado
    cy.uiLogin(user.userName, user.password);
  });
  beforeEach(function () {
    // 2)Clicar no menu de user setting
    cy.get(sideBarComponents.userSettingsMenu).click();
  });

  afterEach(function () {
    cy.reload();
  });
  it("Should edit user account first name using a valid value", function () {
    cy.get(userSettingsPageLocators.inputFirstName)
      .clear()
      .type(userEdited.firstname);
    cy.get(userSettingsLocators.saveBtn).click();

    cy.get(sideBarComponents.homeMenu).click();
    cy.get(sideBarComponents.userSettingsMenu).click();
    cy.get(userSettingsLocators.inputFirstName).should(
      "have.value",
      userEdited.firstname
    );
  });
});
