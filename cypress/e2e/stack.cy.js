describe('Тестирование Стека', () => {

    const chandingBorder = '4px solid rgb(210, 82, 225)'
    const defaultBorder = '4px solid rgb(0, 50, 255)'

    beforeEach(() => {
        cy.visit('stack')
        cy.get('input').as('input')
        cy.get('[data-cy="add"]').as('add-button')
        cy.get('[data-cy="delete"]').as('delete-button')
        cy.get('[data-cy="clear"]').as('clear-button')
        cy.get('[data-testid="circles"]').as('circles')
    })

    it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('@input').invoke('val', '')
        cy.get('[data-testid="button"]').each($button => {
            cy.wrap($button).should('be.disabled')
        })
    })

    it('Добавление элемента в стек', () => {
        cy.get('@input').type('123').should('have.value', '123');
        cy.get('@add-button').should('be.visible').click();

        cy.get('@circles').get('[data-cy="circle"]').eq(0).find('[data-cy="border"]').should('have.css', 'border', chandingBorder).should('contain', '123')
        cy.wait(500)

        cy.get('@circles').get('[data-cy="circle"]').eq(0).find('[data-cy="border"]').should('have.css', 'border', defaultBorder).should('contain', '123')

        cy.get('@input').type('456').should('have.value', '456');
        cy.get('@add-button').should('be.visible').click();

        cy.get('@circles').get('[data-cy="circle"]').eq(0).find('[data-cy="border"]').should('have.css', 'border', defaultBorder).should('contain', '123')
        cy.get('@circles').get('[data-cy="circle"]').eq(1).find('[data-cy="border"]').should('have.css', 'border', chandingBorder).should('contain', '456')
        cy.wait(500)

        cy.get('@circles').get('[data-cy="circle"]').eq(1).find('[data-cy="border"]').should('have.css', 'border', defaultBorder).should('contain', '456')
    })

    it('Удаление элемента из стека', () => {
        cy.get('@input').type('123').should('have.value', '123');
        cy.get('@add-button').should('be.visible').click();
        cy.wait(500)

        cy.get('@delete-button').should('be.visible').click();
        cy.get('@circles').get('[data-cy="circle"]').last().find('[data-cy="border"]').should('have.css', 'border', chandingBorder).should('contain', '123')
        cy.get('@circles').should('be.empty')

    })

    it('Удаление всех элементов из стека', () => {
        cy.get('@input').type('123').should('have.value', '123');
        cy.get('@add-button').should('be.visible').click();
        cy.wait(500)

        cy.get('@input').type('45').should('have.value', '45');
        cy.get('@add-button').should('be.visible').click();
        cy.wait(500)

        cy.get('@clear-button').should('be.visible').click();
        cy.get('@circles').should('be.empty')

    })

})