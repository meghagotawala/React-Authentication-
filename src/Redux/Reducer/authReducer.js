const initialState = JSON.parse(localStorage.getItem("auth")) || { 
  isAuthenticated: false, 
  email: "", 
  role: "" 
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      const newState = { 
        isAuthenticated: true, 
        email: action.payload.email, 
        role: action.payload.role 
      };
      localStorage.setItem("auth", JSON.stringify(newState));
      return newState;
      
    case "LOGOUT":
      localStorage.removeItem("auth");
      return { isAuthenticated: false, email: "", role: "" };

    default:
      return state;
  }
};

export default authReducer;
