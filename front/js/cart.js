// Etape 1: récupérer le local storage
// Etape 2 : afficher le local storage
let totalPrice = 0
let totalQuantity = 0
let productsLocalStorage = JSON.parse(localStorage.getItem("product"))
//Si le localStorage existe
if (!productsLocalStorage) productsLocalStorage = []



/* Aller chercher l'Url */
function getProduct(productId) {
  return fetch(`http://localhost:3000/api/products/${productId}`) // on ajoute l'Id
    .then(response => response.json())
    .catch(error => {
      console.log(error);
    });
}

async function showLocalStorage() {
  for (let productInLS of productsLocalStorage) {
    const product = await getProduct(productInLS._id)
    totalPrice += product.price * productInLS.quantity
    totalQuantity += productInLS.quantity
    document.querySelector('#cart__items').innerHTML += `<article class="cart__item" data-id="${productInLS._id}" data-color="${productInLS.color}">
        <div class="cart__item__img">
          <img src="${product.imageUrl}" alt="${product.alt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${product.name}</h2>
            <p>${productInLS.color}</p>
            <p>${product.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInLS.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`
  }

}

function showTotalPriceAndQuantity() {
  document.querySelector("#totalQuantity").innerText = totalQuantity
  document.querySelector("#totalPrice").innerText = totalPrice
}
//---------------------------------------------------------------------------------
////Modifier quantité du panier

function getChangeQuantity() {
  const changeQuantities = document.querySelectorAll(".itemQuantity");
  for (const changeQuantity of changeQuantities) {
    initChangeListener(changeQuantity)
  }
}

function initChangeQuantity(changeQuantity) {
  changeQuantity.addEventListener("change", (e) => {
    e.preventDefault()
    const article = e.target.closest(".cart__item")
    const id = article.dataset.id
    const color = article.dataset.color
    const productIndex = productsLocalStorage.findIndex(p => p._id === id && p.color === color)
    if (productIndex == 0) {
      e.target.closest(".cart__item").remove
    }
    localStorage.setItem("product", JSON.stringify(productsLocalStorage))
    window.location.reload()
  });
}
// function changeQuantityLocalStorage() {

//   document.querySelector(".itemQuantity".forEach(quantityButton => {
//     quantityButton.addEventListener("change", (e) => {
//       productInLS.changeQuantity({
//         _id: e.target.closet("cart__item").dataset.id,
//         color: e.target.closet(".cart__item").dataset.color,
//         quantity: parseInt(e.target.value)
//       })
//       if (parseInt(e.target.value) == 0) {
//         e.target.closest(".cart__item").remove
//       }
//       changeQuantityLocalStorage()
//     })
//   }))
// }

//---------------------------------------------------------------------------------
//Suppression de produits



function getDeleteListenerButtons() {
  const deleteBtns = document.querySelectorAll(".deleteItem");
  for (const deleteBtn of deleteBtns) {
    initDeleteListener(deleteBtn)
  }
}

function initDeleteListener(deleteBtn) {
  deleteBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const article = e.target.closest(".cart__item")
    const id = article.dataset.id
    const color = article.dataset.color
    const productIndex = productsLocalStorage.findIndex(p => p._id === id && p.color === color)
    if (productIndex !== -1) {
      productsLocalStorage.splice(productIndex, 1)
      localStorage.setItem("product", JSON.stringify(productsLocalStorage))
      window.location.reload()
    }
  });
}

// function changeQuantityLocalStorage() {
//   const input = document.getElementsByClassName(".itemQuantity")
//   input.addEventListener('change', (e) => {
//     let basket = JSON.parse(localStorage.getItem("changeQuantity"))
//     for (productInLS of basket)
//       if (
//         product._id === cart.dataset.id && cart.dataset.color === product.color
//       ) {
//         product.quantity = e.target.value
//       }
//   }

// function changeLocalStorage() {
//   for (let productInLS of productsLocalStorage) {
//     const product = getProduct(productInLS._id)
//     const changeQuantity = document.getElementsByClassName("itemQuantity")

//     changeQuantity.addEventListener("change", () => {
//       let basket = JSON.parse(localStorage.getItem("changeQuantity"))
//       for (productInLS of basket)
//         if (
//           product._id === cart.dataset.id && cart.dataset.color === product.color
//         ) {
//           product.quantity = e.target.value
//           localStorage.addQuantity = JSON.stringify(basket)
//           cart.dataset.quantity = e.target.value
//           totalProducts()
//         }
//     })
//   }
// }

// document.querySelector(".itemQuantity").addEventListener("change", (e) => {
//   e.preventDefault()
//   const closestItem = Item.closest(productInLS.id)
//   if (!closestItem.target.closest('p').classList.contains('toggle')) {
//     return
//   }

//   const Item = document.querySelector(closestItem.target.closest('p').hash)
// })

// function changeLocalStorage() {
//   const cart = document.getElementById(".cart__item")
//   cart.forEach((cart) => {
//     cart.addEventListener("change", (eq) => {
//       let panier = JSON.parse(localStorage.getItem("addQuantity"))
//       for (product of panier)
//         if (
//           product._id === cart.dataset.id && cart.dataset.color === product.color
//         ) {
//           product.quantity = eq.target.value
//           localStorage.addQuantity = JSON.stringify(panier)
//           cart.dataset.quantity = eq.target.value
//           totalProducts()
//         }
//     })
//   })
// document.getElementsByClassName(".itemQuantity").addEventListener("click", (e) => {
//   e.preventDefault()

//   const Quantity = document.querySelectorAll("itemQuantity")

//   change.forEach((positive) => {
//     positive.addEventListener("click", (e) => {
//       XPathResult.textContent = (e.target.id);
//     })
//   })
// })

// const AddQuantity = document.querySelectorAll("itemQuantity")
// const deleteQuantity = document.querySelectorAll("itemQuantity")

//   document.getElementsByClassName(".itemQuantity").addEventListener("click", (e) => {
//     e.preventDefault()
//     const AddQuantity = getProductId()
//     const deleteQuantity = getProductId()
//     forEach((positive) => {
//       positive.add
//     })
//   })

//----------------------------------------------------------------






async function displayProducts() {
  await showLocalStorage()
  showTotalPriceAndQuantity()
  getDeleteListenerButtons()
  getChangeQuantity()
}


displayProducts();


// ----------------------------------------------------------------------------

