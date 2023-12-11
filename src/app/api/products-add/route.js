import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";

export async function POST(req) {
  const data = JSON.parse(data);
  dbConnect();

  await Product.create({
    id: Math.floor(Math.random()),
    name: "TESTERT TEST",
    description: "TESTET",
    price: 8500,
    photo: "/placeholder.png",
    availability: 8,
  });

  return NextResponse.json({});
}
