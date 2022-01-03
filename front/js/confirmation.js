//On  récupère le numéro de commande via l'URL //même chose que dans product.js
const urlConfirmation = new URL(window.location.href);
//Fonction pour récupérer l'orderId de l'url
const getId = () => {
  const getConfirmationId = urlConfirmation.searchParams.get("name");
  document.getElementById("orderId").innerHTML = getConfirmationId;
};
getId();

//On vide le local storage
localStorage.removeItem("products");
localStorage.removeItem("orderId");