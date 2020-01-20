import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import axios from 'axios';

const Movie = (props) => {
    const [movie, setMovie] = useState();
    const [movieSaved, setMovieSaved] = useState(false);


    const checkIfSaved = (movieId) =>
    {
        if (movie)
        {
            if (props.savedList.find(savedMovie => movieId === savedMovie.id) !== undefined)
            {
                setMovieSaved(true);
            }
        }
    }

    useEffect(() =>
    {
        const id = props.match.params.id;
        // change ^^^ that line and grab the id from the URL
        // You will NEED to add a dependency array to this effect hook

        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(response => {
            setMovie(response.data);
            checkIfSaved(response.data.id);
        })
        .catch(error => {
            console.error(error);
        });

    }, [props.match.params.id]);

    /*
    *  Change 'save' to 'saved'
    */
    useEffect(() =>
    {
        if (movie)
        {
            checkIfSaved(movie.id);
        }
    }, [props.savedList, props.match.params.id]);


    const saveMovie = () => {
        const addToSavedList = props.addToSavedList;
        addToSavedList(movie);
    }

    if (!movie) {
      return <div>Loading movie information...</div>;
    }

    return (
        <div className="save-wrapper">
            <MovieCard movie={movie} />
            <div className="save-button" onClick={saveMovie}>
                {movieSaved ? 'Saved' : 'Save'}
            </div>
        </div>
    );
}

export default Movie;
