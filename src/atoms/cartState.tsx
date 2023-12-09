import { atom } from "recoil";
import { useEffect, useState } from "react";
import Product from "@/components/Product";

type ProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
  photo: string;
  availability: number;
  quantity?: number;
};

export const cartState = atom<ProductType[]>({
  key: "cartState",
  default: [],
});

