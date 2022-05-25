/// <reference types="cypress" />

const User = 'admin'
const Password = 'admin'

beforeEach(() => {
    cy.visit('http://165.227.93.41/lojinha-web/v2/')

    cy.get('#usuario').focus().type(User)
    cy.get('#senha').focus().type(Password)
    cy.get('.btn').click()

    cy.get('.waves-effect').click()

    cy.get('#produtonome').as('name')
    cy.get('#produtovalor').as('price')
    cy.get('#produtocores').as('color')    
    cy.get('button.btn').as('save') 
  })  

describe('Greetings checker', () => {
    it('Checking the greeting after logging in', () => {        
        cy.get('#nav-mobile > :nth-child(1) > a').should('have.text', 'Boas vindas, ' + User + '!')
    });
});

describe('Product adder', () => {
    it('Adding a valid product and validating the wanted message', () => {        
        cy.get('@name').type('Iphone')
        cy.get('@price').type('40000')
        cy.get('@color').type('Preto')
        cy.get('@save').click()               
        cy.get('.toast').should('have.text', 'Produto adicionado com sucesso');        
    });    

    it('Adding a product with price 0 or greater than 7.000,00 and validating the wanted message', () => {
        cy.get('@name').type('Computador')    
        cy.get('@price').type('700001')
        cy.get('@color').type('Branco')
        cy.get('@save').click()        
        cy.get('.toast').should('have.text', 'O valor do produto deve estar entre R$ 0,01 e R$ 7.000,00')
    });

    it('Adding a product without name and validating the wand message', () => {            
        cy.get('@price').type('200000')
        cy.get('@color').type('Branco')
        cy.get('@save').click()
        // Purposely, the Lojinha has some defects. In the case of this test, the addition of a product without name. For the learning, it could fail with the wanted message or pass with the unwanted message.
        cy.get('.toast').should('have.text', 'Produto adicionado com sucesso')
    });

    it('Adding a product without price and validating the wanted message', () => {        
        cy.get('@name').type('Troféu')        
        cy.get('@color').type('Dourado')
        cy.get('@save').click()
        cy.get('.toast').should('have.text', 'O valor do produto deve estar entre R$ 0,01 e R$ 7.000,00')
    });

    it('Adding a product without color and validating the wanted message', () => {        
        cy.get('@name').type('Mesa')
        cy.get('@price').type('400000')        
        cy.get('@save').click()
        // Purposely, the Lojinha has some defects. In the case of this test, the addition of a product without color. For the learning, it could fail with the wanted message or pass with the unwanted message.
        cy.get('.toast').should('have.text', 'Produto adicionado com sucesso')
    });

});

