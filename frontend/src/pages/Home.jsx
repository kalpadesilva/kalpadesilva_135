import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import RecipeTable from '../components/home/RecipeTable';

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8000/recipes')
            .then((response) => {
                console.log(response)
                setRecipes(response.data.recipes);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Recipe List</h1>
                <Link to='/recipes/create'>
                    <button>Add Recipe</button>
                </Link>
            </div>
            {
                loading ? <Spinner /> : <RecipeTable recipes={recipes} />
            }
        </div>
    );
};

export default Home;
