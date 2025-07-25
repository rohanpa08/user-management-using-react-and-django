/*            
reducer :
         reducer is a function that takes  in the current satate and an action and returns a new state 

action ={
     type:"DELETE_USER"
     payload: user_id
}    
   
state

 ...state,
    users: action.payload


Components Dispatches an  action

Reducer indentifies the action and Processes the action i.e updates the state
New state is returned and it is stored useReducered hook.
Context Prov
 */

export const userReducer = (state,action) =>{
    switch (action.type){
        case "GET_USERS":
            return {
                ...state,
                users: action.payload
            }

        case "ADD_USER":
            return{
                ...state,
                users: [...state.users,action.payload]
            }   
            
        case "UPDATE_USER":
            return{
                ...state,
                users: state.users.map((user)=>
                user.id === action.payload.id ? action.payload : user
                    
                )
            }  
            
        case "DELETE_USER":
            return{
                ...state,
                users : state.users.filter((user) => user.id !== action.payload)
            }    

        default:
            return state;    
    }
}












