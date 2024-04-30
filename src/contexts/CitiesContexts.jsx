import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";

const citiesContext = createContext();

const initialState = {
  cities: [],
  loading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true };
    case "cities/loaded":
      return { ...state, cities: action.payload, loading: false };
    case "city/load":
      return { ...state, currentCity: action.payload, loading: false };
    case "city/created":
      return {
        ...state,
        loading: false,
        cities: [...state.cities, action.payload],
      };
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    default:
      alert("invalid action");
  }
}

const BASE_URL = "http://localhost:9000";

function CitiesProvider({ children }) {
  const [{ cities, error, loading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );


  useEffect(function () {
    async function fetchingCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({ type: "rejected", payload: "failed to load cities" });
      }
    }
    fetchingCities();
  }, []);

  // get city function that will get information about city when clicked in city item
  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/load", payload: data });
      } catch {
        dispatch({ type: "rejected", payload: "Failed to fetch city" });
      }
    },
    [currentCity.id]
  );
  //  save new city information to database i means api
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({ type: "rejected", payload: "Failed to save new city 😐" });
    }
  }

  // function for deleting city from the database and list of cities
  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      await fetch(`${BASE_URL}/cities/${id}`, { method: "delete" });
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({ type: "rejected", payload: "Failed to deleting city 😐" });
    }
  }

  return (
    <citiesContext.Provider
      value={{
        cities,
        deleteCity,
        error,
        loading,
        currentCity,
        getCity,
        createCity,
      }}
    >
      {children}
    </citiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(citiesContext);
  if (context === undefined)
    throw new Error("Contest used outside of cities provider");

  return context;
}

export { CitiesProvider, useCities };
