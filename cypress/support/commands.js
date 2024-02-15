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
    // const token = localStorage.getItem("authState");
    // cy.log(token);
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
