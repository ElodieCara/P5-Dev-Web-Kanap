// BESOIN PRINCIPAL : AFFICHER DONNEES DE CHAQUE CANAPE
// Etape1: RécupéreR L'ID dans l'URL (location.href)
// Etape2: remplacer l'id de l'élément par son identifiant
// Etape3: récupérer dans la base de données 

/* Rediriger l'URL dans l'API */
function getProductId() {
  return new URL(location.href).searchParams.get("id")
  //location.href permet d'obtenir la chaine complète product, searchParams.get("id") on récupère l'Id de chaque article
}

/* Aller chercher l'Url */
function getProduct(productId) {
  return fetch(`http://localhost:3000/api/products/${productId}`) // on ajoute l'Id
    .then(response => response.json())
    .catch(error => {
      console.log(error);
    });
}



function createImage(imageURL, altText) {
  //On recréé les balises img et altText dans la div.item__img
  const image = document.createElement("img")
  image.src = imageURL
  image.alt = altText
  const parent = document.querySelector(".item__img")
  if (parent != null) parent.appendChild(image)
}



function hydrateProduct(product) {
  //On récupére nos informations
  document.getElementById("title").textContent = product.name
  document.getElementById("price").textContent = product.price
  document.getElementById("description").textContent = product.description
  document.getElementById('colors').insertAdjacentHTML("beforeend", product.colors.map(color => `<option value="${color}">${color}</option>`))
  createImage(product.imageUrl, product.altTxt);
}

async function displayProduct() {
  //récupére l'ID dans notre URL
  const productId = getProductId()
  //récupère un article
  const product = await getProduct(productId)
  hydrateProduct(product)
}

// Ajouter des produits dans la page panier
function formatProduct(productId, color, quantity) {
  return {
    _id: productId,
    color: color,
    quantity: quantity,
  }
}

/* LocalSotrage */
function manageLocalStorage() {
  document.getElementById("addToCart").addEventListener("click", e => {
    e.preventDefault()
    const productId = getProductId()
    const color = document.getElementById('colors').value
    const quantity = document.getElementById('quantity').valueAsNumber
    if (!color) {
      alert("Veuillez séléctionner une couleur")
      return
    }
    if (quantity > 100 || quantity < 1) {
      alert("La quantité doit être comprise entre 1 et 100")
      return
    }
    const product = formatProduct(productId, color, quantity)
    //Récupère des données du localStorage
    let productsLocalStorage = JSON.parse(localStorage.getItem("product"))
    //Si le localStorage existe
    if (!productsLocalStorage) productsLocalStorage = []
    //On recherche si l'Id d'un produit de même couleur est déjà dans le panier avec la méthode findIndex
    const productIndex = productsLocalStorage.findIndex(p => p._id === productId && p.color === color)
    // Si il n'y est pas, on push le nouvel article
    if (productIndex === -1) {
      productsLocalStorage.push(product)
    }
    //Sinon le nouvel article s'additionne
    else {
      productsLocalStorage[productIndex].quantity += quantity
    }
    localStorage.setItem("product", JSON.stringify(productsLocalStorage))
  })
}

displayProduct();
manageLocalStorage();

//---------------------------------------------------------------------------------------







// const str = window.location.href;
// const url = new URL(str);
// const id = url.searchParams.get("id");
// console.log(id);
// var search_params = new URLSearchParams(url.search);
// /*has() utilisé pour vérifier si le paramètre existe dans l'URL
//   renvoie true si le paramètre existe, sinon false.
//   Si existe, sa valeur peut être trouvée via la méthode get.*/
// if (search_params.has('id')) {
//     var id = search_params.get('id');
//     console.log('id');
// }


////ou////

// var chemin = window.location.pathname; //chemin reçoit le chemin de l'url
// var url = window.location.href; //la variable reçoit l'url courante
// créer une nouvelle url avec searchParams pour savoir quels produits afficher
// let params = new URL(window.location.href).searchParams;

////ou////

// let searchParams = new URLSearchParams(window.location.search);
//l'URL new + ID
// let newID = params.get('id');

//////////////////////////////////////////////////////////////////////////////////////////////



////Appeler new API avec ID du canapé séléctionné////

// fetch()
//   .then(function(res) {
//   if (res.ok) {
//     return res.json();
//   }
// })
//     .then(function (value) {
//       console.log(value);
//     })
//     .catch(function (err) {
//       // Une erreur est survenue
//     });

// function getProduct() {
//   return fetch(id)
//     .then(response => response.json())
//     .catch(error => {
//       console.log(error);
//     })
// }


// variables  Get /{product-ID} (doit être remplacé par l'ID d'un produit)
// let colors = document.getElementById('colors');
// // let id = document.getElementsByClassName('_id');
// let name = document.getElementById('name');
// let price = document.getElementById('price');
// let imageURL = document.getElementsByClassName('item__img');
// let description = document.getElementById('description');
// // let altTxt = document.getElementsByClassName('altText');



/////////////////////////////////////////////////////////////////////////


