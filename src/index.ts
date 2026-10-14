import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';
import tasksRoute from './routes/tasks.route';
import { run } from './database/migrations';

//Run the database migrations before starting the server
run();

const app = new OpenAPIHono();

app.route("/api", tasksRoute);
app.doc("openapi.json", {
  openapi : "3.0.0",
  info : {
    title : "Todo List API",
    version : "1.0.0",
    description : "A simple todo list API built with Hono and Zod"
  },
  servers : [
    {
      url : "http://localhost:3000/",
      description : "Local server"
    }
  ]
});
app.get("/docs", swaggerUI({ title: "Todo List API", url: "/openapi.json" }));

export default app
