# Valex

<p align="center">
  <a href="https://github.com/andregugelmin/projeto18-valex">
    <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f355.svg" alt="readme-logo" width="80" height="80">
  </a>

  <h3 align="center">
    projeto18-valex
  </h3>
</p>

## Usage

```bash
$ git clone https://github.com/andregugelmin/projeto18-valex

$ cd projeto18-valex

$ npm install

$ npm run dev
```

API:

```
- POST /card
    - Rota para criar um novo cartão, ira devolver o CVC do cartão criado para utilizar em outras rotas caso precise
    - headers: {x-api-key}
    - body: {
        "employeeId": number,
        "cardType": uma das categorias: ['groceries', 'restaurants', 'transport', 'education', 'health']
    } 
    
- POST /activate
    - Rota para ativar o cartão (colocar uma senha)
    - headers: {}
    - body: {
        "cardId": id do cartão que quer ativar,
        "securityCode": cvc do cartão,
        "password": senha quer colocar no cartão,
    }
    
- POST /block
    - Rota para bloquear o cartão
    - headers: {}
    - body: {
        "cardId": id do cartão que quer bloquear,
        "password": senha do cartão,
    }
    
- POST /unblock
    - Rota para desbloquear o cartão
    - headers: {}
    - body: {
        "cardId": id do cartão que quer desbloquear,
        "password": senha do cartão,
    }
    
- GET /balance
    - Rota para ver o saldo e transações do cartão
    - headers: {}
    - body: {
        "cardId": id do cartão,
    }

- POST /recharge
    - Rota para recarregar o cartão
    - headers: {x-api-key}
    - body: {
        "cardId": id do cartão que quer desbloquear,
        "rechargeAmount": montante que deseja colocar no cartao (numero inteiro maior que 0),
    }
    
- POST /purchase
    - Rota para realizar uma compra com o cartão
    - headers: {}
    - body: {
        "cardId": id do cartão que quer desbloquear,
        "password": senha do cartão,
        "purchaseAmount": preço da compra realizada (numero inteiro maior que 0),
        "businessId": id do estabelecimento que esta fazendo a compra
    }
    
```
