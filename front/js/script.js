// BESOIN PRINCIPAL : AFFICHER DES CANAPES
// Etape1: Récupérer les canapés (appel au back)
// Etape2: Formater la data de chaque canapé
// Etape3: Afficher la liste de canapés

// NORMALISATION
// IMPORTANT --> INDENTATION
// le code doit etre en ANGLAIS (FRANGLAIS accepté) 
// chaque fonction ou variable sera écrit en camelCase: exemple const myVariable, const nowImADevelopper
// le nom des fonctions doit etre significatif (exemple: function sum(),  function compareDistance())
// le nom d'une fonction est commence par un verbe d'action (mauvais exemple: function distance())
// le nom d'une variable doit etre significatif (mauvais exemple: const myVar, exemple: const distanceBetweenAandB, const firstName)
// PAS DE CODE HORS DES FONCTIONS !!!!!!!!!!!!!
// chiffre => Number
// lettre => String
// booléen => Boolean (false ou true)
// objet => Object {} => const object = { firstName: 'Elodie', lastName: 'Cara' } 
// object.firstName ==> Elodie
// tableau => Array [] ([String], [Boolean], ...)
// un tableau est une liste d'éléments => const array = ['Elodie', 'Cara'];
// array[0] ==> Elodie / array[1] ==> Cara / array[2] ==> undefined / array.length = 2
// si le nom de ma variable se termine par un s ==> c'est un tableau

function getProducts() {
    return fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .catch(error => {
            console.log(error);
        });
}

function formatProducts(productsToFormat) {
    // <a href="./product.html?id=42">
    //     <article>
    //         <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
    //         <h3 class="productName">Kanap name1</h3>
    //         <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
    //     </article>
    // </a>
    // Utiliser une boucle For (a voir sur internet)
    // document.querySelector('#items').innerHtml = ...
}

async function displayProducts() {
    const products = await getProducts();
    if(products && products.length) {
        formatProducts(products);
    }
}

displayProducts();
