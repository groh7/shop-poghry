import Link from 'next/link'
import React from 'react'
import { RecoilRoot, useRecoilValue } from 'recoil'
import { cartState } from '../atoms/cartState'

const Navbar = () => {
  const cart = useRecoilValue(cartState);

  return (
    <RecoilRoot>
      <div>
        <Link href="/">Logo</Link>
      </div>
      <div>
        <Link href="/cart">Koszyk: {cart.length}</Link>
      </div>
    </RecoilRoot>
  )
}

export default Navbar
