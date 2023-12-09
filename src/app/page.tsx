"use client"

import Image from 'next/image'
//import styles from './page.module.css'
import Link from 'next/link'
import { useEffect, useState } from "react";
import { useRecoilState, RecoilRoot } from 'recoil'
import { cartState } from '../atoms/cartState'
import Product from "@/components/Product";
import Navbar from '@/components/Navbar';

export default function Home() {
  const [products, setProducts] = useState([])

  async function getData(){
    const response = await fetch("http://localhost:3000/api/products",{
        method: 'GET'
    })

    const data = await response.json()
    setProducts(data)
  }

  useEffect(() => {
    getData();
  }, [])
  
 
 

  return (
  <RecoilRoot>

    <Navbar />
    <div className="flex flex-wrap justify-center">
    {products.map(product => (<Product product={product} />))}
    </div>


  </RecoilRoot>
  )
}
