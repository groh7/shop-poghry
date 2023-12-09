import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";

export async function GET(req){
    
    dbConnect()

    //dodawanie o tak o:

    // await Product.create({
    //     id: 1,
    //     name: "iPhone 15",
    //     description: "Color: Grey, 256GB Memory",
    //     price: 7700,
    //     photo: "/iphone-15.jpg",
    //     availability: 4
    // })
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

    return NextResponse.json(
        products
    )
}




