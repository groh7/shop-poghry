import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product.tsx";


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  dbConnect();

  //dodawanie o tak o:

  // await Product.create({
  //     id: 2,
  //     name: "Samsung Galaxy S23",
  //     description: "Color: Black, 128GB Memory",
  //     price: 8500,
  //     photo: "/placeholder.png",
  //     availability: 8
  // })
  // await Product.create({
  //     id: 3,
  //     name: "Google Pixel 6 Pro",
  //     description: "Color: Silver, 256GB Memory",
  //     price: 8999,
  //     photo: "/placeholder.png",
  //     availability: 3
  // })
  // await Product.create({
  //     id: 4,
  //     name: "MacBook Pro 2023",
  //     description: "Space Gray, 16-inch, 1TB SSD",
  //     price: 2499,
  //     photo: "/placeholder.png",
  //     availability: 5
  // })
  // await Product.create({
  //     id: 5,
  //     name: "Sony PlayStation 5",
  //     description: "Color: White, 1TB Storage",
  //     price: 599,
  //     photo: "/placeholder.png",
  //     availability: 10
  // })
  // await Product.create({
  //     id: 6,
  //     name: "DJI Mavic Air 2 Drone",
  //     description: "Color: Silver, 48MP Camera",
  //     price: 799,
  //     photo: "/placeholder.png",
  //     availability: 2
  // })
  // await Product.create({
  //     id: 7,
  //     name: "Coffee Maker",
  //     description: "12-Cup Programmable, Stainless Steel",
  //     price: 49.99,
  //     photo: "/placeholder.png",
  //     availability: 15
  // })
  // await Product.create({
  //     id: 8,
  //     name: "Leather Wallet",
  //     description: "Genuine Leather, Brown",
  //     price: 29.99,
  //     photo: "/placeholder.png",
  //     availability: 20
  // })
  // await Product.create({
  //     id: 9,
  //     name: "Sports Shoes",
  //     description: "Running Shoes, Men's, Size 10",
  //     price: 79.99,
  //     photo: "/placeholder.png",
  //     availability: 30
  // })

  //pobieranie danych z mongoła:

  const products = await Product.find({});

  return NextResponse.json(products);
}

export async function PUT(req, res) {
  dbConnect()

  const { id, name, description, price, photo, availability } = await req.json()

  console.log(req);

  try {
    const product = await Product.findOneAndUpdate(
      { id },
      { name, description, price, photo, availability },
      { new: true }
    )

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    return res.status(200).json(product)
  } catch (error) {
    console.error('Error updating product:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

// stripe
export async function POST(req, res) {
  console.log("Connected to checkout");

  const { products } = req.json();

  const lineItems = products.map((product)=>({
    price_data: {
      currency: "pln",
      product_data:{
       name: product.name
      },
      unit_amount: product.price * 100,
    },
    quantity: product.quantity || 1
  }));

  const session = await stripe.checkout.session.create({
    payment_method_types:["card"],
    line_iteams:lineItems,
    mode:"payment",
    success_url:"http://localhost:3000/",
    cancel_url:"http://localhost:3000/"
  });

  return res.json({id: session.id});

}