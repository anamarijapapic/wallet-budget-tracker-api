# 2024_Tea27_anamarijapapic

## Wallet Budget Tracker API

### Database Model

<img width="560" alt="wallet-budget-tracker-api-db" src="https://github.com/user-attachments/assets/35f18b80-951e-4c58-9aa5-2107d933cb5c" />

### Technologies

![Node.js](https://img.shields.io/badge/Node.js-5FA04E.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black)
![Koa](https://img.shields.io/badge/Koa-33333D.svg?style=for-the-badge&logo=Koa&logoColor=white)
![Knex.js](https://img.shields.io/badge/Knex.js-D26B38.svg?style=for-the-badge&logo=knexdotjs&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57.svg?style=for-the-badge&logo=SQLite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-%23000000.svg?style=for-the-badge&logo=json-web-tokens&logoColor=white)
![Mocha](https://img.shields.io/badge/Mocha-8D6748.svg?style=for-the-badge&logo=Mocha&logoColor=white)
![Chai](https://img.shields.io/badge/Chai-A30701.svg?style=for-the-badge&logo=Chai&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D.svg?style=for-the-badge&logo=Swagger&logoColor=black)

### API Endpoints

| **Method** |         **Route URL**          | **Description**                                          | **Authorization** |
|-----------:|:------------------------------:|----------------------------------------------------------|-------------------|
|    **GET** |            `/health`           | Get health information                                   | None              |
|   **POST** |            `/signup`           | Signup a new user                                        | None              |
|   **POST** |            `/login`            | Login a user                                             | None              |
|    **GET** |            `/users`            | Get all users                                            | Bearer Token      |
|    **GET** |        `/users/:userId`        | Get user details by ID                                   | Bearer Token      |
|    **GET** |            `/funds`            | Get all funds for the authenticated user                 | Bearer Token      |
|    **GET** |        `/funds/:fundId`        | Get fund details by ID for the authenticated user        | Bearer Token      |
|   **POST** |            `/funds`            | Create a new fund for the authenticated user             | Bearer Token      |
|    **PUT** |        `/funds/:fundId`        | Update fund details by ID for the authenticated user     | Bearer Token      |
| **DELETE** |        `/funds/:fundId`        | Delete fund by ID for the authenticated user             | Bearer Token      |
|    **GET** |          `/categories`         | Get all categories                                       | None              |
|    **GET** |    `/categories/:categoryId`   | Get category details by ID                               | None              |
|   **POST** |          `/categories`         | Create a new category                                    | Bearer Token      |
| **DELETE** |    `/categories/:categoryId`   | Delete category by ID                                    | Bearer Token      |
|    **GET** |         `/transactions`        | Get all transactions for the authenticated user          | Bearer Token      |
|    **GET** | `/transactions/:transactionId` | Get transaction details by ID for the authenticated user | Bearer Token      |
|   **POST** |         `/transactions`        | Create a new transaction for the authenticated user      | Bearer Token      |

#### API Documentation & Testing

- Swagger UI is available at `/swagger` route.
- To run tests, use the following command: `npm run test`

### Getting Started

1. Clone the repository: `git clone git@github.com:asinkrono-web-programiranje/2024_Tea27_anamarijapapic.git`
2. Position yourself in the root of the server directory: `cd 2024_Tea27_anamarijapapic/server`
3. Create a `.env` file from `.env.example` in the root of the server directory: `cp .env.example .env`
4. Set the environment variables in the `.env` file according to your configuration (`PORT`, `JWT_SECRET`)
5. Use the Node.js version specified in the `.nvmrc` file: `nvm use`
6. Install the dependencies: `npm install`
7. Run the server: `npm run start`
8. Access the server at `http://localhost:{PORT}`
9. Access the Swagger UI at `http://localhost:{PORT}/swagger`

### Credits

- [Tea Bašić](https://github.com/Tea27)
- [Anamarija Papić](https://github.com/anamarijapapic)
