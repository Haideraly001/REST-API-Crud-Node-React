import React, { useState } from 'react'
import Image from './images/image'

const InputProfiles = () => {

  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    fileImage: null
  })


  const handleSubmit = async (e) => {

    e.preventDefault()
    console.log("new user", input);
    const resp = await fetch("http://localhost:8000/api/v1/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input)
    })
    console.log(resp);

    const result = await resp.json()
    console.log(result);

  }

  const handleChange = (e) => {
    if (e.target.type === "file") {
      console.log(e.target.files[0]);

      setInput({
        ...input,
        fileImage: e.target.files[0],
      });
    } else {
      setInput({
        ...input,
        [e.target.id]: e.target.value,
      });
    }
  };




  return (
    <div className='inputProfile'>
      <h4>Input User</h4>
      <form action="" onSubmit={handleSubmit} >
        {/* <input type="text" placeholder='Enter Name' value={input.name} id="Name" onChange={(e) => setInput({
          ...input, name: e.target.value
        })} />
        <input type="text" placeholder='Enter Email' value={input.email} id="email" onChange={(e) => setInput({
          ...input, email: e.target.value
        })} />
        <input type="text" placeholder='Enter Phone' value={input.phone} id="phone" onChange={(e) => setInput({
          ...input, phone: e.target.value
        })} />
        <input type="text" placeholder='Enter Address' value={input.address} id="address" onChange={(e) => setInput({
          ...input, address: e.target.value
        })} /> */}
        <input type="text" placeholder='Enter Name' value={input.name} id="name" onChange={handleChange} />
        <input type="text" placeholder='Enter Email' value={input.email} id="email" onChange={handleChange} />
        <input type="text" placeholder='Enter Phone' value={input.phone} id="phone" onChange={handleChange} />
        <input type="text" placeholder='Enter Address' value={input.address} id="address" onChange={handleChange} />
        <input type="file" id="fileImage" onChange={handleChange} />
        <button type='submit' > submit</button>
      </form>

      <Image />
    </div>
  )
}

export default InputProfiles
