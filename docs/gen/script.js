//For pattern generation
let uniqueBirthdayNumbers = 0;
let mainColorNum = 0;
let bgColorNum = 0;

//For patern color change
const mainColorSelect = document.getElementById("mainColorSelect");
const bgColorSelect = document.getElementById("bgColorSelect");
const mainColorPreview = document.getElementById("mainColorPreview");
const bgColorPreview = document.getElementById("bgColorPreview");
const canvasSection = document.getElementById("canvasSection");
const catalogSection = document.getElementById("catalogSection");
const catalogGrid = document.getElementById("catalogGrid");

//Catalog product images
const catalogImages = [
    '2203049a2abe25d3a6cb1f8e82afd71a_l.webp',
    '2f31a48fbb2a8ef95a445b3b87b8b1e3_l.webp',
    '31a65a4574901cf0eff5b991a2fea144_l.webp',
    'b1efa8095dab40b9a00f14de0f0aef0a_l.webp',
    'c3af233c620fea8ee9922d5fe0645fff_l.webp',
    'fae12844c0cb47725ad0530fe9e8d3d8_l.webp'
];


//TODO letter to integer dictionary for all possible letters
const letterToNumber = {
    //Latvian letters 
    'A': 1, 'Ā': 2, 'B': 3, 'C': 4, 'Č': 5, 'D': 6, 'E': 7, 'Ē': 8, 'F': 9,
    'G': 1, 'Ģ': 2, 'H': 3, 'I': 4, 'Ī': 5, 'J': 6, 'K': 7, 'Ķ': 8, 'L': 9,
    'Ļ': 1, 'M': 2, 'N': 3, 'Ņ': 4, 'O': 5, 'P': 6, 'R': 7, 'S': 8, 'Š': 9,
    'T': 1, 'U': 2, 'Ū': 3, 'V': 4, 'Z': 5, 'Ž': 6,
    
    //Additional English letters
    'W': 1, 'X': 2, 'Y': 3, 'Q': 4,

    //Additional Latin letters
    'Á': 5, 'À': 6, 'Â': 7, 'Ã': 8, 'Ä': 9, 'Å': 1, 'Ą': 2,
    'Ć': 3, 'Ĉ': 4, 'Ď': 5, 'É': 6, 'È': 7, 'Ê': 8, 'Ë': 9, 'Ę': 1,
    'Ğ': 2, 'Į': 3, 'Ł': 4, 'Ń': 5, 'Ñ': 6,
    'Ó': 7, 'Ò': 8, 'Ô': 9, 'Õ': 1, 'Ö': 2, 'Ø': 3, 'Ő': 4,
    'Ś': 5, 'Ș': 6, 'Ş': 7, 'Ť': 8, 'Ú': 9, 'Ù': 1, 'Û': 2, 'Ü': 3, 'Ű': 4,
    'Ý': 5, 'Ÿ': 6, 'Ź': 7, 'Ż': 8,

    //Cyrillic letters
    'А': 1, 'Б': 2, 'В': 3, 'Г': 4, 'Д': 5, 'Е': 6, 'Ё': 7, 'Ж': 8, 'З': 9,
    'И': 1, 'Й': 2, 'К': 3, 'Л': 4, 'М': 5, 'Н': 6, 'О': 7, 'П': 8, 'Р': 9,
    'С': 1, 'Т': 2, 'У': 3, 'Ф': 4, 'Х': 5, 'Ц': 6, 'Ч': 7, 'Ш': 8, 'Щ': 9,
    'Ъ': 1, 'Ы': 2, 'Ь': 3, 'Э': 4, 'Ю': 5, 'Я': 6
};


