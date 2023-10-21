document.addEventListener("DOMContentLoaded", () => {
    function loadReviewsFromLocalStorage() {
        const savedReviews = localStorage.getItem("reviews");
        if (savedReviews) {
            return JSON.parse(savedReviews);
        }
        return [];
    }


    function updateReviewList(savedReviews) {
        const reviewList = document.getElementById("review-list");
        reviewList.innerHTML = ""; 

        savedReviews.forEach((review) => {
            const reviewItem = document.createElement("li");
            reviewItem.textContent = review;
            reviewList.appendChild(reviewItem);
        });
    }

    const savedReviews = loadReviewsFromLocalStorage();
    updateReviewList(savedReviews);

    const reviewForm = document.getElementById("review-form");
    reviewForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const newReviewInput = document.getElementById("review");
        const newReview = newReviewInput.value;
        if (newReview) {
            const savedReviews = loadReviewsFromLocalStorage();
            savedReviews.push(newReview);
            localStorage.setItem("reviews", JSON.stringify(savedReviews));
            updateReviewList(savedReviews);
            newReviewInput.value = "";
        }
    });
});
