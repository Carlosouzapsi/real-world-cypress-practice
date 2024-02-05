/*
Try to use the chatGPT function to do login via API
and use the header to nav on the system
*/
Cypress.Commands.add("apiLogin", (username, password) => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/login`,
    body: {
      username,
      password,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});
