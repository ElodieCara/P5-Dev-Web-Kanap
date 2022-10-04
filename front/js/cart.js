//Récupérer le local storage et afficher le local storage
let totalPrice = 0
let totalQuantity = 0
let productsLocalStorage = JSON.parse(localStorage.getItem("product"))
if (!productsLocalStorage) productsLocalStorage = []

function getProduct(productId) {
  return fetch(`http://localhost:3000/api/products/${productId}`)
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
      article.remove()
      showNewTotalPriceAndQuantity()
    }
  });

}

//Changement de quantité
function getChangeListenerQuantities() {
  const inputQuantities = document.querySelectorAll(".itemQuantity");
  for (const inputQuantity of inputQuantities) {
    initChangeListenerQuantity(inputQuantity)
  }
}

function initChangeListenerQuantity(inputQuantity) {
  inputQuantity.addEventListener("change", (e) => {
    e.preventDefault()
    const article = e.target.closest(".cart__item")
    const id = article.dataset.id
    const color = article.dataset.color
    const productIndex = productsLocalStorage.findIndex(p => p._id === id && p.color === color)
    if (productIndex !== -1) {
      console.log(productIndex)
      console.log(inputQuantity.value)
      // si j'ai une quantité =0 je supprime,
      if (inputQuantity.valueAsNumber == 0) {
        productsLocalStorage.splice(productIndex, 1)
        localStorage.setItem("product", JSON.stringify(productsLocalStorage))
        article.remove()
      }
      // si j'ai une quantité à 100, une alerte;
      else if (inputQuantity.valueAsNumber > 100) {
        alert("Vous ne pouvez pas commander plus de 100 articles !")
        return
      }
      // sinon mettre à jour dans le local storage
      else {
        productsLocalStorage[productIndex].quantity = inputQuantity.valueAsNumber
        localStorage.setItem("product", JSON.stringify(productsLocalStorage));
      }
      // window.location.reload()
      // showTotalPriceAndQuantity()
      showNewTotalPriceAndQuantity()
    }
  })
}

//Afficher total du prix
function showTotalPriceAndQuantity() {
  document.querySelector("#totalQuantity").innerText = totalQuantity
  document.querySelector("#totalPrice").innerText = totalPrice
}

async function showNewTotalPriceAndQuantity() {
  totalPrice = 0
  totalQuantity = 0
  for (let productInLS of productsLocalStorage) {
    const product = await getProduct(productInLS._id)
    totalPrice += product.price * productInLS.quantity
    totalQuantity += productInLS.quantity
  }
  document.querySelector("#totalQuantity").innerText = totalQuantity
  document.querySelector("#totalPrice").innerText = totalPrice
}


async function displayProducts() {
  await showLocalStorage()
  showTotalPriceAndQuantity()
  getChangeListenerQuantities()
  getDeleteListenerButtons()
}

displayProducts();

// ----------------------------------------------------------------------------
// Formulaire
//-----------------------------------------------------------------------------
let form = document.querySelector('.cart__order__form')
const btnOrder = document.querySelector('#order')
console.log(form.email);

//Validation des données
function validFirstNameListener() {
  form.firstName.addEventListener('change', () => {
    validFirstName()
  })
}

function validFirstName() {
  let firstNameRegExp = new RegExp(
    '^[A-Z][A-Za-z\é\è\ê\-]+$', 'g'
  )
  //Valider ou Message d'erreur FirstName
  let inputFirstName = document.querySelector('#firstName')
  if (firstNameRegExp.test(inputFirstName.value)) {
    inputFirstName.style.border = '#333 1px solid'
    document.querySelector("#firstNameErrorMsg").textContent = ""
    return true
  } else {
    inputFirstName.style.border = '#CC3300 2px solid'
    document.querySelector("#firstNameErrorMsg").textContent = "Veulliez renseigner le champ !"
    return false
  }
}

function validLastNameListener() {
  form.lastName.addEventListener('change', () => {
    validLastName()
  })
}
function validLastName() {
  let lastNameRegExp = new RegExp(
    '^[A-Z][A-Za-z\é\è\ê\-]+$', 'g'
  )
  //Valider ou Message d'erreur LastName
  let inputLastName = document.querySelector('#lastName')
  if (lastNameRegExp.test(inputLastName.value)) {
    inputLastName.style.border = '#333 1px solid'
    document.querySelector("#lastNameErrorMsg").textContent = ""
    return true
  } else {
    inputLastName.style.border = '#CC3300 2px solid'
    document.querySelector("#lastNameErrorMsg").textContent = "Veuillez renseigner le champ !"
    return false
  }
}

function validCityListener() {
  form.city.addEventListener('change', () => {
    validCity()
  })
}

function validCity() {
  let cityRegExp = new RegExp(
    '^[a-zA-Z0-9.,-_ ]{5,50}[ ]{0,2}$', 'g'
  )
  //Valider ou Message d'erreur City
  let inputCity = document.querySelector('#city')
  if (cityRegExp.test(inputCity.value)) {
    inputCity.style.border = '#333 1px solid'
    document.querySelector("#cityErrorMsg").textContent = ""
    return true
  } else {
    inputCity.style.border = '#CC3300 2px solid'
    document.querySelector("#cityErrorMsg").textContent = "Veuillez renseigner le champ !"
    return false
  }
}

function validAddressListener() {
  form.address.addEventListener('change', () => {
    validAddress()
  })
}

function validAddress() {
  let addressRegExp = new RegExp(
    /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/
  );
  //Message d'erreur
  let inputAddress = document.querySelector('#address')
  let addressMsg = document.querySelector('#addressErrorMsg')
  if (addressRegExp.test(inputAddress.value)) {
    inputAddress.style.border = '#333 1px solid'
    addressMsg.textContent = ""
    return true
  } else {
    inputAddress.style.border = '#CC3300 2px solid'
    addressMsg.textContent = "Veulliez renseigner le champ !"
    return false
  }
}

//  Champ email
function validEmailListener() {
  form.email.addEventListener('change', () => {
    validEmail()
  })
}

function validEmail() {
  //création de la regexp pour validation email
  let emailRegExp = new RegExp(
    '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g'
  );
  let inputEmail = document.querySelector('#email')
  //Message d'erreur
  let emailMsg = document.querySelector('#emailErrorMsg')
  if (emailRegExp.test(inputEmail.value)) {
    emailMsg.innerHTML = ''
    return true
  } else {
    emailMsg.innerHTML = 'Adresse Non Valide'
    return false
  }
}

validCityListener()
validFirstNameListener()
validLastNameListener()
validEmailListener()
validAddressListener()

//formulaire validé à envoyer dans le local storage
function order() {
  document.querySelector('#order').addEventListener('click', (e) => {
    e.preventDefault()
    if (!(validAddress() && validCity() && validEmail() && validFirstName() && validLastName())) {
      alert("Formulaire Invalide")
      return;
    }
    let productsLS = JSON.parse(localStorage.getItem("product"))
    if (!productsLS) {
      alert("Panier vide")
      return;
    }
    let contact = {
      firstName: document.querySelector('#firstName').value,
      lastName: document.querySelector('#lastName').value,
      address: document.querySelector('#address').value,
      city: document.querySelector('#city').value,
      email: document.querySelector('#email').value,
    }

    const productIds = productsLS.map(p => p._id)
    const body = {
      contact, products: productIds
    }
    fetch("http://localhost:3000/api/products/order", {
      method: "POST", body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(resp => {
        localStorage.clear()
        window.location.href = "confirmation.html?orderID=" + resp.orderId
      })
  })
}

order()