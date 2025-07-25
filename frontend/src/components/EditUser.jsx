import { useState, useEffect, useContext} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const EditUser = () => {
  const {id} = useParams()

  const navigate = useNavigate()

  const {dispatch} = useContext(UserContext)

  const [fromData , setFormData] = useState({
    email:"",
    first_name:"",
    last_name:"",
    phone:"",
  })
  useEffect(() => {
    const fetchUserInfo = async (id) => {
      try{
        const res = await axios.get(`http://localhost:8000/api/users/${id}/`)
        setFormData(res.data)
      }catch (error){
        console.log("error in edit user",error)
      }
    }
    fetchUserInfo(id)
  },[id])

  const handleSumbit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.patch(`http://localhost:8000/api/users/${id}/`,fromData)
      dispatch({
        type: "UPDATE_USER",
        payload: res.data
      })
      setFormData({
        email:"",
        first_name:"",
        last_name:"",
        phone:"",
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
      <h4>Edit User info</h4>
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
      <button type="submit" className="btn btn-dark w-100">Edit User</button>
      </form>
      
    </div>
  )
}

export default EditUser