const numberToColor = {
    0: {name: 'Balts', hex: '#FFFFFF'},
    1: { name: 'Sarkans', hex: '#CC0000' },
    2: { name: 'Oranžs', hex: '#FFA500' },
    3: { name: 'Dzeltens', hex: '#FFFF00' },
    4: { name: 'Gaiši zaļš', hex: '#008000' },
    5: { name: 'Gaiši zils', hex: '#87CEEB' },
    6: { name: 'Tumši zils', hex: '#4B0082' },
    7: { name: 'Violets', hex: '#800080' },
    8: { name: 'Rozā', hex: '#FFC0CB' },
    9: { name: 'Zelts', hex: '#D4AF37' },
    10: { name: 'Sudrabs', hex: '#C0C0C0' },
    11: { name: 'Karmīnsarkans', hex: '#960018' },
    12: { name: 'Tumši zaļš', hex: '#003C00' },
    13: { name: 'Melns', hex: '#000000' }
};


// Adding the deafult colors from numberToColor to the color select options in a certain order
const colorOrder = [0, 1, 11, 2, 3, 4, 12, 5, 6, 7, 8, 9, 10, 13];

for (const number of colorOrder) {
    const color = numberToColor[number];

    const mainColorOption = document.createElement('option');
    mainColorOption.value = number;
    mainColorOption.textContent = color.name;
    mainColorSelect.appendChild(mainColorOption);

    const bgColorOption = document.createElement('option');
    bgColorOption.value = number;
    bgColorOption.textContent = color.name;
    bgColorSelect.appendChild(bgColorOption);
};


//Selecting unique birthday date integers
function getUniqueNumbers(birthday){
    birthday = birthday.replace(/\D/g, '');
    let uniqueNum = new Set()

    for (const digit of birthday){
        uniqueNum.add(parseInt(digit));
    }
    
    return uniqueNum;
}

//Transforming the multiple-digit integer to a single-digit integer
function sumToNumber(numberSum){
    while (numberSum >= 10){
        let tmp = 0;

        for (const num of numberSum.toString()){
            tmp += parseInt(num);
        }
        numberSum = tmp;
    }
    return numberSum;
}

//Calculating the main color number from the birthday date
function getMainColor(birthday){
    birthday = birthday.replace(/\D/g, '');
    let numberSum = 0;

    for (const digit of birthday) {
        numberSum += parseInt(digit);
    }

    return sumToNumber(numberSum);
}

//Calculating the background color number from the name
function getBgColor(name){
    name = name.replace(/[^\p{L}]/gu, '').toUpperCase();
    let letterSum = 0;

    for (const letter of name) {
        letterSum += letterToNumber[letter] || 0;
    }
    return sumToNumber(letterSum);
}

function drawGrid(){
    let myCanvas = document.querySelector("#myCanvas");
    const ctx = myCanvas.getContext("2d");  

    const cellCount = 20;
    const cellSize = myCanvas.width / cellCount;
   
    const mainColor = numberToColor[mainColorNum].hex;
    const bgColor = numberToColor[bgColorNum].hex;

    const basePattern = [1,2,3,4,5,6,7,8,9,0,0,9,8,7,6,5,4,3,2,1];

    //Coloring the grids
    for (let row = 0; row < cellCount; row++){
        for (let col = 0; col < cellCount; col++){

            //Calculating the number value of the specific grid
            let verticalNum = basePattern[col]
            let horizontalNum = basePattern[row]
            let num = (verticalNum * horizontalNum) %10;

            //Checking if the number is in the birthday date and choosing the appropriate color
            if (uniqueBirthdayNumbers.includes(num)){
                ctx.fillStyle = mainColor;
                ctx.fillRect(col*cellSize, row*cellSize, cellSize, cellSize);
            }
            else {
                ctx.fillStyle = bgColor;
                ctx.fillRect(col*cellSize, row*cellSize, cellSize, cellSize);
            }
        }
    } 
}

