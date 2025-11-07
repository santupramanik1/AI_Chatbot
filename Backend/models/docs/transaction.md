## 💳 Transaction Schema (MongoDB / Mongoose)

| **Field Name** | **Type** | **Required** | **Default Value** | **Description** |
|----------------|-----------|--------------|-------------------|-----------------|
| `userId` | `ObjectId` (ref: `User`) | ✅ Yes | — | References the unique ID of the user who made the transaction. |
| `planId` | `String` | ✅ Yes | — | Identifies the plan or subscription type purchased by the user. |
| `amount` | `Number` | ✅ Yes | — | Total monetary amount for the transaction (e.g., plan price). |
| `credits` | `Number` | ✅ Yes | — | Number of credits granted to the user after successful payment. |
| `isPaid` | `Boolean` | ✅ Yes | — | Indicates whether the transaction has been successfully paid. |
| `createdAt` | `Date` | ✅ Auto | — | Automatically records the creation time of the transaction. |
| `updatedAt` | `Date` | ✅ Auto | — | Automatically updates whenever the transaction document is modified. |

---

### 🧾 **Example Transaction Document**

```json
{
  "_id": "64f49c1e2a9a9e3c1a35c4b2",
  "userId": "64f43b2d2ab1a9f0d9a45c2e",
  "planId": "PRO_MONTHLY",
  "amount": 499,
  "credits": 100,
  "isPaid": true,
  "createdAt": "2025-11-06T10:02:00Z",
  "updatedAt": "2025-11-06T10:02:00Z"
}
