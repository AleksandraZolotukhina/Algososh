describe('Тестирование Стека', () => {
    const chandingBorder = '4px solid rgb(210, 82, 225)'
    const defaultBorder = '4px solid rgb(0, 50, 255)'
    const modifedBorder = '4px solid rgb(127, 224, 81)'

    beforeEach(() => {
        cy.visit('list')
        cy.get('[data-cy="input-value"]').as('input-value')
        cy.get('[data-cy="input-index"]').as('input-index')

        cy.get('[data-cy="add-head"]').as('add-head-button')
        cy.get('[data-cy="add-tail"]').as('add-tail-button')
        cy.get('[data-cy="delete-head"]').as('delete-head-button')
        cy.get('[data-cy="delete-tail"]').as('delete-tail-button')
        cy.get('[data-cy="add-index"]').as('add-index-button')
        cy.get('[data-cy="delete-index"]').as('delete-index-button')
    })

    it('Если в инпуте пусто, то кнопки недоступны', () => {
        cy.get('@input-value').invoke('val', '')
        cy.get('@input-index').invoke('val', '')

        cy.get('@add-head-button').should('be.disabled')
        cy.get('@add-tail-button').should('be.disabled')
        cy.get('@delete-index-button').should('be.disabled')
        cy.get('@add-index-button').should('be.disabled')
    })

    it('Отрисовка дефолтного списка', () => {
        cy.get('[data-cy="circle"]').each($circle => {
            cy.wrap($circle).find('[data-testid="letter"]').should('be.not.empty')
            cy.wrap($circle).find('[data-cy="border"]').should('have.css', 'border', defaultBorder)
        })
        cy.get('[data-cy="circle"]').first().find('[data-cy="head"]').should('contain', 'head')
        cy.get('[data-cy="circle"]').last().find('[data-cy="tail"]').should('contain', 'tail')
    })

    it('Добавление элемента в head', () => {
        cy.get('@input-value').type('123').should('have.value', '123')
        cy.get('@add-head-button').should('be.visible').click()
        cy.get('[data-cy="small-circle"]').find('[data-cy="border"]').should('have.css', 'border', chandingBorder).should('contain', '123')
        cy.wait(500)

        cy.get('[data-cy="circle"]').first().find('[data-cy="border"]').should('have.css', 'border', modifedBorder).should('contain', '123')
        cy.get('[data-cy="circle"]').first().find('[data-cy="head"]').should('contain', 'head')
        cy.wait(500)

        cy.get('[data-cy="circle"]').first().find('[data-cy="border"]').should('have.css', 'border', defaultBorder)
        cy.get('[data-cy="circle"]').eq(1).find('[data-cy="head"]').should('be.empty')
    })

    it('Добавление элемента в tail', () => {
        cy.get('@input-value').type('789').should('have.value', '789')
        cy.get('@add-tail-button').should('be.visible').click()
        cy.get('[data-cy="small-circle"]').find('[data-cy="border"]').should('have.css', 'border', chandingBorder).should('contain', '789')
        cy.wait(500)

        cy.get('[data-cy="circle"]').last().find('[data-cy="border"]').should('have.css', 'border', modifedBorder).should('contain', '789')
        cy.get('[data-cy="circle"]').last().find('[data-cy="tail"]').should('contain', 'tail')
        cy.wait(500)

        cy.get('[data-cy="circle"]').last().find('[data-cy="border"]').should('have.css', 'border', defaultBorder)
        cy.get('[data-cy="circle"]').eq(-2).find('[data-cy="tail"]').should('be.empty')

    })

    it('Добавление элемента по индексу', () => {
        cy.get('@input-value').type('123').should('have.value', '123')
        cy.get('@add-head-button').should('be.visible').click()

        cy.get('@input-value').type('567').should('have.value', '567')
        cy.get('@add-head-button').should('be.visible').click()

        cy.get('@input-value').type('789').should('have.value', '789')
        cy.get('@input-index').type('1').should('have.value', '1')
        cy.get('@add-index-button').should('be.visible').click()

        cy.get('[data-cy="small-circle"]').find('[data-cy="border"]').should('have.css', 'border', chandingBorder).should('contain', '789')
        cy.wait(500)

        cy.get('[data-cy="circle"]').eq(0).find('[data-cy="border"]').should('have.css', 'border', chandingBorder).should('contain', '789')
        cy.wait(500)
        cy.get('[data-cy="circle"]').eq(1).find('[data-cy="border"]').should('have.css', 'border', modifedBorder).should('contain', '789')
        cy.wait(500)
        cy.get('[data-cy="circle"]').eq(1).find('[data-cy="border"]').should('have.css', 'border', defaultBorder).should('contain', '789')
    })

    it('Удаление элемента из head', () => {
        cy.get('@input-value').type('123').should('have.value', '123')
        cy.get('@add-head-button').should('be.visible').click()

        cy.get('@delete-head-button').should('be.visible').click()
        cy.get('[data-cy="circles"]').find('[data-cy="circle"]').eq(0).find('[data-testid="letter"]').should('be.empty')
        cy.get('[data-cy="small-circle"]').find('[data-cy="border"]').should('have.css', 'border', chandingBorder)
        cy.wait(500)
        cy.get('[data-cy="circle"]').each($circle => {
            cy.wrap($circle).find('[data-testid="letter"]').should('be.not.empty')
            cy.wrap($circle).find('[data-cy="border"]').should('have.css', 'border', defaultBorder)
        })
    })

    it('Удаление элемента из tail', () => {
        cy.get('@input-value').type('123').should('have.value', '123')
        cy.get('@add-head-button').should('be.visible').click()

        cy.get('@delete-tail-button').should('be.visible').click()
        cy.get('[data-cy="circles"]').find('[data-cy="circle"]').last().find('[data-testid="letter"]').should('be.empty')
        cy.get('[data-cy="small-circle"]').find('[data-cy="border"]').should('have.css', 'border', chandingBorder)
        cy.wait(500)
        cy.get('[data-cy="circle"]').each($circle => {
            cy.wrap($circle).find('[data-testid="letter"]').should('be.not.empty')
            cy.wrap($circle).find('[data-cy="border"]').should('have.css', 'border', defaultBorder)
        })
    })

    it('Удаление элемента по индексу', () => {
        cy.get('@input-value').type('123').should('have.value', '123')
        cy.get('@add-head-button').should('be.visible').click()

        cy.get('@input-value').type('567').should('have.value', '567')
        cy.get('@add-head-button').should('be.visible').click()

        cy.get('@input-index').type('2').should('have.value', '2')
        cy.get('@delete-index-button').should('be.visible').click()
        cy.wait(500)

        cy.get('[data-cy="circles"]').find('[data-cy="circle"]').eq(0).find('[data-cy="border"]').should('have.css', 'border', chandingBorder)
        cy.wait(500)

        cy.get('[data-cy="circles"]').find('[data-cy="circle"]').eq(0).find('[data-cy="border"]').should('have.css', 'border', chandingBorder)
        cy.get('[data-cy="circles"]').find('[data-cy="circle"]').eq(1).find('[data-cy="border"]').should('have.css', 'border', chandingBorder)
        cy.wait(500)

        cy.get('[data-cy="circles"]').find('[data-cy="circle"]').eq(0).find('[data-cy="border"]').should('have.css', 'border', chandingBorder)
        cy.get('[data-cy="circles"]').find('[data-cy="circle"]').eq(1).find('[data-cy="border"]').should('have.css', 'border', chandingBorder)
        cy.get('[data-cy="circles"]').find('[data-cy="circle"]').eq(2).find('[data-cy="border"]').should('have.css', 'border', chandingBorder)
        cy.wait(500)

        cy.get('[data-cy="circles"]').find('[data-cy="circle"]').eq(2).find('[data-testid="letter"]').should('be.empty')
        cy.get('[data-cy="small-circle"]').find('[data-cy="border"]').should('have.css', 'border', chandingBorder).find('[data-testid="letter"]').should('be.not.empty')
        cy.wait(500)

        cy.get('[data-cy="circle"]').each($circle => {
            cy.wrap($circle).find('[data-testid="letter"]').should('be.not.empty')
            cy.wrap($circle).find('[data-cy="border"]').should('have.css', 'border', defaultBorder)
        })
    })
})