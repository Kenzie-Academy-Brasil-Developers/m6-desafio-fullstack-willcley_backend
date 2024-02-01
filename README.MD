# Documentação da API

## Tabela de conteúdos

- [Visão Geral](#1-visão-geral)
- [Diagrama ER](#2-diagrama-er)
- [Início Rápido](#3-início-rápido)
    - [Instalando Dependências](#31-instalando-dependências)
    - [Variáveis de Ambiente](#32-variáveis-de-ambiente)
    - [Migrations](#33-migrations)
- [Endpoints](#4-endpoints)

---

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Zod](https://zod.dev)

---

## 2. Diagrama ER

[ Voltar ao topo ](#tabela-de-conteúdos)

Diagrama ER da API, definindo as relações entre as tabelas do banco de dados.

![DER](DER.png)

---

## 3. Início Rápido

[ Voltar ao topo ](#tabela-de-conteúdos)


### 3.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

> - Pelo yarn:
>
> ```shell
> yarn
> ```
>
> - Pelo npm:
>
> ```shell
> npm install
> ```

### 3.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquuivo **.env.example**:

```
cp .env.example .env
```

Configure suas veriáveis de ambiente com suas credencias do Postgres e uma nova database da sua escolha.

### 3.3. Migrations

Execute as migrations com o comando:

> - Pelo yarn:
>
> ```
> yarn typeorm migration:run -- -d src/data-source.ts
> ```
>
> - Pelo yarn:
>
> ```
> npm run typeorm migration:run -- -d src/data-source.ts
> ```

---


## 4. Endpoints

[ Voltar ao topo ](#tabela-de-conteúdos)

### Índice

- [Session - /login](#1-session):
    - [POST](#11-login)

- [Clients - /clients](#2-clients):
    - [POST](#21-criação-de-cliente)
    - [GET](#22-listagem-de-clientes)
    - [GET - /:clientId](#23-leitura-de-cliente-pelo-id)
    - [PATCH - /:clientId](#24-atualização-de-cliente)
    - [DELETE - /:clientId](#25-deleção-de-cliente)

- [Emails - /clients/:clientId/emails](#3-emails):
    - [POST](#31-criação-de-email)
    - [GET](#32-listagem-de-emails-do-cliente)
    - [PATCH - /:emailId](#33-atualização-de-email-do-cliente)
    - [DELETE - /:emailId](#34-deleção-de-email-do-cliente)

- [Contacts - /contacts](#4-contacts):
    - [POST](#41-criação-de-contato)
    - [GET - /clients/:clientId](#42-listagem-de-contatos-do-cliente)
    - [PATCH - /:contactId/clients/:clientId](#43-atualização-de-contato-do-cliente)
    - [DELETE - /:contactId/clients/:clientId](#44-deleção-de-contato-do-cliente)

---

## 1. **Session**

[ Voltar ao topo ](#tabela-de-conteúdos)

### Endpoints

| Método | Rota   | Descrição                       |
|--------|--------|---------------------------------|
| POST   | /login | Loga cliente com base no email. |

---

### 1.1. **Login**

[ Voltar aos Endpoints ](#4-endpoints)

#### `/login`

#### Exemplo de Request:
```
POST /login
Host: http://localhost:3000
Authorization: None
Content-type: application/json
```

#### Corpo da Requisição:
```json
{
    "email": "will@mail.com",
    "password": "1234"
}
```

#### Schema de Validação com Zod:
```typescript
    email: z.string().email().max(50),
    password: z.string().max(120)
```

#### Exemplo do Response:
```
200 OK
```

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IndpbGwgbWVsbyIsImlhdCI6MTcwNjU2NDY0OCwiZXhwIjoxNzA2NTc5MDQ4LCJzdWIiOiJmZTBmMGYxOC04MjlkLTQzNDQtYjA3ZS0wNDMxNGVjMWI1YTMifQ.F63ZP0Gj_0Fb4e-L7hIwhj-0Ynh9vJ6g49AMiEJL9_0",
    "client": {
        "id": "fe0f0f18-829d-4344-b07e-04314ec1b5a3",
        "fullname": "will"
    }
}
```

#### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized | Invalid credentials. |
| 404 Not Found  | Client not found. |

---

## 2. **Clients**

[ Voltar ao topo ](#tabela-de-conteúdos)

O objeto Client é definido como:

| Campo     |  Tipo  | Descrição                       |
|-----------|--------|---------------------------------|
| id        | string | Identificador único do cliente. |
| fullname  | string | O nome completo do cliente.     |
| createdAt | DATE   | Data de criação do cliente.     |
| phones    | JSON   | Lista de números telefônicos.   |

### Endpoints

| Método | Rota               | Descrição                |
|--------|--------------------|--------------------------|
| POST   | /clients           | Cria cliente.            |
| GET    | /clients           | Lista todos os clientes. |
| GET    | /clients/:clientId | Lista cliente pelo id.   |
| PATCH  | /clients/:clientId | Atualiza cliente.        |
| DELETE | /clients/:clientId | Deleta cliente.          |

---

### 2.1. **Criação de Cliente**

[ Voltar aos Endpoints ](#4-endpoints)

#### `/clients`

#### Exemplo de Request:
```
POST /clients
Host: http://localhost:3000
Authorization: None
Content-type: application/json
```

#### Corpo da Requisição:
```json
{
    "fullname": "will",
    "phones": "[123456789]",
    "email": "will@mail.com",
    "password": "1234"
}
```

#### Schema de Validação com Zod:
```typescript
    fullname: z.string().max(50),
    phones: z.string(),
    email: z.string().email().max(50),
    password: z.string().max(120)
```

#### Exemplo do Response:
```
201 Created
```

```json
{
    "id": "fe0f0f18-829d-4344-b07e-04314ec1b5a3",
    "fullname": "will",
    "createdAt": "2024-01-30",
    "phones": [
        123456789
    ],
    "emails": [
        {
            "id": "f7e19f28-c250-4a51-b9b1-49ad9b9eb36a",
            "email": "will@mail.com"
        }
    ],
    "contacts": []
}
```

#### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 400 Bad request | ZodError |
| 409 Conflict | Email already exists. |
| 404 Not Found | Client created but not found. |

---

### 2.2. **Listagem de Clientes**

[ Voltar aos Endpoints ](#4-endpoints)

#### `/clients`

#### Exemplo de Request:
```
POST /clients
Host: http://localhost:3000
Authorization: None
Content-type: application/json
```

#### Corpo da Requisição:
```json
Vazio
```

#### Exemplo do Response:
```
200 OK
```

```json
[
    {
        "id": "fe0f0f18-829d-4344-b07e-04314ec1b5a3",
        "fullname": "will",
        "createdAt": "2024-01-30",
        "phones": [
            123456789
        ],
        "emails": [
            {
                "id": "f7e19f28-c250-4a51-b9b1-49ad9b9eb36a",
                "email": "will@mail.com"
            }
        ],
        "contacts": [
            {
                "id": "98f54ca1-d06c-4493-9271-836a7196e533",
                "fullname": "will 3",
                "createdAt": "2024-01-30",
                "emails": [
                    "will3@mail.com"
                ],
                "phones": [
                    012345678
                ]
            }
        ]
    }
]
```

#### Possíveis Erros:
Nenhum, no máximo retornará uma lista vazia

---

### 2.3. **Leitura de Cliente pelo Id**

[ Voltar aos Endpoints ](#4-endpoints)

#### `/clients/:clientId`

#### Exemplo de Request:
```
POST /clients/:clientId
Host: http://localhost:3000
Authorization: Bearer token
Content-type: application/json
```

#### Corpo da Requisição:
```json
Vazio
```

#### Exemplo do Response:
```
200 OK
```

```json
{
    "id": "fe0f0f18-829d-4344-b07e-04314ec1b5a3",
    "fullname": "will",
    "createdAt": "2024-01-30",
    "phones": [
        123456789
    ],
    "emails": [
        {
            "id": "f7e19f28-c250-4a51-b9b1-49ad9b9eb36a",
            "email": "will@mail.com"
        }
    ],
    "contacts": [
        {
            "id": "98f54ca1-d06c-4493-9271-836a7196e533",
            "fullname": "will 3",
            "createdAt": "2024-01-30",
            "emails": [
                "will3@mail.com"
            ],
            "phones": [
                012345678
            ]
        }
    ]
}
```

#### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized | Missing bearer token. |
| 404 Not Found  | Client not found. |
| 401 Unauthorized | Insuficient Permission. |

---

### 2.4. **Atualização de Cliente**

[ Voltar aos Endpoints ](#4-endpoints)

#### `/clients/:clientId`

#### Exemplo de Request:
```
POST /clients/:clientId
Host: http://localhost:3000
Authorization: Bearer token
Content-type: application/json
```

#### Corpo da Requisição:
```json
{
    "fullname": "will 2",
    "phones": "[987654321]"
}
```

#### Schema de Validação com Zod:
```typescript
    fullname: z.string().max(50),
    phones: z.string()
```

#### Exemplo do Response:
```
200 OK
```

```json
{
    "id": "fe0f0f18-829d-4344-b07e-04314ec1b5a3",
    "fullname": "will 2",
    "createdAt": "2024-01-30",
    "phones": [
        987654321
    ],
    "emails": [
        {
            "id": "f7e19f28-c250-4a51-b9b1-49ad9b9eb36a",
            "email": "will@mail.com"
        }
    ],
    "contacts": [
        {
            "id": "98f54ca1-d06c-4493-9271-836a7196e533",
            "fullname": "will 3",
            "createdAt": "2024-01-30",
            "emails": [
                "will3@mail.com"
            ],
            "phones": [
                012345678
            ]
        }
    ]
}
```

#### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized | Missing bearer token. |
| 400 Bad request | ZodError |
| 404 Not Found  | Client not found. |
| 401 Unauthorized | Insuficient Permission |

---

### 2.5. **Deleção de Cliente**

[ Voltar aos Endpoints ](#4-endpoints)

#### `/clients/:clientId`

#### Exemplo de Request:
```
POST /clients/:clientId
Host: http://localhost:3000
Authorization: Bearer token
Content-type: application/json
```

#### Corpo da Requisição:
```json
Vazio
```

#### Exemplo do Response:
```
204 No Content
```

```json
Vazio
```

#### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized | Missing bearer token. |
| 404 Not Found  | Client not found. |
| 401 Unauthorized | Insuficient Permission |

---

## 3. **Emails**

[ Voltar ao topo ](#tabela-de-conteúdos)

O objeto Email é definido como:

| Campo    |  Tipo  | Descrição                     |
|----------|--------|-------------------------------|
| id       | string | Identificador único do email. |
| email    | string | O endereço de email.          |
| password | string | A senha de acesso do email.   |
| client   | FK     | Referencia o dono do email.   |

### Endpoints

| Método | Rota                               | Descrição                  |
|--------|------------------------------------|----------------------------|
| POST   | /clients/:clientId/emails          | Cria email.                |
| GET    | /clients/:clientId/emails          | Lista emails do cliente.   |
| PATCH  | /clients/:clientId/emails/:emailId | Atualiza email do cliente. |
| DELETE | /clients/:clientId/emails/:emailId | Deleta email do cliente.   |

---

### 3.1. **Criação de Email**

[ Voltar aos Endpoints ](#4-endpoints)

#### `/clients/:clientId/emails`

#### Exemplo de Request:
```
POST /clients/:clientId/emails
Host: http://localhost:3000
Authorization: Bearer token
Content-type: application/json
```

#### Corpo da Requisição:
```json
{
    "email": "will@mail.com",
    "password": "1234"
}
```

#### Schema de Validação com Zod:
```typescript
    email: z.string().email().max(50),
    password: z.string().max(120)
```

#### Exemplo do Response:
```
201 Created
```

```json
{
    "id": "f7e19f28-c250-4a51-b9b1-49ad9b9eb36a",
    "email": "will@mail.com",
    "client": {
        "id": "fe0f0f18-829d-4344-b07e-04314ec1b5a3",
        "fullname": "will"
    }
}
```

#### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized | Missing bearer token. |
| 404 Not Found  | Client not found. |
| 400 Bad request | ZodError |
| 409 Conflict | Email already exists. |

---

### 3.2. **Listagem de Emails do Cliente**

[ Voltar aos Endpoints ](#4-endpoints)

#### `/clients/:clientId/emails`

#### Exemplo de Request:
```
POST /clients/:clientId/emails
Host: http://localhost:3000
Authorization: None
Content-type: application/json
```

#### Corpo da Requisição:
```json
Vazio
```

#### Exemplo do Response:
```
200 OK
```

```json
[
    {
        "id": "f7e19f28-c250-4a51-b9b1-49ad9b9eb36a",
        "email": "will@mail.com"
    }
]
```

#### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found  | Client not found. |
| 401 Unauthorized | Missing bearer token. |

---

### 3.3. **Atualização de Email do Cliente**

[ Voltar aos Endpoints ](#4-endpoints)

#### `/clients/:clientId/emails/:emailId`

#### Exemplo de Request:
```
POST /clients/:clientId/emails/:emailId
Host: http://localhost:3000
Authorization: Bearer token
Content-type: application/json
```

#### Corpo da Requisição:
```json
{
    "password": "4321"
}
```

#### Schema de Validação com Zod:
```typescript
    password: z.string().max(120)
```

#### Exemplo do Response:
```
200 OK
```

```json
{
    "id": "f7e19f28-c250-4a51-b9b1-49ad9b9eb36a",
    "email": "will@mail.com",
    "client": {
        "id": "fe0f0f18-829d-4344-b07e-04314ec1b5a3",
        "fullname": "will"
    }
}
```

#### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized | Missing bearer token. |
| 404 Not Found  | Client not found. |
| 400 Bad request | ZodError |
| 404 Not Found | Email not found. |
| 401 Unauthorized | Insuficient Permission. |

---

### 3.4. **Deleção de Email do Cliente**

[ Voltar aos Endpoints ](#4-endpoints)

#### `/clients/:clientId/emails/:emailId`

#### Exemplo de Request:
```
POST /clients/:clientId/emails/:emailId
Host: http://localhost:3000
Authorization: Bearer token
Content-type: application/json
```

#### Corpo da Requisição:
```json
Vazio
```

#### Exemplo do Response:
```
204 No Content
```

```json
Vazio
```

#### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized | Missing bearer token. |
| 404 Not Found  | Client not found. |
| 404 Not Found | Email not found. |
| 401 Unauthorized | Insuficient Permission. |
| 401 Unauthorized | You need to have at least one email address in your account. |

---

## 4. **Contacts**

[ Voltar ao topo ](#tabela-de-conteúdos)

O objeto Contact é definido como:

| Campo     |  Tipo  | Descrição                                  |
|-----------|--------|--------------------------------------------|
| id        | string | Identificador único do contact.            |
| fullname  | string | O nome completo do contact.                |
| createdAt | DATE   | Data de criação do contact.                |
| emails    | JSON   | Lista de emails.                           |
| phones    | JSON   | Lista de números telefônicos.              |
| client    | FK     | referencia cliente que possui o contato.   |

### Endpoints

| Método | Rota                                   | Descrição                            |
|--------|----------------------------------------|--------------------------------------|
| POST   | /contacts                              | Cria contato.                        |
| GET    | /contacts/clients/:clientId            | Lista todos os contatos do clientes. |
| PATCH  | /contacts/:contactId/clients/:clientId | Atualiza contato.                    |
| DELETE | /contacts/:contactId/clients/:clientId | Deleta contato.                      |

---

### 4.1. **Criação de Contato**

[ Voltar aos Endpoints ](#4-endpoints)

#### `/contatcs`

#### Exemplo de Request:
```
POST /contacts
Host: http://localhost:3000
Authorization: Bearer token
Content-type: application/json
```

#### Corpo da Requisição:
```json
{
    "fullname": "will 3",
    "emails": [
        "will@mail.com"
    ],
	"phones": "[012345678]",
    "clientId": "fe0f0f18-829d-4344-b07e-04314ec1b5a3"
}
```

#### Schema de Validação com Zod:
```typescript
    fullname: z.string().max(50),
    emails: z.string().array(),
    phones: z.string(),
    clientId: z.string()
```

#### Exemplo do Response:
```
201 Created
```

```json
{
    "fullname": "will 3",
    "emails": [
        "will@mail.com"
    ],
	"phones": [
        012345678
    ],
    "client": {
        "id": "fe0f0f18-829d-4344-b07e-04314ec1b5a3",
        "fullname": "will",
        "createdAt": "2024-01-30",
        "phones": [
            123456789
        ]
    },
    "id": "98f54ca1-d06c-4493-9271-836a7196e533",
    "createdAt": "2024-01-30"
}
```

#### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized | Missing bearer token. |
| 400 Bad request | ZodError |
| 404 Not Found  | Client not found. |

---

### 4.2. **Listagem de Contatos do Cliente**

[ Voltar aos Endpoints ](#4-endpoints)

#### `/contatcs/clients/:clientId`

#### Exemplo de Request:
```
POST /contacts/clients/:clientId
Host: http://localhost:3000
Authorization: Bearer token
Content-type: application/json
```

#### Corpo da Requisição:
```json
Vazio
```

#### Exemplo do Response:
```
200 OK
```

```json
[
    {
        "id": "98f54ca1-d06c-4493-9271-836a7196e533",
        "fullname": "will 3",
        "createdAt": "2024-01-30",
        "emails": [
            "will@mail.com"
        ],
        "phones": [
            012345678
        ]
    }
]
```

#### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized | Missing bearer token. |
| 404 Not Found  | Client not found. |
| 401 Unauthorized | Insuficient permission. |

---

### 4.3. **Atualização de Contato do Cliente**

[ Voltar aos Endpoints ](#4-endpoints)

#### `/contatcs/:contactId/clients/:clientId`

#### Exemplo de Request:
```
POST /contacts/:contactId/clients/:clientId
Host: http://localhost:3000
Authorization: Bearer token
Content-type: application/json
```

#### Corpo da Requisição:
```json
{
    "fullname": "will 4",
    "emails": [
        "will4@mail.com"
    ],
    "phones": [
        876543210
    ]
}
```

#### Schema de Validação com Zod:
```typescript
    fullname: z.string().max(50),
    emails: z.string().array(),
    phones: z.string()
```

#### Exemplo do Response:
```
200 OK
```

```json
{
    "id": "98f54ca1-d06c-4493-9271-836a7196e533",
    "createdAt": "2024-01-30",
    "fullname": "will 4",
    "emails": [
        "will4@mail.com"
    ],
	"phones": [
        876543210
    ]
}
```

#### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized | Missing bearer token. |
| 400 Bad request | ZodError |
| 404 Not Found  | Contact not found. |
| 401 Unauthorized | Insuficient permission. |

---

### 4.4. **Deleção de Contato do Cliente**

[ Voltar aos Endpoints ](#4-endpoints)

#### `/contatcs/:contactId/clients/:clientId`

#### Exemplo de Request:
```
POST /contacts/:contactId/clients/:clientId
Host: http://localhost:3000
Authorization: Bearer token
Content-type: application/json
```

#### Corpo da Requisição:
```json
Vazio
```

#### Exemplo do Response:
```
204 No Content
```

```json
Vazio
```

#### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized | Missing bearer token. |
| 404 Not Found  | Contact not found. |
| 401 Unauthorized | Insuficient permission. |

---