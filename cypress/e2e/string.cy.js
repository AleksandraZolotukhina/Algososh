describe('Тестирование Строки', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/recursion')
        cy.get('input').as('input')
        cy.get('[data-cy="button"]').as('add-button')
    })
    it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('@input').invoke('val', '')
        cy.get('@add-button').should('be.disabled')
    })
    it('Строка разворачивается корректно', () => {
        cy.addElement('1234')
        
        const circles = cy.get('[data-testid="circles"]')
        const modifedBorder = '4px solid rgb(127, 224, 81)'
        const chandingBorder = '4px solid rgb(210, 82, 225)'
        const defaultBorder = '4px solid rgb(0, 50, 255)'

        circles.get('[data-cy="circle"]').eq(0).find('[data-cy="border"]').should('have.css', 'border', chandingBorder).should('contain', '1')
        circles.get('[data-cy="circle"]').eq(1).find('[data-cy="border"]').should('have.css', 'border', defaultBorder).should('contain', '2')
        circles.get('[data-cy="circle"]').eq(2).find('[data-cy="border"]').should('have.css', 'border', defaultBorder).should('contain', '3')
        circles.get('[data-cy="circle"]').eq(3).find('[data-cy="border"]').should('have.css', 'border', chandingBorder).should('contain', '4')

        cy.wait(500)

        circles.get('[data-cy="circle"]').eq(0).find('[data-cy="border"]').should('have.css', 'border', modifedBorder).should('contain', '4')
        circles.get('[data-cy="circle"]').eq(1).find('[data-cy="border"]').should('have.css', 'border', chandingBorder).should('contain', '2')
        circles.get('[data-cy="circle"]').eq(2).find('[data-cy="border"]').should('have.css', 'border', chandingBorder).should('contain', '3')
        circles.get('[data-cy="circle"]').eq(3).find('[data-cy="border"]').should('have.css', 'border', modifedBorder).should('contain', '1')

        cy.wait(500)

        circles.get('[data-cy="circle"]').eq(0).find('[data-cy="border"]').should('have.css', 'border', modifedBorder).should('contain', '4')
        circles.get('[data-cy="circle"]').eq(1).find('[data-cy="border"]').should('have.css', 'border', modifedBorder).should('contain', '3')
        circles.get('[data-cy="circle"]').eq(2).find('[data-cy="border"]').should('have.css', 'border', modifedBorder).should('contain', '2')
        circles.get('[data-cy="circle"]').eq(3).find('[data-cy="border"]').should('have.css', 'border', modifedBorder).should('contain', '1')
    })
})