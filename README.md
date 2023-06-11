## .env

```bash
# connection string (trocar os valores de duplas chaves)
$ DATABASE_URL="postgresql://{{user}}:{{password}}@{{host}}:{{port}}/{{database}}?schema={{schema}}"

# linguagem desejada para os dados consumidos
$ LANGUAGE="en-US"
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
