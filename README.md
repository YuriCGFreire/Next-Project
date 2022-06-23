# Next-Project

## Linguagens, tecnologias e ferramentas utilizadas

<br>

- Node
- NestJs 
- Typescript
- PostgreSQL
- TypeORM
- Dotenv
- UUID
- Bcryptjs
- Jsonwebtoken
- Docker
- React
- NextJs
- Html
- CSS

## Escopo do projeto

O *Next-Project* é um projeto para fins ditáticos, aprendizado de Reactjs, NextJs e Docker. Consiste em um simples CRUD de usuário, o qual pode 
fazer cadastro, login, atualizar seus dados e excluir sua conta.

## Como rodar a aplicação

Crie um arquivo .env na pasta backend e copie e cole as seguintes variáveis de ambiente.
Obs: As variáveis de ambiente relacionadas ao TypeORM devem permanecer as mesmas, pois serão importantes porque são informações importantes para se conectar com o banco de dados que irá rodar em um container docker. Mudar apenas a variável JWT_SECRET_KEY

```
TYPEORM_CONNECTION=postgres
TYPEORM_HOST=database
TYPEORM_PORT=5432
TYPEORM_USERNAME=postgres
TYPEORM_PASSWORD=123456789
TYPEORM_DATABASE=next-db

JWT_SECRET_KEY= (A secret Key do jwt)
```