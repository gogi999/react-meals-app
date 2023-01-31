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


export const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [meals, setMeals] = useState([]);
    const [searchTerm, setSearchTerm] = useState();

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

    useEffect(() => {
        fetchMeals(`${allMealsUrl}${searchTerm}`);
    }, [searchTerm]);

    return (
        <AppContext.Provider 
            value={{ loading, meals, setSearchTerm }}
        >
            {children}
        </AppContext.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export default AppContext;
