import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'


const ProductsId = () => {
  const { id } = useParams()
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    const resp = await fetch("https://dummyjson.com/products")
    const result = await resp.json()
    console.log("in id ", result.products);
    setProducts(result.products)
  }

  useEffect(() => {
    getProducts()
  }, [])
  return (
    <div>
      {id}
      {products.map((el) => el.id === parseInt(id) && (
        <>
          <h4>title:{el.title}</h4>
          <p>price:{el.price}</p>
          <p>Rating:{el.rating}</p>
          <p>Category:{el.category}</p>
          <p>Brank:{el.brand}</p>
        </>
      )
      )}

    </div>
  )
}

export default ProductsId
