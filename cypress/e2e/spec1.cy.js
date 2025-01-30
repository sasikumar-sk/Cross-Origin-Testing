 
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
}); 