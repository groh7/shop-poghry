"use client"

import React from 'react'
import axios from "axios"
import { RecoilRoot, useRecoilState } from 'recoil'
import { cartState } from '@/atoms/cartState'
import Navbar from '@/components/Navbar';
import CartList from '@/components/CartList';

const Cart = () => {

    const [cartItem] = useRecoilState(cartState)

    const totalPrice = () => {
        let total = 0
        cartItem.forEach(item => total += (item.price * item.quantity))
        return total
    }

    const createCheckoutSession = async () => {

        axios.post('api/checkout_sessions', { cartItem })
           .then(res => {
                console.log(res)
                window.location = res.data.sessionURL
            }) 
            .catch(err => console.log(err))
    }

    return (
        <div>
            <Navbar />

            <div>
                {cartItem.length <= 0
                    ? <h1>Your Cart Is Empty</h1>
                    : cartItem.map(item => <CartList id={item.id} name={item.name} price={item.price} photo={item.photo} quantity={item.quantity} />)}

                {cartItem.length > 0 && (
                <div>
                    <h2>Total: ${totalPrice()}</h2>
                    <button onClick={createCheckoutSession}>Checkout</button>
                </div>
                )}



            </div>


        </div>
    )
}

export default Cart