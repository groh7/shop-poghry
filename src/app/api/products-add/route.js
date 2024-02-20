import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";

export async function POST(req) {
  // const data = JSON.parse(data);
  // dbConnect();



  // await Product.create({
  //   id: Math.floor(Math.random()),
  //   name: "TESTERT TEST",
  //   description: "TESTET",
  //   price: 8500,
  //   photo: "/placeholder.png",
  //   availability: 8,
  // });

  // return NextResponse.json({});

  console.log(req);
  try {
    await dbConnect();

    const productData = await req.json();

    const newProduct = new Product(productData);

    const savedProduct = await newProduct.save();
    console.log("productData: ",productData)
    
    return NextResponse.json(savedProduct);
  } catch (error) {
    console.error("Error saving product:", error);
    return NextResponse.error({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
