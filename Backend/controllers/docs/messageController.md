## Common Workflow of each function

- Each controller function:

- Authenticates the user using data from req.user.

- Checks if the user has sufficient credits to perform the operation.

- Interacts with the AI or ImageKit API to generate output.

- Updates the chat with user and AI responses.

- Deducts the required number of credits from the user’s account.

## textMessagesController(req, res)
### Description

- Handles text-based AI chat interactions using the OpenAI API.
Each text response costs 1 credit.

### Workflow

- Extracts the authenticated userId from req.user.

- Verifies that the user has at least 1 credit.

- Finds the chat document by chatId and appends the user’s prompt as a message.

- Sends the user’s prompt to the OpenAI model (gemini-2.0-flash).

- Receives the AI-generated reply and adds it to the chat’s messages.

- Deducts 1 credit from the user’s balance.

- Returns the AI-generated message to the client.

### Model Interaction

- Chat: Updates conversation history with new messages.

- User: Decreases credits using $inc: { credits: -1 }.

### Response Example
```json
{
  "success": true,
  "reply": {
    "role": "assistant",
    "content": "Here's an AI-generated response...",
    "timestamp": 1730970187123,
    "isImage": false
  }
}
```

## imageMessageController(req, res)
### Description

- Generates AI-powered images based on user prompts using ImageKit’s AI endpoint.
- Each image generation costs 2 credits.

### Workflow

- Extracts the authenticated userId from req.user.

- Verifies that the user has at least 2 credits.

- Finds the chat by chatId and appends the user’s text prompt.

- Constructs an ImageKit AI generation URL dynamically using the encoded prompt.

- Fetches the generated image from ImageKit as binary data using Axios.

- Converts the image to base64 and uploads it back to ImageKit for permanent storage.

- Creates an assistant message containing the uploaded image URL and stores it in the chat.

- Deducts 2 credits from the user’s account.

- Returns the generated image URL in the response.

### Model Interaction

- Chat: Stores both the user’s prompt and AI-generated image.

- User: Decreases credits using $inc: { credits: -2 }.

### Response Example
// Success
```json
{
  "success": true,
  "reply": {
    "role": "assistant",
    "content": "https://ik.imagekit.io/quickgpt/1730970187123.png",
    "timestamp": 1730970187123,
    "isImage": true,
    "isPublished": true
  }
}
```