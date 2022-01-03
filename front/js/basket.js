/*Récupération du panier */
let kanapInLocalStorage = JSON.parse(localStorage.getItem("products"));
const cartContent = document.getElementById("cart__items");

if (kanapInLocalStorage === null || kanapInLocalStorage == 0) {
  const emptyCart = `<div>Le panier est vide</div>`;
  cartContent.innerHTML = emptyCart;
}

function showProduct() {
  for (let product of kanapInLocalStorage) {
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
showProduct();

/* Suppression d'un article */
function deleteProduct() {
  for (let i = 0; i < kanapInLocalStorage.length; i++) {
    let btnDelete = document.getElementsByClassName("deleteItem")[i];
    btnDelete.addEventListener("click", function (e) {
      const id = e.target.id;
      const colors = e.target.dataset.colors;
      const productToDelete = kanapInLocalStorage.find(
        (element) => element._id === id && element.colors == colors
      );
      const remainingProducts = kanapInLocalStorage.filter(
        (element) => element !== productToDelete
      );

      localStorage.setItem("products", JSON.stringify(remainingProducts));
      
      if (confirm("Vous allez supprimer : " + product.quantity + "x " + product.name +" " + product.colors + " êtes vous sur?")) {
        window.location.reload();
      };
    });
  }
}
deleteProduct();

/* retirer ou ajouter un produit */
function modifQuantity() {
  for (let i = 0; i < kanapInLocalStorage.length; i++) {
    let productQuantity = document.getElementsByClassName("itemQuantity")[i];
    productQuantity.addEventListener("change", function (e) {
      const item = document.getElementsByClassName("cart__item")[i];
      const productId = item.dataset.id;
      const productColors = item.dataset.colors;
      const foundProduct = kanapInLocalStorage.find((element) => element._id === productId && element.colors === productColors);
      foundProduct.quantity = productQuantity.value;
      localStorage.setItem("products", JSON.stringify(kanapInLocalStorage));
      totalPrice();
    });
  }
}
modifQuantity();

function totalPrice() {
  /* total quantité produit et total prix */
  const cartQuantity = document.getElementById("totalQuantity");
  const cartTotalPrice = document.getElementById("totalPrice");
  let totalQuantityProduct = 0;
  let totalPriceProduct = 0;
  for (product of kanapInLocalStorage) {
    totalQuantityProduct = parseInt(totalQuantityProduct) + parseInt(product.quantity);
    totalPriceProduct = totalPriceProduct + product.quantity * product.price;
  }
  cartQuantity.innerText = totalQuantityProduct;
  cartTotalPrice.innerText = totalPriceProduct / 10;
}
totalPrice();

/* Validation des champs du formulaire*/
/*Nom et Prénom */
const form = document.querySelector(".cart__order__form");

form.firstName.addEventListener("change", function () {
  validName(this);
});
form.lastName.addEventListener("change", function () {
  validName(this);
});

const validName = function (inputName) {
  let nameRegExp = new RegExp("^[^- ][a-zA-Z '-àâäéèêëïîôöùûü]*[^- ]$", "g");
  let testName = nameRegExp.test(inputName.value);
  if (testName) {
    inputName.style.border = "2px solid green";
    return true;
  } else {
    inputName.style.border = "2px solid red";
    inputName.nextElementSibling.innerHTML = "Saisissez votre prénom ou votre nom";
    return false;
  }
};

/*adresse */
form.address.addEventListener("change", function () {
  validAddress(this);
});

const validAddress = function (inputAdress) {
  let addressRegExp = new RegExp("^[0-9]{1,4} [^- ][a-zA-Z '-àâäéèêëïîôöùûü]*[^- ]$", "g");
  let testAdress = addressRegExp.test(inputAdress.value);
  if (testAdress) {
    inputAdress.style.border = "2px solid green";
    return true;
  } else {
    inputAdress.style.border = "2px solid red";
    inputAdress.nextElementSibling.innerHTML = "Saisissez votre adresse";
    return false;
  }
};

/*Ville*/
form.city.addEventListener("change", function () {
  validCity(this);
});

const validCity = function (inputCity) {
  let cityRegExp = new RegExp("^[^- ][a-zA-Z '-àâäéèêëïîôöùûü]*[^- ]$", "g");
  let testCity = cityRegExp.test(inputCity.value);
  if (testCity) {
    inputCity.style.border = "2px solid green";
    return true;
  } else {
    inputCity.style.border = "2px solid red";
    inputCity.nextElementSibling.innerHTML = "Saisissez votre ville";

    return false;
  }
};

/*Email*/
form.email.addEventListener("change", function () {
  validEmail(this);
});

const validEmail = function (inputEmail) {
  let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$","g");
  let testEmail = emailRegExp.test(inputEmail.value);
  if (testEmail) {
    inputEmail.style.border = "2px solid green";
    return true;
  } else {
    inputEmail.style.border = "2px solid red";
    inputEmail.nextElementSibling.innerHTML ="Saisissez votre adresse mail complète";
    return false;
  }
};

/* envoi du formulaire */
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (
    validName(form.firstName) &&
    validName(form.lastName) &&
    validAddress(form.address) &&
    validCity(form.city) &&
    validEmail(form.email)
  ) {
    //form.submit()
    makeOrder();
  } else {
    e.preventDefault();
    alert("Veuillez remplir le formulaire correctement s'il vous plait !");
  }
});

const sendOrder = (theOrder) => {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(theOrder),
    headers: { "Content-type": "application/JSON" },
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("orderId", data.orderId);

      //Envoi de l'utilisateur vers la page de confirmation
      window.location.href = "confirmation.html" + "?" + "name" + "=" + data.orderId;
    });
};

function makeOrder() {
  const products = [];
  for (product of kanapInLocalStorage) {
    let productId = product._id;
    products.push(productId);
  }
  const contact = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    address: form.address.value,
    city: form.city.value,
    email: form.email.value,
  };

  let theOrder = {
    contact,
    products,
  };
  sendOrder(theOrder);
}