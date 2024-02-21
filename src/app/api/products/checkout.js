import dbConnect from "@/utils/dbConnect"
import Product from "@/models/product.tsx"
import stripe from "stripe"

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST')
  {
    dbConnect()

    const { product } = req.body;

    const lineItems = product.map((product)=>({
      price_data:
      {
        currency: "pln",
        product_data:
        {
          name: product.name
        }
      },
      unit_amount: product.price * 100,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types:["card"],
      line_items:lineItems,
      mode:"payment",
      success_url:"http://localhost:3000/",
      cancel_url:"http://localhost:3000/",
    });

    return res.status(200).json({ id: session.id })
  } else {
    // Handle other HTTP methods here
    res.status(405).json({ message: 'Method not allowed' })
  }
}