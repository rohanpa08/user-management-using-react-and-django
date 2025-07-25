import {useContext} from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
  const {state,dispatch} = useContext(UserContext)
  const handleClick = async (id) => {
    try{
        await axios.delete(`http://localhost:8000/api/users/${id}/`)
        dispatch({
            type: "DELETE_USER",
            payload: id
        })

    }catch(error){
        console.error("error deleting user:",error)
    }
  }
  return (
    <div className="container mt-4">
        <h2>User List</h2>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {state.users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.first_name} {user.last_name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                            <button className="btn btn-danger btn-sm" onClick={(e) => handleClick(user.id)}>Delete</button>
                            <Link to={`/edit/${user.id}`} className="btn btn-dark btn-sm me-2">Edit</Link>
                        </td>
                    </tr>
                ))}
            </tbody>

        </table>
      
    </div>
  )
}

export default UserList
