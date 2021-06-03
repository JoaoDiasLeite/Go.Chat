#IFrame

IFrame Test Application

Aplicação criada com o intuito de efetuar o login ou criar utilizador em Rocket.Chat apartir de um utilizador de um outro sistema.

Para criar o utilizador ou efetuar login o mesmo necessita de ser verificado de alguma maneira. Esta aplicação disponibiliza um formulário que simula essa verificação após aceder ao seguinte link: https://localhost:8080/login.

Instruções:
-Instalar NodeJS;

-Instalar e correr RocketChat com a docuementação em https://confluence.go-contact.com/pages/viewpage.action?pageId=318210164 (Verificar RocketChat está a decorrer na Porta 3000);

-Aceder ao RocketChat em http://localhost:3000 e cofigurar admin se ainda não estiver configurado;

-Fazer clone da aplicação Iframe;

-Instalar packages com npm install e correr aplicação com npm start;

- Após a inicialização da aplicação é necessário aceder ao seguinte link: https://localhost:8080/login;

- Depois de aceder ao link é necessário fornecer os dados ou da conta criada previamente em Rocket.Chat, ou novos dados para criar uma conta em Rocket.Chat;

- Após os dados serem fornecidos a aplicação faz o login em Rocket.Chat e encaminha para o site.