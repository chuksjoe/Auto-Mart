// Toggle Filter filter bar when the screen is below 800px
const filterContainer = document.getElementById("filter-container");
const filterDdBtn = document.getElementById("filter-dd-btn");

filterDdBtn.addEventListener("click", () => {
  filterContainer.style.display === "block"
    ? (filterContainer.style.display = "none")
    : (filterContainer.style.display = "block");
});

window.addEventListener("resize", () => {
	if(window.innerWidth > 800) filterContainer.style.display = "block";
	else filterContainer.style.display = "none";
});