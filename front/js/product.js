const canapeId = new URL(location.href).searchParams.get("id")
// 3 . Appeler cette nouvelle url avec la méthode fetch
// 4 . Remplacer les données statiques par le résultat du fetch
const itemImage = document.getElementsByClassName("item__img")[0];
const itemTitle = document.getElementById("title");
const itemPrice = document.getElementById("price");
const itemDescription = document.getElementById("description");
const itemColors = document.getElementById("colors");
let product;

//Fonction appel API pour afficher seulement le détail d'un produit selctionné
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