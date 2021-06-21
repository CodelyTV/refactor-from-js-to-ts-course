describe("The Home Page form", () => {
  it("displays error message if form data is incorrect", () => {
    cy.visit("/");

    cy.findByLabelText(/First name/i).type("Jane");
    cy.findByLabelText(/Last name/i).type("Doe");
    cy.findByLabelText(/email/i).type("a@a.com");
    cy.findByLabelText(/date of birth/i).type("2010-01-01");
    cy.findByLabelText(/country/i).select("Andorra");
    cy.findByLabelText(/course category/i).select("Frontend");
    cy.findByLabelText(/Tell us a bit about yourself/i).type("Lorem ipsum");
    cy.findByRole("button", { name: /submit/i }).click();

    cy.findByText(/There is an error/i).should("exist");
  });

  it("displays thank you message when submitting the form", () => {
    cy.visit("/");

    cy.findByLabelText(/First name/i).type("Jane");
    cy.findByLabelText(/Last name/i).type("Doe");
    cy.findByLabelText(/email/i).type("a@a.com");
    cy.findByLabelText(/date of birth/i).type("1980-01-01");
    cy.findByLabelText(/country/i).select("Andorra");
    cy.findByLabelText(/course category/i).select("Frontend");
    cy.findByLabelText(/Tell us a bit about yourself/i).type("Lorem ipsum");
    cy.findByRole("button", { name: /submit/i }).click();

    cy.findByRole("heading", { name: /Thank you/i }).should("exist");
  });
});
