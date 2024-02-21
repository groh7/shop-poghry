import dbConnect from "@/utils/dbConnect"
import Product from "@/models/product.tsx"

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST')
  {
    dbConnect()

    const { products } = req.body;

    const lineItems = products.map((product)=>({
      price_data:
      {
        currency: "pln",
        product_data:
        {
          name: product.name
        },
        unit_amount: product.price * 100,
      },
      quantity:  product.quantity || 1
    }));

    //return res.json(lineItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types:["card"],
      line_items:lineItems,
      mode:"payment",
      success_url:"http://localhost:3000/success"
    });

    return res.status(200).json({ id: session.id })
  } else {
    // Handle other HTTP methods here
    res.status(405).json({ message: 'Method not allowed' })
  }
}