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
