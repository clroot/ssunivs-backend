# ssunivs-backend

## Stacks

- Express.js
- Sequelize ORM
- Node.js
- jest, supertest

## Project Structure

```text
/src
├── __test__        # Test code
│   ├── api
│   ├── lib
│   ├── models
│   └── service
├── api             # controller layer
│   ├── admin
│   ├── auth
│   └── user
├── dto             # DTOs
├── exception       # custom exceptions
├── lib             # utility classes and functions
├── models          # sequelize orm models (data layers)
└── service         # Business logic (service layers)
```

## API Documentation

- 서버 실행 후, http://localhost:4000/api/v1/docs 방문
- swagger 로 생성된 API Document
