describe("template spec", function () {
  interface User {
    userName: string;
    password: string;
  }

  it("Should do login with valid credentials", function () {
    cy.visit("/");
    const user: User = {
      userName: "Katharina_Bernier",
      password: "s3cret",
    };

    cy.get("#username").type(user.userName);
    cy.get("#password").type(user.password);

    cy.get("[data-test='signin-submit']").click();

    cy.get("[data-test='app-name-logo']").should("exist");
  });
  it("Should not do login with a non existent username", function () {});
});
