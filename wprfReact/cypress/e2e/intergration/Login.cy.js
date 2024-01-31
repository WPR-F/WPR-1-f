describe('LoginForm', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
    });

    it('logs in successfully', () => {

        // Fill in the form and submit it
        cy.get('input[type="text"]').type('ta@gmail.com');
        cy.get('input[type="password"]').type('Test@123');
        cy.get('button[type="submit"]').click();
        
        // Check that the user is redirected to '/profielpagina'
        cy.url().should('include', '/profielpagina');
    });
});