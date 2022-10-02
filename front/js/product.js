// On récupère de l'ID du produit
function getProductId() {
  return new URL(location.href).searchParams.get("id")
}

function getProduct(productId) {
  return fetch(`http://localhost:3000/api/products/${productId}`)
    .then(response => response.json())
    .catch(error => {
      console.log(error);
    });
}

//On recréé les balises img et altText dans la div.item__img
function createImage(imageURL, altText) {
  const image = document.createElement("img")
  image.src = imageURL
  image.alt = altText
  const parent = document.querySelector(".item__img")
  if (parent != null) parent.appendChild(image)
}

//On récupére nos informations pour les injecter dans le fichier HTML
function hydrateProduct(product) {
  document.getElementById("title").textContent = product.name
  document.getElementById("price").textContent = product.price
  document.getElementById("description").textContent = product.description
  document.getElementById('colors').insertAdjacentHTML("beforeend", product.colors.map(color => `<option value="${color}">${color}</option>`))
  createImage(product.imageUrl, product.altTxt);
}

async function displayProduct() {
  const productId = getProductId()
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

// LocalStorage 
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