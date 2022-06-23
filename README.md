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
- TailWind CSS
- NextJs
- Html
- CSS

## Escopo do projeto

O *Next-Project* é um projeto para fins ditáticos, aprendizado de Reactjs, NextJs e Docker. Consiste em um simples CRUD de usuário, o qual pode 
fazer cadastro, login, atualizar seus dados e excluir sua conta.

<br>

## Como rodar a aplicação

Crie um arquivo .env na pasta backend e copie e cole as seguintes variáveis de ambiente.
Obs: As variáveis de ambiente relacionadas ao TypeORM devem permanecer as mesmas, são informações importantes para fazer a conexão com o banco de dados que está dockerizado. Mudar apenas a variável JWT_SECRET_KEY

```
TYPEORM_CONNECTION=postgres
TYPEORM_HOST=database
TYPEORM_PORT=5432
TYPEORM_USERNAME=postgres
TYPEORM_PASSWORD=123456789
TYPEORM_DATABASE=next-db

JWT_SECRET_KEY= (A secret Key do jwt)
```
Criado o arquivo .env e colado as variáveis de ambiente, existem duas formas de rodar o projeto:

- Se você possui docker instalado, basta abrir o terminal na pasta do projeto (next-project) e rodar o comando 
docker-compose up. Será feita a instalação das dependencias e inicialização do projeto que ainda está como desenvolvimento (ainda não sei fazer deploy).

- Se não possui o docker instalado, nas variáveis de ambiente você vai precisar colocar as informações do seu db postgresql, nome, usuário, senha, nome do banco de dados. Depois disso, abra o terminal na pasta backend e rode o comando :


```
npm i
```

Será feita a instalação das dependencias e depois rode o comando 

```
npm run start:dev
```


