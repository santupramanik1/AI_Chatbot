## generateToken(id)

### Purpose:
- Generates a JWT (JSON Web Token) for a specific user ID to authenticate subsequent requests.

### Details:

- Takes the user’s MongoDB _id as input.

- Uses the secret key from the environment variable JWT_SECRET.

- Token expires in 2 days (2d).

### Example Output:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
}
```

## registerUser(req, res)

### Route: POST /api/auth/register

### Purpose:
- Registers a new user by creating a record in the database with hashed password and returns a JWT token.

### Workflow:

- Extracts name, email, and password from request body.

- Checks if a user with the same email already exists.

- If not, creates a new user and generates a JWT token.

- Responds with success status, token, and message.

```json
Example Response:

{
  "success": true,
  "token": "eyJhbGc...",
  "message": "User registered successfully"
}
```

## loginUser(req, res)

### Route: POST /api/auth/login

### Purpose:
Authenticates existing users by verifying their credentials and returns a JWT token.

### Workflow:

- Extracts email and password from request body.

- Searches for the user by email.

- Compares the provided password with the stored hashed password using bcrypt.compare().

- If the match is successful, generates a JWT token and sends it back.

- Returns an error if credentials are invalid.

### Example Response:

```json
{
  "success": true,
  "token": "eyJhbGc...",
  "message": "User Loggedin successfully"
}
```

## getUser(req, res)

### Route: GET /api/auth/user
### Middleware Required: Authentication middleware that attaches req.user.

### Purpose:
Retrieves the currently logged-in user's data from the authenticated request.

### Workflow:

- Accesses the req.user object set by authentication middleware.

- Returns the user information as JSON response.

### Example Response:

```json
{
  "success": true,
  "user": {
    "_id": "64f43b2d...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

## getPublishImages(req, res)

### Route: GET /api/chat/images/published

### Purpose:
Fetches all published image messages from the Chat collection.

### Workflow:

- Unwinds the messages array from the Chat collection using MongoDB’s aggregate pipeline.

- Filters only messages where:

- messages.isImage is true

- messages.isPublished is true

- Projects only the image URL and user name.

- Returns all published images in reverse chronological order.

### Example Response:
```json
{
  "success": true,
  "images": [
    {
      "imageUrl": "https://cdn.site.com/image1.jpg",
      "userName": "Alice"
    },
    {
      "imageUrl": "https://cdn.site.com/image2.jpg",
      "userName": "Bob"
    }
  ]
}
```