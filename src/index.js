document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "http://localhost:3000";
    console.log("API base URL:", baseUrl);
    
    // Function to fetch beer details
    const fetchBeer = (beerId) => {
        fetch(`${baseUrl}/beers/${beerId}`)
            .then((response) => response.json())
            .then((beerData) => {
                const beerName = document.getElementById("beer-name");
                const beerDescription = document.getElementById("beer-description");
                const beerImage = document.getElementById("beer-image");
                const reviewList = document.getElementById("review-list");
    
                beerName.textContent = beerData.name;
                beerDescription.textContent = beerData.description;
                beerImage.src = beerData.image_url;
    
                // clear existing reviews and add new reviews
                reviewList.innerHTML = "";
                beerData.reviews.forEach((review) => {
                    const li = document.createElement("li");
                    li.textContent = review;
                    reviewList.appendChild(li);
                });
            });
    };
    
    // Function to fetch beer menu.
    const fetchBeerMenu = () => {
        fetch(`${baseUrl}/beers`)
            .then((response) => response.json())
            .then((beers) => {
                const beerList = document.getElementById("beer-list");
                // Clears existing menu items.
                beerList.innerHTML = "";
    
                // Iterate through the list of beers.
                beers.forEach((beer) => {
                    const li = document.createElement("li");
                    li.textContent = beer.name;
                    li.dataset.beerId = beer.id;
    
                    // Add an event listener to each menu item to display beer details when clicked and Add menu item.
                    li.addEventListener("click", () => {
                        fetchBeer(beer.id);
                    });

                    beerList.appendChild(li);
                });
    
                // Select and display the first beer.
                if (beers.length > 0) {
                    fetchBeer(beers[0].id);
                }
            });
    };
    
    //click event listener to the review list.
    document.getElementById("review-list").addEventListener("click", (event) => {
        if (event.target.tagName === "LI") {
            event.target.remove();
        }
    });

    // Click event listener to the beer list and get beer id.
    document.getElementById("beer-list").addEventListener("click", (event) => {
        if (event.target.tagName === "LI") {
            const beerId = event.target.dataset.beerId;
            fetchBeer(beerId);
        }
    });
    
    const reviewForm = document.getElementById("review-form");
    reviewForm.addEventListener("submit", (event) => {
        event.preventDefault();
    
        // New review
        const newReview = document.getElementById("review").value;
        const reviewList = document.getElementById("review-list");
    
        const li = document.createElement("li");
        li.textContent = newReview;
        reviewList.appendChild(li);
        document.getElementById("review").value = "";
    });
    
    fetchBeerMenu();
});
