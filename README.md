## Návod pro spuštění aplikace

V systému je důležité mít nainstalovaný Node.js a npm.



## Inicializace
Pro fungování projektu je nutné v adresáři projektu nainstalovat npm dependencies.

### `npm install`


## Spuštění aplikace

V adresáři projektu můžete spustit:

### `npm start`

Spustí aplikaci lokálně.<br />
Apliakci můžete oveřít ve vašem prohlížeči na adrese http://localhost:8080

## Příkazy pro testování apliakce: 

Pro spuštění api testů slouží příkaz:

### `npm run test-api`

Pro tento příkaz je nutné mít naistalovaný program *Newman*

Pro spuštění JEST testů slouží příkaz:

### `npm test`



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

Pro zobrazení databáze je možné použít apliakci MongoDB Compass, kde stačí zadat adresu databáze.

Databáze je dostupná na adrese: 
`mongodb://localhost:27017/selfed`


