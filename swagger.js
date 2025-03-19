const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',
        description: 'API documentation for Products and Countries'
    },
    host: 'localhost:4000',
    schemes: ['http'],
    tags: [
        {
            name: "Products",
            description: "Endpoints for managing products"
        },
        {
            name: "Countries",
            description: "Endpoints for managing countries"
        }
    ]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
