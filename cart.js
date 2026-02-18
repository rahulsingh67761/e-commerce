let cart = [];
const cartCount = document.getElementById("cartCount");
const addButtons = document.querySelectorAll(".card button");

addButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    cart.push(products[index]);
    cartCount.textContent = cart.length;
    btn.textContent = "Added ✓";
    btn.disabled = true;
  });
});
