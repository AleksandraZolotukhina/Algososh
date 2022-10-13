const chandingBorder = '4px solid rgb(210, 82, 225)'
const defaultBorder = '4px solid rgb(0, 50, 255)'

Cypress.Commands.add('addElement', (value) => {
    cy.get('@input').type(value).should('have.value', value);
    cy.get('@add-button').should('be.visible').click();
})

Cypress.Commands.add('checkNonEmptyColorCircle', (value, index) => {
    cy.get('[data-cy="circle"]').eq(index).find('[data-cy="border"]').should('have.css', 'border', chandingBorder).should('contain', value)
    cy.wait(500)
    cy.get('[data-cy="circle"]').eq(index).find('[data-cy="border"]').should('have.css', 'border', defaultBorder).should('contain', value)
})

Cypress.Commands.add('checkEmptyColorCircle', (index) => {
    cy.get('[data-cy="circle"]').eq(index).find('[data-cy="border"]').should('have.css', 'border', chandingBorder)
    cy.get('[data-cy="circle"]').eq(index).find('[data-testid="letter"]').should('be.empty')
    cy.wait(500)
    cy.get('[data-cy="circle"]').eq(index).find('[data-cy="border"]').should('have.css', 'border', defaultBorder)
    cy.get('[data-cy="circle"]').eq(index).find('[data-testid="letter"]').should('be.empty')
    
})