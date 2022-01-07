# Back Denuncias
## Desafio Técnico Appedidos
### Feito por: João Pedro Cavalcante
### Utilizando a framework [Express](https://expressjs.com/) e o ORM [Sequelize](https://sequelize.org/)

## Como Instalar e Executar o Projeto?
* Clone o repositório
* É possível utilizar o Docker para executar o projeto, mais detalhes embaixo.
* Instale as dependências utilizando o comando `npm install`.
* Copie o arquivo `.env.example` e crie um arquivo `.env` para utilizar as variáveis de ambientes.
* Com o arquivo `.env` configure a conexação do banco de dados para usar o Postgresql de acordo com seu computador.
* Migre o banco de dados com o comando `npm run migrate`.
* Por fim, utilize o seguintes comando para servir o projeto, `npm run dev`.
* E, assim será possível utilizar a aplicação.

## Docker
* Para executar o projeto com Docker, basta utilizar o comando `docker compose up`.
* Após executar o comando, será instalado todas as dependencias do projeto e com as configurações de acordo.
* Porém, ainda será necessário ainda configurar o `.env` para o projeto funcionar.
* E, assim será possível utilizar a aplicação

## Como Testar?
* Para testar, basta utilizar o comando `npm test` e assim ele executará o teste da rota.

