import React, { useEffect, useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'

const Products = () => {

  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState([])
  const [allProducts, setAllProducts] = useState([]);
  const [inputForm, setInputForm] = useState("")

  const getProducts = async () => {
    const resp = await fetch("https://dummyjson.com/products")
    const result = await resp.json()
    console.log(result.products);
    setProducts(result.products)
    setAllProducts(result.products)
  }

  useEffect(() => {
    getProducts()
  }, [])

  const handlePrev = (id) => {
    navigate(`/products/${id}`)
  }

  const handlefiltercategory = (category) => {
    if (category === "All") {
      setProducts(allProducts)
    } else {
      const filterProducts = products.filter((el) => el.category === category)
      setProducts(filterProducts)
    }
  }

  useEffect(() => {
    if (products.length > 0) {
      const unqiqueCategory = ["All", ...new Set(products.map((el) => el.category))]
      setCategory(unqiqueCategory)
    }
  }, [products, allProducts])

  const handleChange = (e) => {
    const value = e.target.value
    setInputForm(value)
    const filterInput = allProducts.filter((el) =>
      el.title.toLowerCase().includes(value.toLowerCase())
    )
    setProducts(filterInput)
  }

  return (
    <div>
      user Products

      <hr />
      <input
        style={{ padding: "10px 5px", margin: "10px" }}
        type="text"
        value={inputForm}
        placeholder='Enter value'
        onChange={handleChange}
      />
      <div className="buttonCategory">

        {category.map((category, index) => (
          <>
            <button key={index} onClick={() => handlefiltercategory(category)}>{category}</button>
          </>
        ))}
      </div>
      <hr />
      <div className='parentProducts'>
        {products.map((el) => (
          <div key={el.id}>
            <h4>title:{el.title}</h4>
            <p>price:{el.price}</p>
            <p>Rating:{el.rating}</p>
            <p>Category:{el.category}</p>
            <p>Brank:{el.brand}</p>
            <button onClick={() => handlePrev(el.id)}>Preview</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products
