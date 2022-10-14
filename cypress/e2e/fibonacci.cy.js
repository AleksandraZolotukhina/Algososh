describe('Тестирование Фибоначчи', () => {

    beforeEach(() => {
        cy.visit('fibonacci')
        cy.get('[data-testid="circles"]').as('circles')
        cy.get('input').as('input')
        cy.get('[data-cy="add"]').as('add-button')
    })

    it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('@input').invoke('val', '')
        cy.get('@add-button').should('be.disabled')
    })

    it('Числа генерируются корректно', () => {
        cy.addElement('4')
        cy.wait(3000)

        cy.get('@circles').get('[data-cy="circle"]').each($circle => {
            cy.wrap($circle).find('[data-cy="border"]').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        })
        cy.get('@circles').get('[data-cy="circle"]').eq(0).should('contain', '0')
        cy.get('@circles').get('[data-cy="circle"]').eq(1).should('contain', '1')
        cy.get('@circles').get('[data-cy="circle"]').eq(2).should('contain', '1')
        cy.get('@circles').get('[data-cy="circle"]').eq(3).should('contain', '2')
        cy.get('@circles').get('[data-cy="circle"]').eq(4).should('contain', '3')

    })
})