//Generating the pattern after user clicks 'Generate Pattern' button
function generate(){
    
    const birthday = document.getElementById("birthday").value;
    const name = document.getElementById("name").value;

    //TODO create an alert that is more suitable for the user
    //Checking whether both input fields are filled
    if (!birthday || !name){
        alert("Fill out both fields!");
        return;
    }

    bgColorNum = getBgColor(name);
    mainColorNum = getMainColor(birthday);
    uniqueBirthdayNumbers = [...getUniqueNumbers(birthday)];

    //Making sure that the background and main colors are different from each other
    if (mainColorNum == bgColorNum){
        bgColorNum = 0;
    }

    //Creating the colored pattern
    drawGrid();

    //Setting the current main color as defult in the main color dropdown
    for (const option of mainColorSelect.options) {
        if (Number(option.value) === mainColorNum) {
            option.selected = true;
        }
    }
    //Setting the current background color as defult in the background color dropdown
    for (const option of bgColorSelect.options) {
        if (Number(option.value) === bgColorNum) {
            option.selected = true;
        }
    }

    //Update color previews
    updateColorPreviews();

    //Show canvas section
    canvasSection.classList.remove('hidden');

    //Generate and show catalog items
    generateCatalogItems();
    catalogSection.classList.remove('hidden');
}

//Function to create a canvas with the pattern
function createPatternCanvas() {
    const patternCanvas = document.createElement('canvas');
    patternCanvas.width = 500;
    patternCanvas.height = 500;
    const ctx = patternCanvas.getContext('2d');

    const cellCount = 20;
    const cellSize = patternCanvas.width / cellCount;
    const mainColor = numberToColor[mainColorNum].hex;
    const bgColor = numberToColor[bgColorNum].hex;
    const basePattern = [1,2,3,4,5,6,7,8,9,0,0,9,8,7,6,5,4,3,2,1];

    for (let row = 0; row < cellCount; row++){
        for (let col = 0; col < cellCount; col++){
            let verticalNum = basePattern[col];
            let horizontalNum = basePattern[row];
            let num = (verticalNum * horizontalNum) % 10;

            if (uniqueBirthdayNumbers.includes(num)){
                ctx.fillStyle = mainColor;
                ctx.fillRect(col*cellSize, row*cellSize, cellSize, cellSize);
            } else {
                ctx.fillStyle = bgColor;
                ctx.fillRect(col*cellSize, row*cellSize, cellSize, cellSize);
            }
        }
    }

    return patternCanvas;
}

//Function to generate catalog items with pattern overlay
function generateCatalogItems() {
    catalogGrid.innerHTML = ''; // Clear existing items

    const patternCanvas = createPatternCanvas();
    const patternDataUrl = patternCanvas.toDataURL('image/png');

    catalogImages.forEach((imageName) => {
        const catalogItem = document.createElement('div');
        catalogItem.className = 'catalog-item';

        catalogItem.innerHTML = `
            <div class="catalog-item-wrapper">
                <div class="catalog-item-content">
                    <img src="../assets/catalog/${imageName}" alt="Product" class="product-image">
                    <img src="${patternDataUrl}" class="catalog-pattern-overlay" alt="Pattern overlay">
                </div>
            </div>
        `;

        catalogGrid.appendChild(catalogItem);
    });
}

//Function to update catalog items when colors change
function updateCatalogItems() {
    if (!catalogSection.classList.contains('hidden')) {
        generateCatalogItems();
    }
}

//Function to update color preview boxes
function updateColorPreviews() {
    mainColorPreview.style.backgroundColor = numberToColor[mainColorNum].hex;
    bgColorPreview.style.backgroundColor = numberToColor[bgColorNum].hex;
}

//When another color is selected, change the main color of the pattern
mainColorSelect.addEventListener('change', () => {
    mainColorNum = Number(mainColorSelect.value);
    drawGrid();
    updateColorPreviews();
    updateCatalogItems();
});

//When another color is selected, change the background color of the pattern
bgColorSelect.addEventListener('change', () => {
    bgColorNum = Number(bgColorSelect.value);
    drawGrid();
    updateColorPreviews();
    updateCatalogItems();
});