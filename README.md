This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Skripty dostupné pro spuštění

Ve složce projektu můžete spustit:

### `npm start`

Spustí aplikaci.<br />
Otevřete na adrese [http://localhost:8080](http://localhost:8080) k zobrazení aplikace ve vašem prohlížeči.

### `npm test-api`

Spustí API testy vytvořené v aplikaci Postman. Příkaz na spuštění kolekce testů je interně *Newman*. 


## První přihlášení do aplikace
Pro první přihlášení do aplikace je nutné vytvořit prvotního uživatele. Například admina.
toho lze do databáze přidat POST requestem například přes Postmana: 
```
http://localhost:8080/api/account/add/user
```
Jako *body* příkazu je zapotřebí vyplnit informace o uživateli. Aby měl uživatel administrativní práva v systému, musí mít roli učitele (*teacher*)
```
{
    "firstName": "test",
    "lastName": "test",
    "username": "admin",
    "role": "teacher",
    "password": "admin"
}
```
### Databáze
Databáze je dostupná na adrese: 
`mongodb://localhost:27017/selfed`
