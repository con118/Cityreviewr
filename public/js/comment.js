const commentFormHandler = async (event) => {
  event.preventDefault();

  const reviewTitle = document.querySelector("#title").value.trim();
  const review = document.querySelector("#comment").value.trim();

  console.log(reviewTitle, review);
  //Where can i get city_id***********

  if (reviewTitle && review) {
    const response = await fetch("/api/reviews/submit-comment", {
      method: "POST",
      body: JSON.stringify({ reviewTitle, review, city_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // document.location.replace(`/${city_id}`);

      alert("review added");
    } else {
      alert("Failed to added new review.");
    }
  }
};

// document
//   .querySelector(".comment-form")
//   .addEventListener("submit", commentFormHandler);

document
  .querySelector(".submitButton")
  .addEventListener("click", commentFormHandler);
