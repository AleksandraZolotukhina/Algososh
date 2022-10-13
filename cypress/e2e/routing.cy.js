describe('Тестирование переходов по страницам', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })

  function checkUrl(value) {
    it(`Проверка работы роутинга страницы ${value}`, () => {
      cy.get(`a[href*="/${value}"]`).click()
      cy.url().should('include', `/${value}`)
    })
  }

  checkUrl("recursion")
  checkUrl("fibonacci")
  checkUrl("sorting")
  checkUrl("stack")
  checkUrl("queue")
  checkUrl("list")
})