Exercicio apresentado no Treinamento de Cypress da Semana Agilizei por Samuel Lucas

Terceiro dia de Treinamento do Agilizei
Neste dia, aprendemos:
1) Como carregar um página com dados armazenados no DB local (prepareLocalStorage). Isso otimizará nossos testes, diminuindo o tempo de execução para cadastrar novas entradas e saídas;
2) Ler cada linha de uma tabela através do comando .each($el,index,$list) -> No comando each passamos o elemento inicial ($el); o index (começa por 0); e a quantidade de itens da lista ($list) -> Comando cy.get('#data-table tbody tr')
           .each(($el, index, $list)=>
a) Para cada elemento ele irá encontrar as colunas de entradas (incomes) e saídas (expense) -> comando cy.get($el).find('td.income, td.expense')
b) Iremos capturar o texto de cada coluna e imprimir seu valor -> Comando .invoke('text').then(text =>{ cy.log(text)
c) Para imprimir os valores formatados usamos o comando -> cy.log(format(text))  -> Este comando utilizará uma bibliotica utils.js com alguns métodos de formatação. Verifique o arquivo utils.js na pasta support
3) Também aprendemos a somar os valores de entrada e saída e formatá-los
// somar os valores de entradas e saidas
                    if(text.includes('-')){
                        expenses = expenses + format(text)
                    } else{
                        incomes = incomes + format(text)
                    }

                    cy.log('Entradas',incomes)
                    cy.log('Saídas',expenses)

4) No final, usamos o comando invoke para capturar o valor do Total e fizemos uma asserção se o valorTotal é o mesmo valor formatado
// capturar o texto do total
           cy.get('#totalDisplay').invoke('text').then(text => {
               
               // comparar o somatorio de entradas e despesas com o total
                let expectedTotal = incomes + expenses
                let formattedTotalDisplay = format(text)

                expect(formattedTotalDisplay).to.eq(expectedTotal)
           })

