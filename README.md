# Descrição
Realizar o desenvolvimento de um front-end pra que se possa realizar a consulta do histórico de cotações da
moeda BRL para a moeda selecionada pelo usuário.

## Requisitos

- [X] Criar um layout de tela de acordo com o wireframe recebido:
- [X] Popular o campo dropdown "Moeda", a partir da lista de dados recebida como modelo:
- [X] Criar um campo data inicial, e data final para o usuário selecionar o período de data que deseja;
- [X] Criar um botão de "Consultar dados" onde vai existir o seguinte comportamento:
  - [X] Realizar uma requisição ao end-point disponibilizado. Onde o end-point deverá ser preenchido dinamicamente, a data de início, data fim, e moeda de acordo com o que o usuário selecionar.
- [X] Capturar a response da requisição, e inserir a lista de dados em uma grid de acordo com o wireframe.
- [X] Criar um botão "Atualizar dados" para que os dados que estiverem em Tela seja preenchido.
- [X] Criar validações para que todos os campos estejam preenchidos corretamentes, e todos os campos deverão
ser preenchidos obrigatoriamente.
- [X] Criar validação para que a data final não seja maior que a data inicial.

## Frameworks e Tecnologias
- Angular CLI version 9.0.1.
- Angular Material
- Rxjs
- Typescript
- SCSS
- Bootstrap
- Moment.js
- Ngx-toastr

## Como Instalar e inicializar o projeto

1. Clone ou baixe o repositório.
2. Com o terminal na pasta do projeto, execute o comando `npm install`.
3. Ainda na pasta do projeto, execute o comando `ng serve`.
4. Abrir o navegador e acessar a porta `http://localhost:4200/`.

> Flexpag Desafio Frontend 🏅
