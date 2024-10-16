const matrix = document.querySelector('.matrix');

// Plage de caractères katakana
const symbols = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン0123456789';

// Définir le nombre de colonnes en fonction de la largeur de la fenêtre
const numColumns = Math.floor(window.innerWidth / 10); // Largeur de chaque colonne (10px)

// Crée plusieurs colonnes
for (let i = 0; i < numColumns; i++) {
    createColumn();
}

function createColumn() {
    const column = document.createElement('div');
    column.classList.add('column');
    matrix.appendChild(column);

    // Paramètres pour contrôler le flux des symboles
    let interval = 300; // Intervalle initial plus long pour éviter la surcharge initiale
    let symbolSpeed = 50; // Espacement entre les symboles (50px)
    let maxSymbols = Math.ceil(window.innerHeight / symbolSpeed); // Nombre maximal de symboles à afficher dans une colonne

    // Générer progressivement les symboles
    setInterval(() => {
        let currentSymbols = column.querySelectorAll('.symbol');

        // Si la colonne n'a pas encore atteint le nombre maximal, ajouter un symbole
        if (currentSymbols.length < maxSymbols) {
            addSymbol(column, symbolSpeed);
        } else {
            // Une fois que le nombre maximal est atteint, ajouter et supprimer des symboles de manière régulière
            addSymbol(column, symbolSpeed);
            if (currentSymbols.length >= maxSymbols) {
                currentSymbols[0].remove(); // Supprime le premier symbole (en haut) pour garder une longueur constante
            }
        }

    }, interval); // Crée un nouveau symbole toutes les 300 ms pour commencer, puis s'ajuste ensuite
}

// Fonction pour ajouter un symbole
function addSymbol(column, symbolSpeed) {
    const span = document.createElement('span');
    span.classList.add('symbol');
    span.textContent = symbols.charAt(Math.floor(Math.random() * symbols.length));

    // Ajoute le symbole au sommet de la colonne
    span.style.position = 'absolute';
    span.style.left = '0px'; // Aligne tous les symboles à gauche
    span.style.top = '0px'; // Place le nouveau symbole en haut de la colonne
    column.appendChild(span);

    // Appliquer une animation fluide et infinie pour la chute du symbole
    let duration = Math.random() * 2 + 4; // Durée d'animation aléatoire
    span.style.animation = `fall ${duration}s linear infinite`;

    // Ajuster la position de chaque symbole dans la colonne
    let allSymbols = column.querySelectorAll('.symbol');
    allSymbols.forEach((sym, idx) => {
        sym.style.top = `${idx * symbolSpeed}px`; // Espace constant entre chaque symbole
    });
}
