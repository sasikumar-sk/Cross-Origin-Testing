/*describe('Bitrix24 Login and Feed Verification', () => {
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
          // Ignore this error and let the test continue
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
          // Ignore this error and let the test continue
          return false;
        }
      });

      // Revisit the main page and verify Feed
      cy.visit('https://b24-cukfu9.bitrix24.in/stream/?current_fieldset=SOCSERV');
      cy.get('#pagetitle', { timeout: 20000 }).should('be.visible').contains('Feed');
    });
  });
});*/




/*
 
describe("Bitrix24 Login Test", () => {
  it("should log in successfully and navigate to the dashboard", () => {
    cy.visit("https://b24-cukfu9.bitrix24.in/stream/");

    cy.on("uncaught:exception", (err) => {
      if (
        err.message.includes("Blocked a frame with origin") ||
        err.message.includes(
          "Failed to set a named property 'href' on 'Location'"
        ) ||
        err.message.includes("Cannot read properties of undefined") ||
        err.message.includes("BSBBW is not defined")
      ) {
        return false;
      }
    });
    cy.get("#login").clear().type("qa_Master123@protonmail.com");
    cy.get(".ui-btn-success").should("have.text", "Next").click();
    cy.wait(1000);
    // Enter the password
    cy.get("#password").clear().type("qfhz4p,98aXHTU%");
    cy.get(".ui-btn-success").should("have.text", "Next").click();
    cy.wait(3000);
    cy.visit("https://b24-cukfu9.bitrix24.in/stream/");
    cy.visit("https://b24-cukfu9.bitrix24.in/stream/");

    cy.wait(3000);
    // Click the menu item to open the calendar
    cy.get("div.menu-items-header div.menu-switcher").click();

    // Click the Calendar menu link
    cy.get(
      'li[id="bx_left_menu_menu_calendar"] a[class="menu-item-link"]'
    ).click();

    // Wait for the calendar to load
    cy.wait(2000);

    cy.get('button[class="ui-btn-main"]').click();

    // Wait for the calendar slider (event creation sidebar) to appear
    cy.get(
      ".calendar-slider-calendar-wrap.calendar-slider-calendar-wrap-edit"
    ).should("be.visible");

    cy.get("#calendar_edit_slider_363375115_date_from").click();
    cy.get(".calendar-slider-calendar-wrap").within(() => {
      // Choose a date from the calendar, e.g., the 10th day
      cy.contains("10").click();
    });

    cy.get("#calendar_edit_slider_363375115_date_to").click();
    cy.get(".calendar-slider-calendar-wrap").within(() => {
      cy.contains("11").click();
    });

    cy.get("#calendar_edit_slider_363375115_save").click();

    cy.wait(2000);
    cy.get(".toast-message")
      .should("be.visible")
      .and("contain.text", "Event has been successfully created"); // Check the toast message

    cy.contains("10").should("be.visible");
  });
});*/
 




describe('Bitrix24 Login Test', () => {
  it('should log in successfully and navigate to the calendar', () => {
    const email = 'qa_Master123@protonmail.com';
    const password = 'qfhz4p,98aXHTU%';

    cy.loginToBitrix(email, password);
    cy.visit("https://b24-cukfu9.bitrix24.in/stream/");
    cy.visit('https://b24-cukfu9.bitrix24.in/stream/');
    cy.on("uncaught:exception", (err) => {
      if (
        err.message.includes("Blocked a frame with origin") ||
        err.message.includes(
          "Failed to set a named property 'href' on 'Location'"
        ) ||
        err.message.includes("Cannot read properties of undefined") ||
        err.message.includes("BSBBW is not defined")
      ) {
        return false;
      }
    });
    cy.wait(3000);
    cy.navigateToCalendar();

 
    cy.get('button.ui-btn-main', { timeout: 20000 })
      .should('be.visible')
      .click();

    // Wait for the calendar slider (event creation sidebar) to appear
    cy.get('.calendar-slider-calendar-wrap.calendar-slider-calendar-wrap-edit', { timeout: 20000 })
      .should('be.visible');

    // Select the start date
    cy.get('#calendar_edit_slider_363375115_date_from').click();
    cy.get('.calendar-slider-calendar-wrap').within(() => {
      cy.contains('10').click();
    });

    // Select the end date
    cy.get('#calendar_edit_slider_363375115_date_to').click();
    cy.get('.calendar-slider-calendar-wrap').within(() => {
      cy.contains('11').click();
    });

    // Save the event
    cy.get('#calendar_edit_slider_363375115_save').click();

    // Wait for the event to be saved and the toast message to appear
    cy.get('.toast-message', { timeout: 20000 })
      .should('be.visible')
      .and('contain.text', 'Event has been successfully created');

    // Verify the event is visible on the calendar
    cy.contains('10', { timeout: 20000 }).should('be.visible');
  });
});
