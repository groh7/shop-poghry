"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState } from "react";
import { useRecoilState, RecoilRoot } from 'recoil'
import Navbar from '@/components/Navbar';
import Product from '@/models/product';


// export type ProductAddType = {
//     name: string;
//     description: string;
//     price: number;
//     photo: string;
//     availability: number;
// }

export default function AddProduct() {
    
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        photo: '',
        availability: 0
    })

    async function AddToBase(){
        // generowanie 'id'
        const id = 100;

        await Product.create({
            id: id,
            name: formData.name,
            description: formData.description,
            price: formData.price,
            photo: formData.photo,
            availability: formData.availability
        })

    }
 

    return (
    <div>
        xD

        <form onSubmit={AddToBase}>
                <div>Nazwa:</div>
                <input
                    type='text'
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <div>Opis: </div>
                <input
                    type='text'
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
                <div>Cena: </div>
                <input
                    type='number'
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                />
                <div>Photo link: </div>
                <input
                    type='text'
                    value={formData.photo}
                    onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                />
                <div>Dostępność w sztukach: </div>
                <input
                    type='number'
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: Number(e.target.value) })}
                />

                <input type="submit" value="Udostępnij produkt"/>
        </form>
        
    </div>
    )
}
