# LOCADORA

**Pré-requisitos:**

- Serviço MySQL rodando
- Node instalado

**Comandos necessários para instalar a aplicação:**

`npm i`

`npm i nodemon -g`

`npm i apidoc -g`

Rodar DML's e DDL's enviados por e-mail

**Iniciar aplicação:**

- Startar MySQL
- Rodar o nodemon:

`nodemon index.js`

**Documentação**

Para gerar a documentação de api vá até o diretório raiz da aplicação e execute o comando abaixo:

`apidoc -o src/apidoc -i src/`

Após será gerado um diretório chamado "apidoc" dentro do diretório "src". Abra o index.html em seu browser e lá estará a documentação da api.