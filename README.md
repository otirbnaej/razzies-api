# RazziesAPI

RazziesAPI: Uma API RESTful para acessar a lista de produtores com maior e menor intervalo entre dois prêmios consecutivos na categoria Pior Filme no Golden Raspberry Awards (Razzies).

## Descrição

O Golden Raspberry Awards, também conhecido como Razzies, é uma premiação que celebra os piores filmes do ano. Esta API foi desenvolvida para fornecer uma maneira fácil e programática de acessar informações sobre os indicados e vencedores da categoria Pior Filme ao longo dos anos.

## Recursos

- Obter o produtor vencedor com o menor e o maior intervalo entre dois prêmios consecutivos

## 🛠️ Tools

- NodeJS
- Express
- Typescript
- LowDB
- Jest

## Como Usar

Para começar a utilizar a RazziesAPI, você pode seguir os seguintes passos:

1. Clone este repositório em sua máquina local:

```bash
git clone https://github.com/otirbnaej/razzies-api.git
```

Instale as dependências necessárias:

```bash
cd razzies-api/api
yarn
```

Crie um arquivo .env.development com a variável indicando em qual porta vai rodar a aplicação. Ex.:
```bash
PORT=3000
```

Inicie o servidor da API:

```bash
yarn start
```
Agora a API está sendo executada localmente. Você pode acessar os endpoints através do seguinte URL:

```bash

http://localhost:3000/
```

Endpoints

Aqui estão os principais endpoints disponíveis nesta API:

    POST /csv/upload - Responsável por fazer o upload do arquivo .csv com as informações sobre os filmes indicados ao Golden Raspberry Awards. O arquivo deve ser enviado com o nome movielist

    GET /producers/gap - Retorna os vencedores com o menor e o maior intervalo entre dois prêmios consecutivos

A aplicação também possui testes de integração que podem ser executados da seguinte forma:

O arquivo movielist.csv com os dados a serem importados deve ser colocado no diretório:
```bash
cd src/shared/infra/temp/
``` 
Em seguida, volte para a pasta principal do projeto e execute o seguinte comando: 
```bash
cd ../../../../
yarn test
```
Os testes devem verificar se o upload do arquivo CSV foi realizado e processado corretamente e se o retorno do produtor com o menor e maior intervalo entre dois prêmios consecutivos está de acordo com o exemplo


Contribuição

Contribuições são bem-vindas! Se você deseja contribuir para este projeto, por favor, siga as diretrizes de contribuição e envie suas alterações através de pull requests.

Licença

Este projeto está licenciado sob a MIT License.
