import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Automóveis',
      version: '1.0.0',
      description: 'Documentação Swagger para o teste técnico'
    }
  },
  apis: [path.join(__dirname, '../docs/*.yaml')],
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerUiHandler = swaggerUi.serve;
export const swaggerUiSetup = swaggerUi.setup(swaggerSpec);