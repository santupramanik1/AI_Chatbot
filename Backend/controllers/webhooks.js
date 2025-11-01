import Stripe from "stripe";
import Transaction from "../models/transaction.js";
import {User} from "../models/User.js";

export const stripeWebhooks = async (request, response) => {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const sig = request.headers["stripe-signature"];

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (error) {
        return response.status(400).json({success: false, message: `Webhook error: ${error.message}`});
    }

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const paymentIntend = event.data.object;
                const sessionList = await stripe.checkout.sessions.list({
                    payment_intent: paymentIntend.id,
                });

                const session = sessionList.data[0];
                const {transactionId, appId} = session.metadata;

                console.log("✅ Webhook received:", event.type);
                console.log("🧾 Metadata:", session.metadata);
                
                if (appId === "quickgpt") {
                    const transaction = await Transaction.findOne({_id: transactionId, isPaid: false});

                    // updates credits in user account
                    await User.updateOne({_id: transaction.userId}, {$inc: {credits: transaction.credits}});

                    console.log(transaction);
                    // update credits payment status
                    transaction.isPaid = true;
                    await transaction.save();
                } else {
                    return response.json({recieved: true, message: "Ignored event :Invalid app"});
                }
                break;
            }

            default:
                console.log("Unhandled event type:", event.type);
                break;
        }
        return response.json({recieved: true});
    } catch (error) {
        console.log("webhook processing error", error);
        return response.status(500).send("Internal server error");
    }
};
