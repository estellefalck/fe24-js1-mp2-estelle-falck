// Basen för rad 1:s höjd och marginal
const baseHeight = 20; // Basvärde för rad 1:s höjd
const baseMargin = 10; // Basvärde för marginalen mellan rad 1 och 2

// Array med för raderna, där varje rad får en höjd och marginal baserad på basvädet flera gånger
const rows = [
    { text: 'Rad 1', color: '#e0ffe0', fontSize: '1em', height: `${baseHeight}px`, textColor: '#b5a1e2', margin: `${baseMargin}px` },
    { text: 'Rad 2', color: '#ccffcc', fontSize: '1.5em', height: `${baseHeight * 2}px`, textColor: '#b5a1e2', margin: `${baseMargin * 2}px` },
    { text: 'Rad 3', color: '#b3ffb3', fontSize: '2em', height: `${baseHeight * 3}px`, textColor: '#b5a1e2', margin: `${baseMargin * 3}px` },
    { text: 'Rad 4', color: '#99ffcc', fontSize: '2.5em', height: `${baseHeight * 4}px`, textColor: '#b5a1e2', margin: `${baseMargin * 4}px` },
    { text: 'Rad 5', color: '#99ccff', fontSize: '3em', height: `${baseHeight * 5}px`, textColor: '#b5a1e2', margin: `${baseMargin * 5}px` }
];

// Funktion för att skapa horisontella rader med styling
function createRow(text, color, fontSize, height, textColor, margin) {
    const row = document.createElement('div');
    row.textContent = text;
    row.style.backgroundColor = color;       // Bakgrundsfärg för raden
    row.style.color = textColor;             // Textfärg för raden
    row.style.fontSize = fontSize;           // Fontstorlek
    row.style.textAlign = 'center';          // Centrerar texten horisontellt
    row.style.height = height;               // Höjden baserat på basvädet *
    row.style.lineHeight = height;           // Centrerar texten vertikalt i raden
    row.style.margin = `${margin} auto`;     // Marginal mellan raderna och centrerar
    row.style.fontWeight = 'bold';
    row.style.maxWidth = '95vw';             // Bredd för att nästan fylla sidan
    row.style.boxSizing = 'border-box';      // Inkluderar padding i bredden
    document.body.appendChild(row);
}

// Skapar raderna från arrayen
rows.forEach(row => createRow(row.text, row.color, row.fontSize, row.height, row.textColor, row.margin));

// Data för kolumnerna
const columnData = [
    Array.from({ length: 10 }, (_, i) => i.toString()),              // 0 - 9
    Array.from({ length: 10 }, (_, i) => (9 - i).toString()),        // 9 - 0
    ['ett', 'två', 'tre', 'fyra', 'fem', 'sex', 'sju', 'åtta', 'nio', 'tio'] // ett - tio
];

// Funktion för att skapa kolumner med olika textposition och färg
function createColumn(data, specialIndex, textAlign, invertColors = false) {
    const column = document.createElement('div');
    column.style.display = 'inline-block';
    column.style.padding = '10px';
    column.style.backgroundColor = '#b5a1e2'; // Lila för ramen
    column.style.margin = '0 20px';          // Mellanrum mellan kolumnerna
    column.style.width = '70px';             // Bredd kolumner
    column.style.textAlign = textAlign;      // Justering för textens position (vänster, center, höger)
    column.style.fontWeight = 'bold';

    // Loop för att skapa platser i varje kolumn
    data.forEach((item, index) => {
        const cell = document.createElement('div');
        cell.textContent = item;

        // Använd ramfärg för specifik plats
        if (index === specialIndex) {
            cell.style.backgroundColor = '#b5a1e2'; // Samma färg som kolumnens ram
            cell.style.color = 'white';
        } else {
            // Invertera färger för varannan rad om 'invertColors' är satt till true
            if (invertColors) {
                cell.style.backgroundColor = index % 2 === 0 ? 'white' : 'black'; //kollar jämt eller ojämt tal och väljer färg efter det
                cell.style.color = index % 2 === 0 ? 'black' : 'white';
            } else {
                cell.style.backgroundColor = index % 2 === 0 ? 'black' : 'white';
                cell.style.color = index % 2 === 0 ? 'white' : 'black';
            }
        }

        cell.style.padding = '5px';
        column.appendChild(cell);
    });

    return column;
}

const columnsContainer = document.createElement('div');
columnsContainer.style.display = 'flex';
columnsContainer.style.justifyContent = 'space-evenly';
columnsContainer.style.alignItems = 'center';
columnsContainer.style.paddingTop = '120px'; // Avstånd ovanför kolumnerna
columnsContainer.style.paddingBottom = '120px'; // Avstånd under kolumnerna
columnsContainer.style.border = '2px solid black'; // Svart ram runt kolumnområdet
columnsContainer.style.maxWidth = '95vw'; // Matchar bredden på raderna
columnsContainer.style.boxSizing = 'border-box';
columnsContainer.style.margin = '0 auto'; // Centrerar kolumncontainern
columnsContainer.style.backgroundColor = '#f9f9f9';

// Lägg till kolumner till containern med specifika justeringar
columnsContainer.appendChild(createColumn(columnData[0], 4, 'left'));          // Text längst åt vänster för kolumn 1
columnsContainer.appendChild(createColumn(columnData[1], 1, 'center', true));  // Centrerad text för kolumn 2, och färg svart/vit inventerad
columnsContainer.appendChild(createColumn(columnData[2], 5, 'right'));         // Text längst åt höger för kolumn 3

// Lägg till kolumncontainern till body
document.body.appendChild(columnsContainer);
