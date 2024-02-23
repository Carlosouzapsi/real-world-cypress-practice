import homePageLocators from "./locators/homePageLocators";
import loginPageLocators from "./locators/loginPageLocators";

Cypress.Commands.add("apiLogin", (username, password) => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/login`,
    body: {
      username,
      password,
    },
  }).then((response) => {
    // cy.window()
    //   .its("localStorage")
    //   .invoke("getItem", "authState")
    //   .should("exist");
    // cy.getCookie("connect.sid").then((cookie) => {
    //   cy.setCookie("connect.sid", cookie.value);
    // });

    expect(response.status).to.eq(200);
  });
});

Cypress.Commands.add(
  "findUserOnDB",
  (operation, entity, query, logTask = false) => {
    const params = {
      entity,
      query,
    };
    return cy
      .task(`${operation}:database`, params, { log: logTask })
      .then((data) => {
        return data;
      });
  }
);

Cypress.Commands.add("uiLogin", (username, password) => {
  cy.get(loginPageLocators.inputUsername).type(username);
  cy.get(loginPageLocators.inputPassword).type(password);

  cy.get(loginPageLocators.btnSignIn).click();

  cy.get(homePageLocators.homeAppTitle).should("exist");
});

Cypress.Commands.add("PostUser", (username, password) => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/login`,
    body: {
      firstName: "Carlos",
      lastName: "Souza",
      username: "carlos.souza",
      password: "pwd123",
      confirmPassword: "pwd123",
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});
