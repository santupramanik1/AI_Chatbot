## 💬 Chat Schema (MongoDB / Mongoose)

| **Field Name** | **Type** | **Required** | **Default Value** | **Description** |
|----------------|-----------|--------------|-------------------|-----------------|
| `userId` | `String` (ref: `User`) | ✅ Yes | — | References the unique ID of the user who owns the chat. |
| `userName` | `String` | ✅ Yes | — | Stores the name of the user associated with the chat. |
| `name` | `String` | ✅ Yes | — | Represents the title or display name of the chat (e.g., “New Chat”). |
| `messages` | `Array` | ❌ No | `[]` | Contains an array of message objects related to the chat. |
| `createdAt` | `Date` | ✅ Auto | — | Automatically generated timestamp when the chat is created. |
| `updatedAt` | `Date` | ✅ Auto | — | Automatically updated timestamp when the chat is modified. |

---

### 🗨️ **Message Subdocument Structure**

Each element inside the `messages` array follows this structure:

| **Subfield** | **Type** | **Required** | **Default Value** | **Description** |
|---------------|-----------|--------------|-------------------|-----------------|
| `isImage` | `Boolean` | ✅ Yes | — | Indicates whether the message is an image. |
| `isPublished` | `Boolean` | ❌ No | `false` | Specifies if the image message has been published publicly. |
| `role` | `String` | ✅ Yes | — | Defines the role of the sender (e.g., `user`, `assistant`). |
| `content` | `String` | ✅ Yes | — | Contains the message text or image URL. |
| `timestamp` | `Number` | ✅ Yes | — | Stores the message creation time in Unix timestamp format. |

---

### 🧩 **Example Chat Document**

```json
{
  "_id": "64f48b9d2e3d4a6d8a24f1c3",
  "userId": "64f43b2d2ab1a9f0d9a45c2e",
  "userName": "Alice",
  "name": "New Chat",
  "messages": [
    {
      "isImage": false,
      "isPublished": false,
      "role": "user",
      "content": "Hello, how are you?",
      "timestamp": 1730902220
    },
    {
      "isImage": true,
      "isPublished": true,
      "role": "assistant",
      "content": "https://cdn.example.com/image1.jpg",
      "timestamp": 1730902245
    }
  ],
  "createdAt": "2025-11-06T09:23:00Z",
  "updatedAt": "2025-11-06T09:25:30Z"
}
