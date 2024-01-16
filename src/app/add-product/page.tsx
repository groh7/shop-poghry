"use client";

import Product from "@/models/product";
import { useState } from "react";
import dbConnect from "@/utils/dbConnect";
import Navbar from "@/components/Navbar";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    id: "1000",
    name: "",
    description: "",
    price: 0,
    photo: "",
    availability: 0,
  });

  const handleInputChange = (e:any) => {
    const { name, value } = e.currentTarget;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // async function AddToBase(e: any) {
  //   try {
  //     e.preventDefault();

  //     const response = await fetch("http://localhost:3000/api/products-add", {
  //       method: "POST",
  //     });

  //     const data = await response.json();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log(JSON.stringify(formData))
    fetch("http://localhost:3000/api/products-add", {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Product added successfully', response);
        } else {
          console.error('Error adding product:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      });
  };
  

  return (
    <div>
    <Navbar />
    <div className="flex items-center justify-center">
      <form className="text-center addItem" onSubmit={handleSubmit}>
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
        <div></div>
        <input className="submit mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" value="Udostępnij produkt" />
      </form>
    </div>
    </div>
  );
}
