// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



// cypress/support/commands.js
import 'cypress-iframe';

Cypress.Commands.add('getIframeID', (iframeSelector) => {
    return cy.get(iframeSelector)
      .its('0.contentDocument') // Access the iframe's document
      .its('body') // Get the body of the iframe
      .should('not.be.empty') // Ensure that the iframe content is loaded
      .then(cy.wrap); // Wrap the body to use Cypress commands on it
  });
  


  Cypress.Commands.add('loginToBitrix', (email, password) => {
  cy.visit('https://b24-cukfu9.bitrix24.in/stream/');

  cy.get('#login', { timeout: 20000 }).clear().type(email);
  cy.get('.ui-btn-success').should('have.text', 'Next').click();
  cy.get('#password', { timeout: 20000 }).clear().type(password);
  cy.get('.ui-btn-success').should('have.text', 'Next').click();
});

Cypress.Commands.add('navigateToCalendar', () => {
  cy.visit('https://b24-cukfu9.bitrix24.in/stream/');

  cy.get('div.menu-items-header div.menu-switcher', { timeout: 20000 })
    .should('be.visible')
    .click();

  cy.get('li[id="bx_left_menu_menu_calendar"] a[class="menu-item-link"]', { timeout: 20000 })
    .should('be.visible')
    .click();
});
