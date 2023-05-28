const commentFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const reviews = document.querySelector("#comment").value.trim();
  const city_id = document.querySelector("#cityId").value.trim();

  console.log(title, reviews);
  //Where can i get city_id***********
  if (title && reviews) {
    const response = await fetch("/api/review/submit-comment", {
      method: "POST",
      body: JSON.stringify({ title, reviews, city_id }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace(`/${city_id}`);
      alert("review added");
    } else {
      alert("Failed to added new review.");
    }
  }
};
document
  .querySelector(".submit_form")
  .addEventListener("submit", commentFormHandler);