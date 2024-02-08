describe("create account tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  const user = {
    firstName: "John",
    lastName: "Doe",
    userName: "doeJohn",
    password: "pwd123",
    passConfirm: "pwd123",
  };
  it("Should create a new account using valid credentials", () => {
    cy.get("[data-test='signup']").click();

    cy.location("pathname").should("equal", "/signup");

    cy.get("#firstName").type(user.firstName);
    cy.get("#lastName").type(user.lastName);
    cy.get("#username").type(user.userName);
    cy.get("#password").type(user.password);
    cy.get("#confirmPassword").type(user.passConfirm);

    cy.get('[data-test="signup-submit"]').click();

    // TODO - validate new user
  });
});
