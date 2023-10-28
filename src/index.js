document.addEventListener("DOMContentLoaded", () => {

    const baseUrl = "http://localhost:3000";
    console.log("API base URL:", baseUrl);

    // fetch beer details.
    const fetchBeer = (beerId) => {

        fetch(`${baseUrl}/beers/${beerId}`)
            .then((response) => response.json())
            .then((beerData) => {
                const beerName = document.getElementById("beers-name");
                const beerDescription = document.getElementById("beers-description");
                const beerImage = document.getElementById("beers-image");
                const reviewList = document.getElementById("reviews-list");

                // show beer details on web
                beerName.textContent = beers.name;
                beerDescription.textContent = beers.description;
                beerImage.src = beers.image_url;

                //clears the existing reviews and add new reviews to the list.
                reviewList.innerHTML = "";
                beerData.reviews.forEach((review) => {
                    const li = document.createElement("li");
                    li.textContent = review;
                    reviewList.appendChild(li);
                });
            });
    };

    // Function to fetch and display the beer menu.
    const fetchBeerMenu = () => {
        // Within this function, we initiate a fetch to obtain the list of available beers from the API.
        fetch(`${baseUrl}/beers`)
            .then((response) => response.json())
            .then((beers) => {

                const beerList = document.getElementById("beer-list");
                beerList.innerHTML = "";  // clears any existing menu items.

                // Iterate through the list of beers and create a menu item for each.
                beers.forEach((beer) => {
                    const li = document.createElement("li");
                    li.textContent = beer.name;
                    li.dataset.beerId = beer.id;

                    // We add an event listener to each menu item to display beer details when clicked.
                    li.addEventListener("click", () => {
                        fetchBeer(beer.id);
                    });

                    // adds the menu item to the beer menu.
                    beerList.appendChild(li);
                });

                if (beers.length > 0) {
                    fetchBeer(beers[0].id);
                }
            });
    };

    // Add a click event listener to the review list.
    document.getElementById("review-list").addEventListener("click", (event) => {
        if (event.target.tagName === "LI") {
            event.target.remove(); // Remove the clicked review item.
        }
    });

    // Add a click event listener to the beer list in the navigation.
    document.getElementById("beer-list").addEventListener("click", (event) => {
        if (event.target.tagName === "LI") {
            // Get the beer ID from the clicked item.
            const beerId = event.target.dataset.beerId;
            fetchBeer(beerId);
        }
    });

    // We proceed to handle the review form.
    const reviewForm = document.getElementById("review-form");
    reviewForm.addEventListener("submit", (event) => {
        event.preventDefault(); // We prevent the default form submission.

        // We retrieve the new review text from the input field.
        const newReview = document.getElementById("review").value;
        const reviewList = document.getElementById("review-list");

        // We display the new review in the list and clear the input field.
        const li = document.createElement("li");
        li.textContent = newReview;
        reviewList.appendChild(li);
        document.getElementById("review").value = ""; // We clear the review input field.
    });

    // As part of the initial setup, we fetch and display the beer menu when the page loads.
    fetchAndDisplayBeerMenu();
});
