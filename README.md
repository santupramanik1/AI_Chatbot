## CogniSketch – AI Chat & Image Generation Platform

## Live Demo: 👉https://cogni-sketch.vercel.app/


CogniSketch is an advanced AI-powered chat and image generation platform that allows users to interact with intelligent models, generate creative images, and manage their chat history in a clean, user-friendly interface.
The project integrates OpenAI’s GPT models for text conversations and ImageKit AI for image generation, with a Stripe-based credit system to manage user usage and plan purchases securely.

## ✨ Key Features
💬 AI Chat System

- Real-time conversational AI powered by OpenAI (gemini-2.0-flash model).

- Stores chat history per user for continuous context.

- Automatically deducts 1 credit per AI text generation.

### 🖼️ AI Image Generation

- Generate high-quality images using ImageKit AI based on user prompts.

- Image uploads are stored and managed in the ImageKit media library.

- Each image generation deducts 2 credits.

- Option to publish or keep images private.

### 👤 User Account Management

- Secure JWT-based authentication for all users.

- Tracks user credits, chats, and transactions.

- Role-based protection for authenticated routes.

### 💰 Payment & Credit System

- Integrated with Stripe Checkout for purchasing credits via plans.

- Three flexible plans: Basic, Pro, and Premium.

- Automated Stripe Webhook handler updates credits and payment status.

- Transaction records maintained for every purchase.

### 📦 Chat Management

- Create, delete, and view previous chats.

- Messages stored with roles (user or assistant) and timestamps.

- Supports both text and image messages.

### 🧾 Admin & Logs

- Tracks all payments, transactions, and user credit updates in MongoDB.

- Console logs for webhook events and payment confirmations for transparency.

## 🛠️ Tech Stack

### Frontend:	React.js, Tailwind CSS, Axios
### Backend:	Node.js, Express.js
### Database:	MongoDB (Mongoose)
### AI Integration:	OpenAI API (text), ImageKit AI (image generation)
### Payments:	Stripe Checkout + Webhooks
### Authentication:	JWT-based Middleware
