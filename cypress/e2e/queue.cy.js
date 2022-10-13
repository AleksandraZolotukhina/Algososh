describe('Тестирование Стека', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/queue')
        cy.get('input').as('input')
        cy.get('[data-cy="add"]').as('add-button')
        cy.get('[data-cy="delete"]').as('delete-button')
        cy.get('[data-cy="clear"]').as('clear-button')
    })

    it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('@input').invoke('val', '')
        cy.get('[data-testid="button"]').each($button => {
            cy.wrap($button).should('be.disabled')
        })
    })

    it('Добавление элемента в очередь', () => {
        //все кркжки пустые
        cy.get('[data-cy="circle"]').each($circle => {
            cy.wrap($circle).find('[data-testid="letter"]').should('be.empty')
        })

        cy.addElement('123')
        cy.checkNonEmptyColorCircle('123', 0)

        //первый элемент должен содержать head и tail
        cy.get('[data-cy="circle"]').eq(0).contains('head')
        cy.get('[data-cy="circle"]').eq(0).contains("tail")

        //все кружки кроме первого не должны содержать head и tail
        cy.get('[data-cy="circle"]').each(($circle, index) => {
            if (index !== 0) {
                cy.wrap($circle).find('[data-testid="letter"]').should('be.empty')
                cy.wrap($circle).find('[data-cy="head"]').should('be.empty')
                cy.wrap($circle).find('[data-cy="tail"]').should('be.empty')
            }

        })


        cy.addElement('567')
        cy.checkNonEmptyColorCircle('567', 1)

        //проверяем, что первый эелемент содержит head и не содержит tail
        cy.get('[data-cy="circle"]').eq(0).find('[data-cy="head"]').should('contain', 'head')
        cy.get('[data-cy="circle"]').eq(0).find('[data-cy="tail"]').should('be.empty')
        //проверяем, что второй эелемент содержит tail и не содержит head
        cy.get('[data-cy="circle"]').eq(1).find('[data-cy="head"]').should('be.empty')
        cy.get('[data-cy="circle"]').eq(1).find('[data-cy="tail"]').should('contain', 'tail')

        //все кружки кроме первого и второго не должны содержать head и tail
        cy.get('[data-cy="circle"]').each(($circle, index) => {
            if (index !== 0 && index !== 1) {
                cy.wrap($circle).find('[data-testid="letter"]').should('be.empty')
                cy.wrap($circle).find('[data-cy="head"]').should('be.empty')
                cy.wrap($circle).find('[data-cy="tail"]').should('be.empty')
            }
        })

    })

    it('Удаление элемента из очереди', () => {
        cy.addElement('567')
        cy.wait(500)
        cy.addElement('8745')
        cy.wait(500)
        cy.addElement('gfd')
        cy.get('@delete-button').should('be.visible').click();
        cy.checkEmptyColorCircle(0)

        //проверяем, что второй эелемент содержит head и не содержит tail
        cy.get('[data-cy="circle"]').eq(1).find('[data-cy="head"]').should('contain', 'head')
        cy.get('[data-cy="circle"]').eq(1).find('[data-cy="tail"]').should('be.empty')
        //проверяем, что третий эелемент содержит tail и не содержит head
        cy.get('[data-cy="circle"]').eq(2).find('[data-cy="head"]').should('be.empty')
        cy.get('[data-cy="circle"]').eq(2).find('[data-cy="tail"]').should('contain', 'tail')

        cy.get('@delete-button').should('be.visible').click();
        cy.checkEmptyColorCircle(1)

        //проверяем, что третий эелемент содержит tail и не содержит head
        cy.get('[data-cy="circle"]').eq(2).find('[data-cy="head"]').should('contain', 'head')
        cy.get('[data-cy="circle"]').eq(2).find('[data-cy="tail"]').should('contain', 'tail')

        //все кружки кроме первого и второго не должны содержать head и tail
        cy.get('[data-cy="circle"]').each(($circle, index) => {
            if (index !== 2) {
                cy.wrap($circle).find('[data-testid="letter"]').should('be.empty')
                cy.wrap($circle).find('[data-cy="head"]').should('be.empty')
                cy.wrap($circle).find('[data-cy="tail"]').should('be.empty')
            }
        })
    })

    it('Удаление всех элементов из очереди', () => {
        cy.addElement('567')
        cy.wait(500)
        cy.addElement('8745')
        cy.wait(500)

        cy.get('@clear-button').should('be.visible').click();
        cy.get('[data-cy="circle"]').each(($circle, index) => {
            cy.wrap($circle).find('[data-testid="letter"]').should('be.empty')
            if(index!==0){
                cy.wrap($circle).find('[data-cy="head"]').should('be.empty')
            }
            cy.wrap($circle).find('[data-cy="tail"]').should('be.empty')
        })

    })

})