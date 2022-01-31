import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ssunivs-backend',
      version: '1.0.0',
    },
  },
  apis: ['./src/api/**/*.js', './src/dto/**/*.js'],
};

export default swaggerJsdoc(options);