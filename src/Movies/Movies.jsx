import { useState, use, cache } from 'react';
import { Form } from 'react-bootstrap';
import MovieList from './MovieList.jsx';

async function getGenres() {
    const response = await fetch(
        'https://api.themoviedb.org/3/genre/movie/list?language=en',
        options
    );
    return response.json();
}

async function getMovies(genre) {
    const response = await fetch(
        'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=' +
        genre,
        options
    );
    return response.json();
}

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjY1NTlmZDM3OTlmOTQ2NmM2NGVhMGRhYTQyMDU0MyIsInN1YiI6IjU1NGI0OWM3OTI1MTQxNDY5YzAwMTk1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qJWSAVUgQylJnOnzQkRHVT6OwJpX9EmTOB5n7JcLPek',
    },
};

export default function Movies() {
    const cachedGenres = cache(getGenres);
    const genres = use(cachedGenres());
    const [selectedGenre, setSelectedGenre] = useState(0);
    let movies = [];
    if (selectedGenre) {
        const cachedMovies = cache(getMovies);
        movies = use(cachedMovies(selectedGenre));
    }

    return (
        <>
            <h1>Movies</h1>

            <Form.Select
                aria-label='Default select example'
                value={selectedGenre}
                onChange={(evt) => {
                    evt.preventDefault();
                    setSelectedGenre(evt.currentTarget.value);
                }}
            >
                <option>Choose Genre</option>
                {genres.genres.map((genre) => (
                    <option value={genre.id} key={genre.id}>
                        {genre.name}
                    </option>
                ))}
            </Form.Select>

            {!movies?.results?.length ? null : <MovieList movies={movies.results} />}
        </>
    );
}