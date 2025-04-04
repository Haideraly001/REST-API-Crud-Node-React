import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Profile = () => {
  const [user, setUser] = useState([])
  const navigate = useNavigate()

  const userData = async () => {
    const resp = await fetch("http://localhost:8000/api/v1/form")
    const result = await resp.json()
    console.log(result.data);
    setUser(result.data)
  }

  useEffect(() => {
    userData()
  }, [])

  const handleNavigation = (id) => {
    navigate(`/user-table/${id}`)
  }

  return (
    <div className="userShow">
      <h1>Haider</h1>

      <table>
        <thead>
          <tr >
            <th >Name</th>
            <th >Email</th>
            <th >Phone</th>
            <th >Address</th>
            <th >Action</th>
          </tr>
        </thead>
        {user.map((el) => (
          <tbody key={el?._id}>
            <tr >
              <td>{el.name}</td>
              <td>{el.email}</td>
              <td>{el.phone}</td>
              <td>{el.address}</td>
              <td onClick={() => handleNavigation(el._id)}>Prev</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>

  );
}

export default Profile;
