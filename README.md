To-Do API

A RESTful API for managing tasks built with Bun, Hono, and SQLite. The API provides basic CRUD operations, request validation using Zod, and interactive API documentation with Swagger/OpenAPI.
Prerequisites

Before running the application, make sure you have the following installed:

    Bun
    Git

Verify Bun installation:

bun --version

Installation

Clone the repository:

git clone <repository-url>
cd todo-api

Install dependencies:

bun install

Starting the Application

Run the API server:

bun run src/index.ts

Or run it in watch mode during development:

bun --watch src/index.ts

Once started, the API will be available at:

http://localhost:3000

API Documentation

Swagger UI:

http://localhost:3000/doc

OpenAPI Specification:

http://localhost:3000/openapi.json

Database

The application uses SQLite for data persistence.

On startup, the application automatically creates:

    database.sqlite
    tasks table (if it does not exist)

Available Endpoints
Method	Endpoint	Description
POST	/tasks	Create a task
GET	/tasks	Get all tasks
GET	/tasks/:id	Get a task by ID
PATCH	/tasks/:id	Update a task
DELETE	/tasks/:id	Delete a task
Testing the API
1. Create a Task

curl -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d '{
  "title":"Learn Hono",
  "description":"Build a REST API"
}'

Expected response:

{
  "id": 1,
  "title": "Learn Hono",
  "description": "Build a REST API",
  "completed": false
}

2. Get All Tasks

curl http://localhost:3000/tasks

Expected response:

[
  {
    "id": 1,
    "title": "Learn Hono",
    "description": "Build a REST API",
    "completed": false
  }
]

3. Get a Task by ID

curl http://localhost:3000/tasks/1

Expected response:

{
  "id": 1,
  "title": "Learn Hono",
  "description": "Build a REST API",
  "completed": false
}

4. Filter Tasks by Status

Completed tasks:

curl "http://localhost:3000/tasks?completed=true"

Pending tasks:

curl "http://localhost:3000/tasks?completed=false"

5. Update a Task

Mark as completed:

curl -X PATCH http://localhost:3000/tasks/1 \
-H "Content-Type: application/json" \
-d '{
  "completed": true
}'

Update title and description:

curl -X PATCH http://localhost:3000/tasks/1 \
-H "Content-Type: application/json" \
-d '{
  "title":"Master Hono",
  "description":"Add OpenAPI documentation"
}'

Expected response:

{
  "id": 1,
  "title": "Master Hono",
  "description": "Add OpenAPI documentation",
  "completed": true
}

6. Delete a Task

curl -X DELETE http://localhost:3000/tasks/1

Expected response:

204 No Content

Validation Test

The API validates incoming requests using Zod.

Example of an invalid request:

curl -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d '{
  "title":"Hi"
}'

Expected response:

{
  "success": false,
  "error": {
    "issues": [
      {
        "message": "String must contain at least 3 character(s)"
      }
    ]
  }
}

Quick End-to-End Test

Execute the following commands in order:

# Create a task
curl -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d '{"title":"Task 1","description":"First task"}'

# Get all tasks
curl http://localhost:3000/tasks

# Get task by ID
curl http://localhost:3000/tasks/1

# Update task
curl -X PATCH http://localhost:3000/tasks/1 \
-H "Content-Type: application/json" \
-d '{"completed":true}'

# Get completed tasks
curl "http://localhost:3000/tasks?completed=true"

# Delete task
curl -X DELETE http://localhost:3000/tasks/1

Project Structure

src/
├── controllers/
├── services/
├── repositories/
├── routes/
├── schemas/
├── db/
│   ├── database.ts
│   └── migrations.ts
└── index.ts

Future Improvements

    JWT Authentication
    User Management
    Pagination
    Docker Support
    Automated Testing
    CI/CD Pipeline
    Role-Based Authorization

Built with Bun, Hono, SQLite, and Zod.