import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

const AppContext = createContext();
const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

const getFavoritesFromLocalStorage = () => {
    let favorites = localStorage.getItem('favorites');

    if (favorites) {
        favorites = JSON.parse(localStorage.getItem('favorites'));
    }
    else {
        favorites = [];
    }

    return favorites;
}


export const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [meals, setMeals] = useState([]);
    const [searchTerm, setSearchTerm] = useState();
    const [showModal, setShowModal] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());

    const addToFavorites = (idMeal) => {
        const alreadyFavorite = favorites.find((m) => m.idMeal === idMeal);

        if (alreadyFavorite) return;

        const meal = meals.find((m) => m.idMeal === idMeal);
        const updatedFavorites = [...favorites, meal];
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }

    const removeFromFavorites = (idMeal) => {
        const updatedFavorites = favorites.filter((m) => m.idMeal !== idMeal);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }

    const fetchMeals = async (url) => {
        setLoading(true);

        try {
            const { data } = await axios.get(url);

            if (data.meals) {
                setMeals(data.meals);
            } else {
                setMeals([]);
            }
        } catch (err) {
            console.log(err.response);
        }

        setLoading(false);
    }

    const fetchRandomMeal = () => fetchMeals(randomMealUrl);

    const selectMeal = (idMeal, favoriteMeal) => {
        let meal;

        if (favoriteMeal) {
            meal = favorites.find((m) => m.idMeal === idMeal);
        } else {
            meal = meals.find((m) => m.idMeal === idMeal);
        }

        setSelectedMeal(meal);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    useEffect(() => {
        fetchMeals(allMealsUrl);
    }, []);

    useEffect(() => {
        if (!searchTerm) return;

        fetchMeals(`${allMealsUrl}${searchTerm}`);
    }, [searchTerm]);

    return (
        <AppContext.Provider 
            value={{ 
                favorites,
                loading, 
                meals, 
                setSearchTerm, 
                fetchRandomMeal, 
                showModal,
                selectedMeal,
                selectMeal,
                closeModal,
                addToFavorites,
                removeFromFavorites,
                getFavoritesFromLocalStorage
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export default AppContext;
