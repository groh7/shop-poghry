import Link from 'next/link'
import React from 'react'
//import { FiShoppingCart } from "react-icons/fi"
import { useRecoilState } from 'recoil'
import { cartState } from '../atoms/cartState'

const Navbar = () => {

    return (
        <div>
            <div>
                <Link href="/">Logo</Link>
            </div>
            <div>
                <Link href="/cart">
                    Koszyk: {cartState.length}
                </Link>
            </div>
        </div>
    )
}

export default Navbar