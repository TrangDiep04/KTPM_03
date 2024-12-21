document.addEventListener("DOMContentLoaded", () => {
    const movieListContainer = document.getElementById('movie-list'); // Ensure this matches the HTML element ID
  
    // Fetch the movie data from the API
    fetch('http://localhost:3000/movies')
      .then(response => response.json())
      .then(movies => {
        // Loop through the movies and generate the HTML content
        movies.forEach(movie => {
          const movieCard = document.createElement('div');
          movieCard.classList.add('movie-card');
  
          movieCard.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <div class="content">
              <h2>${movie.title}</h2>
              <p><strong>Director:</strong> ${movie.director}</p>
              <p><strong>Year:</strong> ${movie.year}</p>
            </div>
          `;
          movieListContainer.appendChild(movieCard);
          console.log(movie.image);

        });
      })
      .catch(error => console.error('Error fetching data:', error));
});
