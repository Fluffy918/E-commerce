import { useState, useEffect } from "react";
import { fetchProducts } from "../services/product.service";
import ProductCard from "../components/ProductCard";

function Home() {
    const [products, setProducts] = useState([])

    useEffect
}