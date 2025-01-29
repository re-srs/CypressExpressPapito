/// <reference types="cypress" />
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
Cypress.Commands.add('createTask', (taskName = '') => {
    cy.visit('/')

    cy.get('#newTask').as('inputTask')

    if(taskName !== ''){
        cy.get('@inputTask').type(taskName)
    }



    // //button[contains(text(), "Create")]')

    cy.contains('button', 'Create').click()
})

Cypress.Commands.add('isRequired', (targetMessage) => {
    cy.get('@inputTask')
        .invoke('prop', 'validationMessage')
        .should((text) => {
            expect(
                targetMessage
            ).to.eq(text)
        })
})

Cypress.Commands.add('removeTaskByName', (taskName) => {

    cy.request({
        url: Cypress.env('apiUrl') + '/helper/tasks',
        method: 'DELETE',
        body: { name: taskName }
    }).then(response => {
        expect(response.status).to.eq(204)
    })
})
Cypress.Commands.add('postTask', (task) => {
    cy.request({
        url: Cypress.env('apiUrl') + '/tasks',
        method: 'POST',
        body: task
    }).then(response => {
        expect(response.status).to.eq(201)
    })

})