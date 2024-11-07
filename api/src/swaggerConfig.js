import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'WETUBE API',
            version: '1.0.0',
            description: 'API documentation for the WETUBE application',
        },
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'User ID',
                            example: 1,
                        },
                        name: {
                            type: 'string',
                            description: 'User name',
                            example: 'John Doe',
                        },
                        email: {
                            type: 'string',
                            description: 'User email',
                            example: 'johndoe@example.com',
                        },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.js'], 
};

const specs = swaggerJsdoc(options);

export default specs;

