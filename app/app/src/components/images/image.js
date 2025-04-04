import React, { useState, useEffect } from 'react'

const Image = () => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/v1/uploadImage")
      .then((res) => res.json())
      .then((data) => {
        setImages(data.fileUrl)
        console.log(data.fileUrl);
        return
      }) // Extract images
      .catch((err) => console.error(err));
  }, []);
  return (
    <div>
      {images.map((img) => (
        <img
          key={img._id}
          src={`http://localhost:8000${img.image}`} // Construct image URL
          alt="Uploaded"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
      ))}
    </div>
  )
}

export default Image
