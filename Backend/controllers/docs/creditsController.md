## getPlans(req, res)
### Description

- Fetches all available subscription plans that a user can purchase.

### Workflow

- Returns a predefined list of available plans (Basic, Pro, Premium).

- Each plan includes its ID, name, price, credits, and features.

- Used by the frontend to display available plans to the user.

### Response Example
```json
{
  "success": true,
  "plans": [
    {
      "_id": "basic",
      "name": "Basic",
      "price": 10,
      "credits": 100,
      "features": ["100 text generations", "50 image generations", "Standard support", "Access to basic models"]
    },
    ...
  ]
}
```

## purchasePlans(req, res)
### Description

- Initiates the purchase of a selected plan using Stripe Checkout.

### Workflow

- Extracts planId from req.body and userId from the authenticated user (req.user).

- Finds the matching plan from the predefined list.

- Creates a transaction record in the database with:

- userId → buyer

- planId → chosen plan

- amount → plan price

- credits → credits assigned to the plan

- isPaid → initially set to false

- Generates a Stripe Checkout session with:

- The selected plan details

- Payment amount (converted to cents)

- Session expires in 30 minutes

- Metadata containing the transaction ID

- Returns a Stripe-hosted payment URL to the client.

- Once payment succeeds, Stripe will later verify and mark the transaction as paid (via webhook or follow-up logic).

### Response Example
```json 
{
  "success": true,
  "url": "https://checkout.stripe.com/pay/cs_test_a1b2c3..."
}
```