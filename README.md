# Go.Chat
Go.Chat

# Descrição
Aplicação criada com o intuito de efetuar o login ou criar utilizador em Rocket.Chat apartir de um utilizador de um outro sistema.

Para criar o utilizador ou efetuar login o mesmo necessita de ser verificado de alguma maneira. Esta aplicação disponibiliza um formulário que simula essa verificação após aceder ao seguinte link: https://localhost:8080/login.

# Instalação e Configuração

- Instalar NodeJS;

- Instalar e correr RocketChat com a docuementação em https://confluence.go-contact.com/pages/viewpage.action?pageId=318210164 (Verificar RocketChat está a decorrer na Porta 3000);

- Instalar e correr a Mock_App (API Externa), para isso é necessário: 
    1.Efetuar o download da aplicação;
    2.Na localização da aplicação correr o seguinte comando: `npm install`;
    3.Após instalar é necessário correr a aplicação com o seguinte comando: `npm start`;

- Aceder ao RocketChat em http://localhost:3000 e cofigurar admin se ainda não estiver configurado;

- Fazer clone da aplicação Iframe;

- Instalar packages com `npm install`;

# Inicialização

```sh
npm start
```
# Rotas

- Após a inicialização da aplicação é necessário aceder ao seguinte link: https://localhost:8080/login;

- Depois de aceder ao link é necessário fornecer os dados ou da conta criada previamente em Rocket.Chat, ou novos dados para criar uma conta em Rocket.Chat;

- Após os dados serem fornecidos a aplicação faz o login em Rocket.Chat e encaminha para o site.