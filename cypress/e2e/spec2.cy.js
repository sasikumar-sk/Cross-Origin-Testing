

describe('Bitrix24 Login and Feed Verification', () => {
  const email = 'qa_Master123@protonmail.com'; // Provided email
  const password = 'qfhz4p,98aXHTU%'; // Provided password

  it('should log in and verify the Feed is visible', () => {
    // Step 1: Handle initial navigation and email input within Bitrix24.in domain
    cy.origin('https://b24-cukfu9.bitrix24.in', { args: { email } }, ({ email }) => {
      cy.on('uncaught:exception', (e) => {
        if (e.message.includes('Failed to read a named property')) {
          // Ignore this error and let the test continue
          return false;
        }
      });

      // Visit the main page and enter email
      cy.visit('https://b24-cukfu9.bitrix24.in/stream/');
      cy.get('#login', { timeout: 20000 }).should('be.visible').type(email);
      cy.contains('Next').click();
    });

    // Step 2: Handle redirection to Bitrix24.net domain and enter the password
    cy.origin('https://www.bitrix24.net', { args: { password } }, ({ password }) => {
      cy.on('uncaught:exception', (e) => {
        if (e.message.includes('Failed to read a named property')) {
         
          return false;
        }
      });

      // Enter password
      cy.get('#password', { timeout: 20000 }).should('be.visible').type(password);
      cy.contains('Next').click();
    });

    // Step 3: Handle final verification within Bitrix24.in domain
    cy.origin('https://b24-cukfu9.bitrix24.in', () => {
      cy.on('uncaught:exception', (e) => {
        if (e.message.includes('Failed to read a named property')) {
        
          return false;
        }
      });

      // Revisit the main page and verify Feed
      cy.visit('https://b24-cukfu9.bitrix24.in/stream/?current_fieldset=SOCSERV');
      cy.get('#pagetitle', { timeout: 20000 }).should('be.visible').contains('Feed');
    });
  });
});