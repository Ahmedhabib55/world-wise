import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  password: null,
  isAuthenticated: false,
};

const FAKE_USER = {
  name: "Ahmed",
  email: "habib@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action type");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (password === FAKE_USER.password && email === FAKE_USER.email)
      dispatch({ type: "login", payload: FAKE_USER });
  }
  // function wrong(email, password) {
  //   if (password !== FAKE_USER.password && email !== FAKE_USER.email)
  //     dispatch({ type: "wrong", payload: FAKE_USER });
  // }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth outside of Auth provider");
  return context;
}

export { useAuth, AuthProvider };