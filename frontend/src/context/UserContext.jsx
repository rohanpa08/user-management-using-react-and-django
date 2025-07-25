/*context API:
             - IT allows you to share across multiple components without having to pass props manually at every level 
             
prop-drilling:
            - passing data through multiple layers of components.             
*/

/*
1 user perform an action.
2 dispatch(action) is triggered
3 reducer recives 
 */








 

import { createContext, useReducer, useEffect } from "react";
import axios from 'axios';
import { userReducer } from "./userReducer";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const initialState = {
        users: [],
        loading: false,
        error: null
    };

    const [state, dispatch] = useReducer(userReducer, initialState);

    useEffect(() => {
        const fetchUser = async () => {
            dispatch({ type: "SET_LOADING" });
            try {
                const response = await axios.get('http://localhost:8000/api/users/');
                dispatch({ type: "GET_USERS", payload: response.data });
            } catch (error) {
                dispatch({ type: "SET_ERROR", payload: error.message });
            }
        };
        fetchUser();
    }, []);

    // Add User Feature
    const addUser = async (userData) => {
        dispatch({ type: "SET_LOADING" });
        try {
            const response = await axios.post('http://localhost:8000/api/users/', userData);
            dispatch({ type: "ADD_USER", payload: response.data });
        } catch (error) {
            dispatch({ type: "SET_ERROR", payload: error.message });
        }
    };

    // Remove User Feature
    const removeUser = async (userId) => {
        dispatch({ type: "SET_LOADING" });
        try {
            await axios.delete(`http://localhost:8000/api/users/${userId}/`);
            dispatch({ type: "REMOVE_USER", payload: userId });
        } catch (error) {
            dispatch({ type: "SET_ERROR", payload: error.message });
        }
    };

    return (
        <UserContext.Provider value={{ state, dispatch, addUser, removeUser }}>
            {children}
        </UserContext.Provider>
    );
}






















