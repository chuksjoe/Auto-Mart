// Toggle Menubar filter bar when the screen is below 800px
const menuList = document.getElementById("menu-list");
const menuBtn = document.getElementById("menu-btn");

menuBtn.onclick = () => {
  menuList.style.display === "block"
    ? (menuList.style.display = "none")
    : (menuList.style.display = "block");
};

window.addEventListener("resize", () => {
	if(window.innerWidth > 750) menuList.style.display = "flex";
	else menuList.style.display = "none";
});

// Format the values entered into a text input for either price or mileage
const numberInputs = document.querySelectorAll(`input[data-type="number"]`);
numberInputs.forEach(input => {
  input.onkeyup = function() {
    let val = this.value;
    if (this.classList.contains("price")) this.value = formatCurrency(val);
    else if (this.classList.contains("mileage"))
      this.value = formatKilometer(val);
  };
});


// Helper functions
const toggleScroll = () => {
  const overlays = document.querySelectorAll(".overlay");
  let hasOverlay = false;
  overlays.forEach(overlay => {
    if (overlay.style.display === "block") hasOverlay = true;
  });
  if (hasOverlay) document.body.classList.add("no-scroll");
  else document.body.classList.remove("no-scroll");
};

const formatCurrency = val => {
  val = val.replace(/[\D\s\._\-]+/g, "");
  val = val ? parseInt(val, 10) : 0;
  return val === 0 ? "" : `N ${val.toLocaleString("en-US")}`;
};

const formatKilometer = val => {
  val = val.replace(/[\D\s\._\-]+/g, "");
  val = val ? parseInt(val, 10) : 0;
  return val === 0 ? "" : `(Km) ${val.toLocaleString("en-US")}`;
};
