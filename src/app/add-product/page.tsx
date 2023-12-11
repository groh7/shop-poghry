"use client";

import Product from "@/models/product";
import { useState } from "react";
import dbConnect from "@/utils/dbConnect";

// export type ProductAddType = {
//     name: string;
//     description: string;
//     price: number;
//     photo: string;
//     availability: number;
// }

export default function AddProduct() {
  const [formData, setFormData] = useState({
    id: "1000",
    name: "",
    description: "",
    price: 0,
    photo: "",
    availability: 0,
  });

  async function AddToBase(e: any) {
    // generowanie 'id'
    try {
      e.preventDefault();

      const response = await fetch("http://localhost:3000/api/products-add", {
        method: "POST",
      });

      const data = await response.json();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      xD
      <form onSubmit={AddToBase}>
        <div>Nazwa:</div>
        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <div>Opis: </div>
        <input
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <div>Cena: </div>
        <input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
        />
        <div>Photo link: </div>
        <input
          type="text"
          value={formData.photo}
          onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
        />
        <div>Dostępność w sztukach: </div>
        <input
          type="number"
          value={formData.availability}
          onChange={(e) => setFormData({ ...formData, availability: Number(e.target.value) })}
        />

        <input type="submit" value="Udostępnij produkt" />
      </form>
    </div>
  );
}
