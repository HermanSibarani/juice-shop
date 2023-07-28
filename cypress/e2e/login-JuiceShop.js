/// <cypress types="cypress" />

let password = "test1234";
let mailadres = "";

describe("Login JuiceShop", () => {
  it("Registrate JuiceShop", () => {
    cy.visit("http://localhost:3000");
    cy.get(".close-dialog").click();
    cy.get(".cc-btn").click();
    cy.get("#navbarAccount").click();
    cy.get("#navbarLoginButton").click();
    cy.get("#newCustomerLink").click();

    cy.generateRandomEmail().then((email) => {
      cy.get("#emailControl").type(email);
      cy.log(email);
      mailadres = email;
    });

    cy.get("#passwordControl").type(password);
    cy.get("#repeatPasswordControl").type(password);

    cy.get(
      'mat-select[aria-label="Selection list for the security question"]'
    ).click(); // Klik om het dropdown-menu te openen
    cy.get("mat-option").contains("Your eldest siblings middle name?").click(); // Kies de gewenste optie

    cy.get("#securityAnswerControl").type("test");
    cy.get("#registerButton").click();
    cy.get(".mat-simple-snack-bar-content").should(
      "contain",
      "Registration completed successfully. You can now log in."
    );
  });

  it("Login JuiceShop", () => {
    cy.visit("http://localhost:3000");
    cy.get(".close-dialog").click();
    cy.get(".cc-btn").click();
    cy.get("#navbarAccount").click();
    cy.get("#navbarLoginButton").click();
    cy.get("#email").type(mailadres);
    cy.get("#password").type(password);
    cy.get("#loginButton").click();

    cy.get("#navbarAccount").click();
    cy.get("#navbarLoginButton").click();
    cy.get('.mat-menu-content > [aria-label="Go to user profile"]').should(
      "contain",
      mailadres
    );
  });
});
