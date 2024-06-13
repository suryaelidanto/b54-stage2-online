const swaggerAutogen = require("swagger-autogen")({
  openapi: "3.0.0",
  autoHeaders: false,
});

const doc = {
  info: {
    title: "Circle App API Docs",
    description: "Welcome to my API Docs",
  },
  servers: [
    {
      url: "https://refreshing-happiness-production.up.railway.app",
    },
    {
      url: "http://localhost:3000",
    },
  ],
  components: {
    "@schemas": {
      CreateThreadDTO: {
        type: "object",
        properties: {
          content: {
            type: "string",
          },
          image: {
            type: "file",
          },
        },
        required: ["content", "image"],
      },
      LoginDTO: {
        type: "object",
        properties: {
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
        required: ["email", "password"],
      },
      RegisterDTO: {
        type: "object",
        properties: {
          fullName: {
            type: "string",
          },
          username: {
            type: "string",
          },
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
        required: ["fullName", "username", "email", "password"],
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = ["./src/index.ts"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
