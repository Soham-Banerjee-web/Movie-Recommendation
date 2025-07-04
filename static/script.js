const API_KEY = "d3a6f45d";  // Your OMDb API Key

document.getElementById("search-btn").addEventListener("click", function() {
    let movieTitle = document.getElementById("search-input").value.trim();

    fetch(`/recommend?title=${movieTitle}`)
        .then(response => response.json())
        .then(data => {
            let resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = ""; // Clear previous results

            if (data.recommended) {
                data.recommended.forEach(movie => {
                    fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movie)}&apikey=${API_KEY}`)
                        .then(response => response.json())
                        .then(movieData => {
                            let movieCard = document.createElement("div");
                            movieCard.classList.add("movie-card");

                            let poster = movieData.Poster && movieData.Poster !== "N/A" 
                                ? movieData.Poster 
                                : "https://via.placeholder.com/150";

                            movieCard.innerHTML = `
                                <img src="${poster}" alt="${movie}">
                                <div class="movie-title">${movie}</div>
                            `;

                            resultsDiv.appendChild(movieCard);
                        })
                        .catch(error => console.error("Error fetching movie details:", error));
                });
            } else {
                resultsDiv.innerHTML = "<p>No recommendations found.</p>";
            }
        })
        .catch(error => console.error("Error fetching recommendations:", error));
});
