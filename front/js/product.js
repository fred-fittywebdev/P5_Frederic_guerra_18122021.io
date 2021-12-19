// Récupération de l'id passé en paramètre de l'URl et mise en variable.
const canapeId = new URL(location.href).searchParams.get("id")
// On créé les variables correspondantes aux ID pour l'affichage
const itemImage = document.getElementsByClassName("item__img")[0];
const itemTitle = document.getElementById("title");
const itemPrice = document.getElementById("price");
const itemDescription = document.getElementById("description");
const itemColors = document.getElementById("colors");
let product;

//Appel API pour afficher uniquement le produit correspondant à la variable canapeID
showProductsInProduct()

function showProductsInProduct() {
  fetch(`http://localhost:3000/api/products/${canapeId}`)
    .then((reponse) => reponse.json())
    .then((content) => {
      showProductDetail(content)
    })
    .catch((error) => console.error(error));
}

function showProductDetail(content){
  product = content;
  let name = content.name;
  let description = content.description;
  let imageUrl = content.imageUrl;
  let altTxt = content.altTxt;
  let colors = content.colors;
  let price = content.price / 10;

  itemImage.innerHTML = `
          <img src="${imageUrl}" alt="${altTxt}">
      `;

  itemTitle.innerText = name;

  itemPrice.innerText = price;

  itemDescription.innerText = description;

  for (let color of colors) {
    itemColors.innerHTML += `
          <option value="${color}">${color}</option>
          `;
  }
}


function addBasket() {
  const addToCartButton = document.getElementById("addToCart");
  addToCartButton.addEventListener("click", function () {
    // On vérifie qu'une couleur a bien été choisie
    const selectedColor = document.getElementById("colors").value;
    if (selectedColor === "") {
      return alert("Vous n'avez pas sélectionné la couleur du canapé !");
    } else {
      product.colors = selectedColor;
    }

    // On vérifie qu'une coquantité a bien été choisie
    const quantityProducts = document.getElementById("quantity");
    if (quantityProducts.value == 0 || quantityProducts.value < 0) {
      return alert("Veuillez définir le nombre d'article !");
    }

    // On utilise le spread opérateur pour ajouter la quantité choisie aux informations du produit déjà collectées
    const selectedProduct = {...product, quantity: parseInt(quantityProducts.value)};

    // On vérmet le produit dans le localstorage
    let productsInLocalStorage = JSON.parse(localStorage.getItem("products")) || [];
    

    //On vérifie si le produit est déjà dans le panier ==> si oui on incrémente la quantité sinon on l'ajoute
    const foundProduct = productsInLocalStorage.find((element) => element._id === selectedProduct._id && element.colors === selectedProduct.colors);
    
    if (foundProduct) {
      foundProduct.quantity += parseInt(quantityProducts.value);
      alert(quantityProducts.value + "x " + selectedProduct.name + " " + selectedProduct.colors + " ont été ajouté au panier !" );
    } else {
      productsInLocalStorage.push(selectedProduct);
      alert(quantityProducts.value + "x " + selectedProduct.name + " " + selectedProduct.colors + " ont été ajouté au panier !");
    }
    localStorage.setItem("products", JSON.stringify(productsInLocalStorage));

    window.location.reload();
  });
}
addBasket();