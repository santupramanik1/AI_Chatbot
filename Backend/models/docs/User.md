## 👤 User Schema (MongoDB / Mongoose)

| **Field Name** | **Type** | **Required** | **Unique** | **Default Value** | **Description**                                                                                              |
| --------------- | -------- | ------------ | ---------- | ----------------- | ------------------------------------------------------------------------------------------------------------ |
| `name`          | `String` | ✅ Yes        | ❌ No       | —                 | Stores the full name of the user.                                                                            |
| `email`         | `String` | ✅ Yes        | ✅ Yes      | —                 | Stores the user’s email address (used as a unique identifier for login).                                     |
| `password`      | `String` | ✅ Yes        | ❌ No       | —                 | Stores the hashed password of the user. The password is automatically hashed before saving using **bcrypt**. |
| `credits`       | `Number` | ❌ No         | ❌ No       | `20`              | Represents the user’s available credits or balance (default set to 20).                                      |

### 🔐 Password Hashing Logic

Before saving a user document:
- The `pre("save")` middleware checks if the password field is modified.
- If yes:
  1. Generates a salt using `bcrypt.genSalt(10)`.
  2. Hashes the password with that salt using `bcrypt.hash()`.
  3. Stores the hashed password instead of the plain text version.

This ensures **secure password storage** and prevents storing plain text passwords in the database.
