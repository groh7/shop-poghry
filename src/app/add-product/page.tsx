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
          alert("Product added successfully");
        } else {
          console.error('Error adding product:', response.statusText);
          alert("Error adding product")
        }
      })
      .catch((error) => {
        console.error('Error adding product:', error);
        alert("Error adding product");
      });
  };
  

  return (
    <div className="w-full">
      <Navbar />
      <div className="flex items-center justify-center">
        <form className="addItem-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nazwa:</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Opis:</label>
            <input
              id="description"
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Cena:</label>
            <input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              className="form-input"
            />
          </div>
          <div className="form-group">
           <label htmlFor="photo">Zdjęcie: </label>
            <input
              id="photo"
              type="text"
              value={formData.photo}
              onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
              placeholder="placeholder.png"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="availability">Dostępność w sztukach:</label>
            <input
              id="availability"
              type="number"
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: Number(e.target.value) })}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              className="submit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              value="Udostępnij produkt"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
