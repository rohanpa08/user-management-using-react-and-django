import { useState,useContext} from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const UserForm = () => {
  const navigate = useNavigate()

  const {dispatch} = useContext(UserContext)

  const [fromData , setFormData] = useState({
    email:"",
    first_name:"",
    last_name:"",
    phone:"",
    password:"",
  })

  const handleSumbit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:8000/api/users/",fromData)
      dispatch({
        type: "ADD_USERS",
        payload: res.data
      })
      setFormData({
        email:"",
        first_name:"",
        last_name:"",
        phone:"",
        password:"",
      })
      navigate("/")

    }catch(error) {
      console.log('error',error)

    }

  }
  const handleChange = async (e) => {
    setFormData({
      ...fromData,
      [e.target.name]: e.target.value
    })

  }

  return (
    <div className="container mt-4 mb-5 w-50">
      <h4>Add New User</h4>
      <form onSubmit={handleSumbit}>
      <div className="mb-3">
         <label className="form-label">Email:</label>
         <input type="email" name="email" value={fromData.email} className="form-control" placeholder="Enter email" onChange={handleChange} required />
      </div>
     <div className="mb-3">
         <label className="form-label">First Name:</label>
         <input type="text" name="first_name" value={fromData.first_name} className="form-control" placeholder="Enter first name" onChange={handleChange} required />
     </div>
     <div className="mb-3">
         <label className="form-label">Last Name:</label>
         <input type="text" name="last_name" value={fromData.last_name} className="form-control" placeholder="Enter last name" onChange={handleChange} required />
     </div>
     <div className="mb-3">
         <label className="form-label">Phone:</label>
         <input type="text" name="phone" value={fromData.phone} className="form-control" placeholder="Enter phone number" onChange={handleChange} required />
      </div>
      <div className="mb-3">
         <label className="form-label">Password:</label>
         <input type="password" name="password" value={fromData.password} className="form-control" placeholder="Enter password" onChange={handleChange} required />
      </div>
      <button type="submit" className="btn btn-dark w-100">Add User</button>
      </form>
      
    </div>
  )
}

export default UserForm
