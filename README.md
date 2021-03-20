Exercicio apresentado no Treinamento de Cypress da Semana Agilizei por Samuel Lucas

Primeiro dia de Treinamento da Semana Agilizei
Aprendemos:
1) Para que serve o Cypress e suas limitações;
2) Preparamos o ambiente; instalando os plugins necessários; e o Node.js
3) Gerenciador de Pacotes do Nodes - npm
a) Instalar: npm init --yes
b) Instala o pacote Cypress: npm install -D cypress
c) Para mudar a versão do Cypress: Vá no arquivo package.json e modifique a versãom em cypress
d) Criar a estrutura de pastas no Cypress: npx cypress open
           - np: Procura o pacote localmente
           - x: Procura o pactoe globalmente
           - cypress open: Abre o cypress e cria a estrutura de pasta
           

Segundo dia de Treinamento da Semana Agilizei
Aprendemos:
1) Executar em modo Mobile pelo usando as configurações do DevTools: npx cypress open --config viewportWidth=411,viewportHeight=823
2) Executar os testes no modo headless: npx cypress run --config viewportWidth=411,viewportHeight=823
           - Roda os testes em background, sem abrir o cypress
           - Ao usar o modo headless, ele já grava o vídeo automaticamente e armazena em uma pasta video na estrutura do cypress



Terceiro dia de Treinamento da Semana Agilizei
Aprendemos:
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


Quarto dia de Treinamento da Semana Agilizei
Aprendemos:
1) Como vincular nosso código ao Dashboard do Cypress;
2) Como subir o código para o GitHub usando linha de comando com o GitBash;
3) Rodar os códigos na nuvem usando o Actions do GitHub para Continuons Integrations;
4) Como encapsular uma RecordKey;
5) Como salvar um video com um artefato de uma actions sempre que o código do GitHub for modificado.
