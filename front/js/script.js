//Requête de l'API pour lui demander l'ensemble des produits

function getProducts() {
    return fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .catch(error => {
            console.log(error);
        });
}

//--------------------------------------------------------------------------------------
// Affichage catalogue produits
//--------------------------------------------------------------------------------------

function formatProducts(productsToFormat) {
    for (let product of productsToFormat) {
        document.querySelector('#items').innerHTML += `<a href="./product.html?id=${product._id}">
            <article>
                <img src="${product.imageUrl}" alt="${product.altTxt}">
                    <h3 class="productName">${product.name}</h3>
                    <p class="productDescription">${product.description}</p>
            </article>
        </a>`;
    }
}

async function displayProducts() {
    const products = await getProducts();
    if (products && products.length) {
        formatProducts(products);
    }
}

displayProducts();
