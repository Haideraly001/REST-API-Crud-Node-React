import React, { useEffect, useState } from 'react'

const User = () => {

  // useEffect(() => {
  //   fetch("http://localhost:8000/api/movies")
  //     .then((data) => {
  //       return data.json();
  //     }).then((resp) => {
  //       console.log(resp);
  //     }).catch(err => {
  //       console.log(err);

  //     }, [])
  // })
  const [isUser, setUser] = useState([])

  const data = async () => {
    const res = await fetch("http://localhost:8000/api/movies")
    const result = await res.json()
    console.log(result.data);
    setUser(result.data)

  }

  useEffect(() => {
    data()
  }, [])
  return (
    <div>
      fetcing Data
      {isUser.map((el) => (
        <div>{el?.name}</div>
      ))}
    </div>
  )
}

export default User
