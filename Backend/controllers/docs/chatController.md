## createChat(req, res)

### Description:
Creates a new chat for the authenticated user.

### Workflow:

- Extracts the user's ID and name from the req.user object (set by authentication middleware).

- Initializes a new chat object with:

- userId: The logged-in user’s ID.

- messages: An empty array for storing future messages.

- name: Default name "New Chat".

- userName: The user's name for reference.

- Saves the chat in the MongoDB database using Chat.create().

- Returns a success response upon creation.

### Response Examples:

```json
{
  "success": true,
  "message": "Chat created"
}
```

## getChats(req, res)

### Description:
Retrieves all chats created by the authenticated user.

### Workflow:

- Extracts the user’s ID from req.user.

- Fetches all chat documents associated with that user using:

```js 
    Chat.find({ userId }).sort({ updatedAt: -1 });
```

- Chats are sorted in descending order of their updatedAt timestamp, ensuring the most recent chat appears first.

- Returns all chat data in JSON format.

### Response Examples:

```json
{
  "success": true,
  "chats": [
    {
      "_id": "654abc...",
      "userId": "652xyz...",
      "name": "New Chat",
      "messages": [],
      "createdAt": "2025-11-07T10:12:30Z",
      "updatedAt": "2025-11-07T10:12:30Z"
    }
  ]
}
```

## deleteChat(req, res)

### Description:
- Deletes a specific chat belonging to the authenticated user.

### Workflow:

- Extracts userId from req.user and chatId from the request body.

- Deletes the matching chat using:

```js
Chat.deleteOne({ _id: chatId, userId });
```

- This ensures that only the owner of the chat can delete it.

- Returns a success message upon deletion.

### Response Examples:

```json
{
  "success": true,
  "message": "Chat Deleted successfully"
}
```