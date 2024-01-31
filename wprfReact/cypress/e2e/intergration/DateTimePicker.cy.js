describe('DateTimePicker', () => {
    beforeEach(() => {
      cy.visit('/path-to-page-with-datetimepicker'); // replace with actual path
    });
  
    it('should display the date picker', () => {
      cy.get('[data-cy=datetime-picker]').should('be.visible'); // replace with actual selector
    });
  
    it('should allow date selection', () => {
      cy.get('[data-cy=datetime-picker]').click(); // open the date picker
      cy.get('[data-cy=datetime-picker-day]').click(); // select a day
      // add assertions to check if the selected date is displayed/used correctly
    });
  });