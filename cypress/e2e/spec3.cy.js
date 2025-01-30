 
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
