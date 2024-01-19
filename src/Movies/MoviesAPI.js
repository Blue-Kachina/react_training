const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjY1NTlmZDM3OTlmOTQ2NmM2NGVhMGRhYTQyMDU0MyIsInN1YiI6IjU1NGI0OWM3OTI1MTQxNDY5YzAwMTk1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qJWSAVUgQylJnOnzQkRHVT6OwJpX9EmTOB5n7JcLPek'
    }
};

fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));