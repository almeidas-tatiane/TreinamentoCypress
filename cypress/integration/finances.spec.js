///<reference types="cypress"/> // traz informações adicionais sobre os comandos utilizados no cypress quando passo o mouse sobre eles

import{format, prepareLocalStorage} from '../support/utils'

context('Dev Finances Agilizei', () => {
    // hooks
    // trechos que executam antes e depois do teste
    // before -> antes de todos os testes
    // beforeEach -> antes de cada teste
    // after -> depois de todos os testes
    // afterEach -> depois de cada teste

    beforeEach(() => {
        cy.visit('https://devfinance-agilizei.netlify.app/#', {
            onBeforeLoad: (win) => {
                prepareLocalStorage(win)
            }
        })
        
    });



    it('Cadastrar entradas', () => {
        //- entender o fluxo manualmente
        //- mapear os elementos que vamos interagir
        //- descrever as interações com o cypress
        //- adicionar as asserções que a gente precisa

        

        cy.get('#transaction .button').click()        // id + classe
        cy.get('#description').type('Mesada')       // id
        cy.get('[name=amount]').type(12)            // atributos
        cy.get('[type=date]').type('2021-03-21')    // atributos
        cy.get('button').contains('Salvar').click()   //tipo e valor

        cy.get('#data-table tbody tr').should('have.length', 3)

    });

    // Cadastrar saidas
    it('Cadastrar saidas', () => {
        

        cy.get('#transaction .button').click()        // id + classe
        cy.get('#description').type('Presente')       // id
        cy.get('[name=amount]').type(-12)            // atributos
        cy.get('[type=date]').type('2021-03-21')    // atributos
        cy.get('button').contains('Salvar').click()   //tipo e valor

        cy.get('#data-table tbody tr').should('have.length', 3)
    });

    // Remover entradas e saidas
    it('Remover entradas e saidas', () => {


        // estrategia 1: voltar para o elemento pai, e avançar para um tg img attr
            cy.get('td.description')
            .contains('Mesada')
            .parent()
            .find('img[onclick*=remove]')
            .click()

        // estrategia 2: buscar todos os irmaos e buscar o que tem img + attr
        cy.get('td.description')
        .contains('Suco Kapo')
        .siblings()
        .children('img[onclick*=remove]')
        .click()

        cy.get('#data-table tbody tr').should('have.length', 0)

    });

    it('Validar saldo com diversas transações', () => {


        // capturar as linhas com as transaçoes e as colunas com valores
        let incomes = 0
        let expenses = 0
           cy.get('#data-table tbody tr')
           .each(($el, index, $list)=> {
               cy.get($el).find('td.income, td.expense')
               // capturar o texto dessas colunas
                .invoke('text').then(text =>{
                    cy.log(text)

                    // formatar esses valores das linhas
                    cy.log(format(text))

                    // somar os valores de entradas e saidas
                    if(text.includes('-')){
                        expenses = expenses + format(text)
                    } else{
                        incomes = incomes + format(text)
                    }

                    cy.log('Entradas',incomes)
                    cy.log('Saídas',expenses)

                    

                })

                
               

           }) 

 
        
        // capturar o texto do total
           cy.get('#totalDisplay').invoke('text').then(text => {
               
               // comparar o somatorio de entradas e despesas com o total
                let expectedTotal = incomes + expenses
                let formattedTotalDisplay = format(text)

                expect(formattedTotalDisplay).to.eq(expectedTotal)
           })
        
        
    });

});