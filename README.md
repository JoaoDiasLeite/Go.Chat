# Go.Chat
Go.Chat

# Descrição
Aplicação criada com o intuito de efetuar o login ou criar utilizador em Rocket.Chat apartir de um utilizador de um outro sistema.

Para criar o utilizador ou efetuar login o mesmo necessita de ser verificado de alguma maneira. Esta aplicação simula essa verificação após aceder ao seguinte link: https://localhost:8080/login.

# Instalação e Configuração

-Instalar NodeJS;

-Instalar e correr RocketChat com a docuementação em https://confluence.go-contact.com/pages/viewpage.action?pageId=318210164 (Verificar RocketChat está a decorrer na Porta 3000);

-Instalar e correr a Mock_App (API Externa), para isso é necessário: 
- Efetuar o download da aplicação;
- Na localização da aplicação correr o seguinte comando: `npm install`;
- Após instalar é necessário correr a aplicação com o seguinte comando: `npm start`;

-Aceder ao RocketChat em http://localhost:3000 e cofigurar admin se ainda não estiver configurado;

-Fazer clone da aplicação Iframe;

-Instalar packages com `npm install`;´

-Realizar o download do ficheiro zip da última atualização do redis através do seguinte url: https://redis.io/download.

-Extrair o ficheiro zip para o diretório pretendido.

-Iniciar o servidor redis ao executar o ficheiro `redis-server.exe` através da linha de comandos ou clicando diretamente no mesmo.

-Iniciar o cliente de redis ao executar o ficheiro `redis-ci.exe` ou ao instalar a extensão para VSCode, Redis (https://marketplace.visualstudio.com/items?itemName=vitorsalgado.vscode-redis), após executar com sucesso o servidor de redis.


# Inicialização

```sh
npm start
```
# Rotas

-Após a inicialização da aplicação é necessário aceder ao seguinte link: https://localhost:8080/login;

-Depois de aceder ao link a aplicação faz o login, ou cria contar, em Rocket.Chat e encaminha para o site.