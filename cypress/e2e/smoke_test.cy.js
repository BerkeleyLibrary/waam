/// <reference types="cypress" />

context('Smoke test', () => {
    it('loads the home page', () => {
        cy.visit('/');
        cy.contains('What is WAAMD?');
    });

    it('returns title search result', () => {
        cy.visit('/titles');
        const query = 'نوازل';
        const expected = 'Showing 1 to';
        cy.get('#search-query-input').type(`${query}{enter}`);
        cy.contains(expected);
    });
});
