describe("create account tests", () => {
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
  it("Should create a new account using valid credentials", () => {
    cy.get("[data-test='signup']").click();

    cy.location("pathname").should("equal", "/signup");

    cy.get("#firstName").type(user.firstName);
    cy.get("#lastName").type(user.lastName);
    cy.get("#username").type(user.userName);
    cy.get("#password").type(user.password);
    cy.get("#confirmPassword").type(user.passConfirm);

    cy.get('[data-test="signup-submit"]').click();

    cy.findUserOnDB("filter", "users").then((users) => {
      const comparedUser = user.userName;
      const userFound = users.find((user) => user.username === comparedUser);
      expect(userFound.username).to.eq("doeJohn");
    });
  });
});
