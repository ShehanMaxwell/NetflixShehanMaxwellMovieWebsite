const apiUrl = 'https://api.tvmaze.com/shows';
const searchInput = document.querySelector('.search-box input');
const imagesGrid = document.querySelector('.images-grid');

// Function to render movies on the grid
const renderMovies = (movies) => {
  imagesGrid.innerHTML = ''; // Clear the current grid

  movies.slice(0, 3).forEach((show) => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');

    const showImage = document.createElement('img');
    showImage.src = show.image.medium;
    showImage.alt = show.name;

    const movieDetails = document.createElement('div');
    movieDetails.classList.add('movie-details');
    movieDetails.innerHTML = `<p class="white-text">${show.name}</p>
                              <p class="grey-text">${show.summary}</p>`;

    const closeButton = document.createElement('button');
    closeButton.innerHTML =
      '<img src="Assets/Icons/Close Black.svg" alt="Close Icon">';
    movieContainer.appendChild(closeButton);
    movieContainer.appendChild(showImage);
    movieContainer.appendChild(movieDetails);

    imagesGrid.appendChild(movieContainer);

    // Add event listener for close button
    closeButton.addEventListener('click', () => {
      // Remove the movie from the grid
      imagesGrid.removeChild(movieContainer);
    });

    // Add event listener for mouseover to show movie details
    movieContainer.addEventListener('mouseover', () => {
      movieDetails.style.transform = 'translateY(0)';
    });

    // Add event listener for mouseout to move movie details to the bottom
    movieContainer.addEventListener('mouseout', () => {
      movieDetails.style.transform = 'translateY(100%)';
    });
  });
};

// Fetch initial data
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    // Initial rendering
    renderMovies(data.slice(0, 3));

    // Event listener for search input
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredMovies = data.filter((show) =>
        show.name.toLowerCase().includes(searchTerm)
      );

      renderMovies(filteredMovies);
    });

    // Function to change the hero image after a few seconds
    const heroImageContainer = document.querySelector('.hero-area img');
    const heroImages = [
      'Assets/HeaderImage.jpg',
      'Assets/HeaderImage2.jpg',
      'Assets/HeaderImage3.jpg',
      'Assets/HeaderImage4.jpg',
      'Assets/HeaderImage5.jpg',
    ];
    let currentHeroImageIndex = 0;

    setInterval(() => {
      currentHeroImageIndex = (currentHeroImageIndex + 1) % heroImages.length;
      heroImageContainer.src = heroImages[currentHeroImageIndex];
    }, 2000); // Change hero image every 5 seconds (5000 milliseconds)
  })
  .catch((error) => console.error('Error fetching data:', error));
