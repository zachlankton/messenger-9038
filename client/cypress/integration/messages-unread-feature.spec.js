/// <reference types="cypress" />

  const thomas = {
    username: "thomas",
    password: "123456",
  };
  const santiago = {
    username: "santiago",
    password: "123456",
  };
  
  describe("Feature: Unread Message Count", () => {
  
    it("Unread Message Count for User is Correct", () => {
      cy.login(thomas.username, thomas.password);
  
      cy.contains("santiago").parent().parent().next().contains(2)
      cy.contains("chiumbo").parent().parent().next().contains(1)
      cy.contains("hualing").parent().parent().next().contains(12)

    });

    it("Unread Messages Reset when Chat Selected", () => {
        cy.reload();
        cy.login(thomas.username, thomas.password);

        cy.contains("santiago").click();
        cy.contains("chiumbo").click();
        cy.contains("hualing").click();

        cy.contains("santiago").parent().parent().next().contains("0")
        cy.contains("chiumbo").parent().parent().next().contains("0")
        cy.contains("hualing").parent().parent().next().contains("0")
    });
  
  });
  