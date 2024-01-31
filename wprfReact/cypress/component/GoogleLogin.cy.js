describe('GoogleLogin', () => {
    beforeEach(() => {
        // cy.visit('/path-to-page-with-googlelogin'); // replace with actual path
        cy.visit('wprfReact\src\Google\GoogleLogin.jsx'); 
    });

    it('should display the login button', () => {
        // cy.get('[data-cy=google-login-button]').should('be.visible'); // replace with actual selector
        
        cy.get('[data-cy=google-login-button]').should('be.visible'); 
    });

    // This is a simplified example. In a real-world scenario, you would likely need to handle Google's OAuth flow.


    it('should redirect to Google on click', () => {
        cy.get('[data-cy=google-login-button]').click();
        // add assertions to check if the user is redirected to Google
    });
});