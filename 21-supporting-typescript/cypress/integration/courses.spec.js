describe("The Home Page courses section", () => {
  it("displays courses", () => {
    cy.visit("/");
    cy.findByRole("heading", { name: /Courses/i }).should("exist");
    cy.findByRole("heading", { name: /Vue 3/i }).should("exist");
  });

  it("filters courses by category", () => {
    cy.visit("/");
    cy.findByRole("button", { name: /show filters/i }).click();
    cy.findByLabelText(/backend/i).click();

    cy.findByRole("heading", { name: /DDD en Java/i }).should("exist");
    cy.findByRole("heading", { name: /DDD en PHP/i }).should("exist");
    cy.findByRole("heading", { name: /Vue 3/i }).should("not.exist");
    cy.findByRole("heading", { name: /Makefiles/i }).should("not.exist");
  });
});
