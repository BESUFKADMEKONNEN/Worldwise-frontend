import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";

import { useAuth } from "./AuthContext";

const BASE_URL = "http://localhost:8080";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city._id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const { user, isAuthenticated } = useAuth();

  useEffect(
    function () {
      if (!isAuthenticated || !user) return;

      async function fetchCities() {
        dispatch({ type: "loading" });
        const token = localStorage.getItem("token");

        try {
          const res = await fetch(`${BASE_URL}/cities`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              userId: user.userId,
            },
          });
          const data = await res.json();

          dispatch({ type: "cities/loaded", payload: data.cities });
        } catch {
          dispatch({
            type: "rejected",
            payload: "There was an error loading cities...",
          });
        }
      }
      fetchCities();
    },
    [isAuthenticated, user?.id]
  );

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;

      dispatch({ type: "loading" });
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ Corrected placement
          },
        });
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data.city });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the city...",
        });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      // console.log(data);
      dispatch({ type: "city/created", payload: data.city });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city...",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
        headers: {
          // Include headers properly
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete city");
      }
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city...",
      });
      console.error(error);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
