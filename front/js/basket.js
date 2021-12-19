/*On rappelle ce qu'il y a dans le local storage => cad tout ce qu'il y a dans le panier */
let productsInLocalStorage = JSON.parse(localStorage.getItem("products"));
console.log(productsInLocalStorage);
const cartContent = document.getElementById("cart__items");

if (productsInLocalStorage === null || productsInLocalStorage == 0) {
  const emptyCart = `<div>Le panier est vide</div>`;
  cartContent.innerHTML = emptyCart;
}

function affichProduct() {
  for (let product of productsInLocalStorage) {
    cartContent.innerHTML += `
            <article class="cart__item" data-id="${product._id}" data-colors="${product.colors}">
                    <div class="cart__item__img">
                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                    </div>
                    <div class="cart__item__content">
                    <div class="cart__item__content__titlePrice">
                        <h2>${product.name}</h2>
                        <p>${product.price / 10}</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : ${product.colors}</p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                        </div>
                            <div class="cart__item__content__settings__delete">
                            <p class="deleteItem" id="${product._id}" data-colors="${product.colors}">Supprimer</p>
                        </div>
                    </div>
                    </div>
                </article>
            `;
  }
}
affichProduct();

/* suppression d'un article */
function suppressionProduct() {
  for (let i = 0; i < productsInLocalStorage.length; i++) {
    let btnDelete = document.getElementsByClassName("deleteItem")[i];
    btnDelete.addEventListener("click", function (e) {
      const id = e.target.id;
      const colors = e.target.dataset.colors;
      const productToDelete = productsInLocalStorage.find(
        (element) => element._id === id && element.colors == colors
      );
      const remainingProducts = productsInLocalStorage.filter(
        (element) => element !== productToDelete
      );

      localStorage.setItem("products", JSON.stringify(remainingProducts));
      window.location.reload();
      alert("Vous avez supprimé : " + product.quantity + "x " + product.name +" " + product.colors);
    });
  }
}
suppressionProduct();