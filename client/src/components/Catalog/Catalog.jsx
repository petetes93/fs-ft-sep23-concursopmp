import React, { useState, useEffect } from 'react'
import { useAuth } from 'src/hooks'

import apiClient from 'services/api-client'

import ProductCard from 'components/ProductCard/ProductCard'

function Catalog(){
   const [user] = useAuth()
 

  const {products, setProducts, query}= useProducts()

  const handleAddCart = (productToCart) => {

    setProducts(products.map(product => {

     if(product !== productToCart) {
      return product
     } else {
      return {...product, cart: !product.cart}
     }

    }))

  }

  const filteredProducts = !query ? products : products.filter(product => product.name?.toLowerCase().startsWith(query.toLowerCase()))

  useEffect(() => {
    apiClient.get("/products/")
      .then(({data}) =>  setProducts(data))
    
      .catch((error) => {
        console.error("Error fetching data:", error)
      })
  }, [])

  return (
    <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '16px',
    }}
    >
        {filteredProducts && (
          filteredProducts.map((product) => (
           <ProductCard key={product._id} product={product} onAddCart={handleAddCart} />
          ))
        )}
      </div>
  )
}

export default Catalog;
