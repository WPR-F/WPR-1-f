describe('GoogleLogin', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
    });



    it('should handle Google login', () => {
        // Set up the routes
        cy.intercept('POST', 'http://localhost:5210/api/accounts/postbyemail', {
            body: {
                email: 'ta@gmail.com',
                // Add other fields that your application expects in the response
            },
        });

        cy.intercept('POST', 'http://localhost:5210/api/accounts/google', {
            statusCode: 201,
            body: {
                id: '123',
                userName: 'testUser',
                email: 'test@example.com',
                // Add other properties that the User object has
            },
        });

        // Visit the page and click the login button
        cy.visit('http://localhost:5173/login');
        cy.get('.google-Login-Button-container').click();



        // Add assertions to check that your application handles the fake responses correctly
        cy.url().should('include', 'http://localhost:5173/profielpagina');
    });


    // it('should display the login button', () => {
    //     // cy.get('[data-cy=google-login-button]').should('be.visible'); // replace with actual selector

    //     // cy.get('[data-cy=google-Login-Button-container]').should('be.visible'); 
    //     cy.get('.google-Login-Button-container').should('be.visible'); 

    // });



    // it('should redirect to Google on click', () => {
    //     cy.get('.google-Login-Button-container').click();
    //     cy.url().should('include', 'https://accounts.google.com/');
    // });


});