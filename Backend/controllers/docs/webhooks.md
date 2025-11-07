## stripeWebhooks(request, response)
### Description

- Handles incoming Stripe webhook events and updates your system when a payment succeeds.

- Event Type Handled

- payment_intent.succeeded – Triggered when a user successfully completes a payment through Stripe Checkout.

### Workflow

- Verify the Webhook Signature

- The controller uses:
```js
stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
```

- to verify that the webhook request genuinely originated from Stripe.

- If verification fails, a 400 Bad Request response is sent.

- Retrieve Payment Session Information

- Once verified, it lists sessions associated with the payment intent:
```js
await stripe.checkout.sessions.list({ payment_intent: paymentIntend.id });
```

- Extracts metadata fields:

- transactionId: To locate the matching record in the database.

- appId: To ensure the event belongs to this app (quickgpt).

- Validate and Process Payment

- Finds the pending transaction:
```js
const transaction = await Transaction.findOne({ _id: transactionId, isPaid: false });
```

- Updates the corresponding user’s credit balance:
```js
await User.updateOne({ _id: transaction.userId }, { $inc: { credits: transaction.credits } });
```

- Marks the transaction as paid:
```js
transaction.isPaid = true;
await transaction.save();
```

- Respond to Stripe

- Returns a success response to acknowledge receipt:
```js
{ "recieved": true }

Response Examples
// Success
{
  "recieved": true
}

// Ignored Event
{
  "recieved": true,
  "message": "Ignored event :Invalid app"
}

// Webhook Error
{
  "success": false,
  "message": "Webhook error: No signatures found matching the expected signature for payload"
}
```