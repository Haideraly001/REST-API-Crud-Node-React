import React from 'react'
import { useParams } from 'react-router-dom'

const UserProfiles = () => {
  const { id } = useParams()

  console.log(id);


  return (
    <div>
      <h5>User Profiles</h5>
      <h2> {id}</h2>
    </div>
  )
}

export default UserProfiles
