import React from 'react';

import { BsHandThumbsUp } from 'react-icons/bs';

import { useGlobalContext } from '../context/AppContext';

const Meals = () => {
    const { loading, meals } = useGlobalContext();

    if (loading) {
        return (
            <section className="section">
                <h4>Loading...</h4>
            </section>
        );
    }

    if (meals.length < 1) {
        return (
            <section className="section">
                <h4>No meals matched for your search term! Please try again.</h4>
            </section>
        );
    }

    return (
        <section className="section-center">
            {meals.map((meal) => {
                const { idMeal, strMeal: title, strMealThumb: image } = meal

                return <article key={idMeal} className="single-meal">
                    <img 
                        src={image} 
                        alt="meal-img" 
                        className="img"
                    />
                    <footer>
                        <h5>{title}</h5>
                        <button className="like-btn" onClick={() =>{}}>
                            <BsHandThumbsUp />
                        </button>
                    </footer>
                </article>
            })}
        </section>
    );
}

export default Meals;
