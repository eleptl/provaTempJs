
const { json } = require('express/lib/response');
const fs = require('fs');
const { jsPDF } = require('jspdf');
const path = require('path');
require('jspdf-autotable');

// Legge il file JSON
fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Errore nella lettura del file:', err);
        return;
    }

    try {
        const desktopPath = path.join(require('os').homedir(), 'Desktop');
        const jsonData = JSON.parse(data);
        //const doc = new jsPDF();

        const doc = new jsPDF({
            orientation: "portrait", // "landscape" per orizzontale
            unit: "mm", // Unità di misura ("mm", "cm", "in", "px")
            format: [230, 500] // Larghezza e altezza personalizzate in mm
        });


        let y = 10; // Posizione iniziale verticale
        let x = 10; // Posizione iniziale orizzontale

        // costanti titoli
        const titolo1 = "Titolo1";
        const titolo2 = "Grafico1";

        // data
        const nomeProdotto = jsonData.nomeProdotto;
        const numeroProdotto = jsonData.numeroProdotto;
        const testoLatoFoto = jsonData.testoLatoFoto;
        const foto1 = jsonData.foto1;
        const dow = jsonData.dow;
        const logo = jsonData.logo;
        const graficoLatoTabella = jsonData.graficoLatoTabella;
        const graficoSottoTabella = jsonData.graficoSottoTabella;
        const immagine = jsonData.immagine;
        const testoSottoFoto = jsonData.testoSottoFoto;
        const testoSottoGrafico1 = jsonData.testoSottoGrafico1;
        const testoSottoGrafico2 = jsonData.testoSottoGrafico2;
        let elencop1 = [];
        let l1 = 0;
        let i = 1;
        let j = i+1;
        for(i ; i < j; i++){
            if(jsonData[`elencoPuntatoLatoFoto${i}` ]){
                elencop1[i] = jsonData[`elencoPuntatoLatoFoto${i}`];
                j =  j + 1;
            }
            else{
                l1 = i-1;           //lunghezza finche trova elencoPuntatoLatoFoto
                j -= 1;
            }
        }
        
        console.log('lunghezza elencoPuntatoLatoFoto:' + l1);

        //elenco puntato grafico
        let elencop2 = [];
        for(let i = 1; i < 4; i++){
            elencop2[i] = jsonData[`elencoPuntatoLatoGrafico${i}`];
        }
        let elencop3 = [];
        for(let i = 4; i < 7; i++){
            elencop3[i] = jsonData[`elencoPuntatoSottoGrafico${i}`];
        }
        let elencop4 = [];
        for(let i = 7; i < 11; i++){
            elencop4[i] = jsonData[`elencoPuntatoSottoGrafico${i}`];
        }
        const titoloSottoGrafico1 = jsonData.titoloSottoGrafico1;
        const titoloSottoGrafico2 = jsonData.titoloSottoGrafico2;
     
        //(titolo)
        doc.setFontSize(25);
        doc.setFont("helvetica", "bold");
        doc.text(nomeProdotto, x, y);

        //numero articolo (prodotto)
        doc.setFontSize(15)
        doc.setFont("helvetica", "normal");
        y += 6;
        doc.text(numeroProdotto, x, y);

        //logo
        if (logo && fs.existsSync(logo)) {
            const imageData = fs.readFileSync(logo).toString('base64');
            doc.addImage(imageData, 'JPEG', 150, 5, 35, 10);
        }        
        y += 10; // Spazio sotto il titolo

        // FOTO
        let hPhoto = 65;
        let wPhoto = 65;
        if (foto1 && fs.existsSync(immagine)) {
            const imageData = fs.readFileSync(immagine).toString('base64');
            doc.addImage(imageData, 'JPEG', 10, y, wPhoto, hPhoto);
        }
        //
        let xleftPhoto = x + 75;
        let yleftPhoto = y + 5;

        // Testo lato foto 
        doc.setFontSize(12);
        doc.text(testoLatoFoto, xleftPhoto, yleftPhoto, { maxWidth: 120 });
        ///y += 40;

        y = y  + doc.getTextDimensions(testoLatoFoto).h * 10;
        // Elenco puntato lato alla foto
        for (let i = 1; i <= 4; i++) {
            if (elencop1[i]) {
                doc.setFontSize(10);
                doc.text(`•` + elencop1[i], xleftPhoto, y);
                y += 5;
                hPhoto += 5; 
            }
        }
        y = hPhoto + 17;        //altezza foto + 17

        // titolo
        
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(titolo1, x, y );

        
        //y += 7;
        console.log(doc.getTextDimensions(titolo1).h);
        y = y +  doc.getTextDimensions(titolo1).h;

        // Testo sotto foto 
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(testoSottoFoto, x, y, { maxWidth: 195 });
        y += 15;
        console.log(doc.getTextDimensions(testoSottoFoto).w);
        y = y +  doc.getTextDimensions(testoSottoFoto).h ;

        //titolo sopra tabella
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(titolo1, x, y);

        //y += 2,5;
        y = y +  doc.getTextDimensions(titolo1).h;
        // Tabella 
        const tableData = [
            ['Sezione', 'Valore', 'va1', 'val2', 'val3'],
            ['Testo ', jsonData.testoSottoGrafico2,  jsonData.elencoPuntatoLatoGrafico3,  jsonData.elencoPuntatoLatoGrafico2, jsonData.elencoPuntatoLatoGrafico1],
            ['Testo ', jsonData.testoSottoGrafico2, jsonData.elencoPuntatoLatoGrafico3,  jsonData.elencoPuntatoLatoGrafico2, jsonData.elencoPuntatoLatoGrafico1],
            ['Testo ', jsonData.testoSottoGrafico2, jsonData.elencoPuntatoLatoGrafico3,  jsonData.elencoPuntatoLatoGrafico2, jsonData.elencoPuntatoLatoGrafico1],
            ['Testo ', jsonData.testoSottoGrafico2,  jsonData.elencoPuntatoLatoGrafico3,  jsonData.elencoPuntatoLatoGrafico2, jsonData.elencoPuntatoLatoGrafico1],
            ['Testo ', jsonData.testoSottoGrafico2, jsonData.elencoPuntatoLatoGrafico3,  jsonData.elencoPuntatoLatoGrafico2, jsonData.elencoPuntatoLatoGrafico1],
            ['Testo ', jsonData.testoSottoGrafico2, jsonData.elencoPuntatoLatoGrafico3,  jsonData.elencoPuntatoLatoGrafico2, jsonData.elencoPuntatoLatoGrafico1],
            ['Testo ', jsonData.testoSottoGrafico2, jsonData.elencoPuntatoLatoGrafico3,  jsonData.elencoPuntatoLatoGrafico2, jsonData.elencoPuntatoLatoGrafico1],
            ['Testo ', jsonData.testoSottoGrafico2,  jsonData.elencoPuntatoLatoGrafico3,  jsonData.elencoPuntatoLatoGrafico2, jsonData.elencoPuntatoLatoGrafico1],
            ['Testo ', jsonData.testoSottoGrafico2, jsonData.elencoPuntatoLatoGrafico3,  jsonData.elencoPuntatoLatoGrafico2, jsonData.elencoPuntatoLatoGrafico1],
            ['Testo ', jsonData.testoSottoGrafico2, jsonData.elencoPuntatoLatoGrafico3,  jsonData.elencoPuntatoLatoGrafico2, jsonData.elencoPuntatoLatoGrafico1],
            ['Testo ', jsonData.testoSottoGrafico2,  jsonData.elencoPuntatoLatoGrafico3,  jsonData.elencoPuntatoLatoGrafico2, jsonData.elencoPuntatoLatoGrafico1],
            ['Testo ', jsonData.testoSottoGrafico2, jsonData.elencoPuntatoLatoGrafico3,  jsonData.elencoPuntatoLatoGrafico2, jsonData.elencoPuntatoLatoGrafico1],
            ['Testo ', jsonData.testoSottoGrafico2, jsonData.elencoPuntatoLatoGrafico3,  jsonData.elencoPuntatoLatoGrafico2, jsonData.elencoPuntatoLatoGrafico1],
            ['Testo ', jsonData.testoSottoGrafico2, jsonData.elencoPuntatoLatoGrafico3,  jsonData.elencoPuntatoLatoGrafico2, jsonData.elencoPuntatoLatoGrafico1],
            ['Testo ', jsonData.testoSottoGrafico2,  jsonData.elencoPuntatoLatoGrafico3,  jsonData.elencoPuntatoLatoGrafico2, jsonData.elencoPuntatoLatoGrafico1],
            ['Testo ', jsonData.testoSottoGrafico2, jsonData.elencoPuntatoLatoGrafico3,  jsonData.elencoPuntatoLatoGrafico2, jsonData.elencoPuntatoLatoGrafico1],
            ['Testo ', jsonData.testoSottoGrafico2, jsonData.elencoPuntatoLatoGrafico3,  jsonData.elencoPuntatoLatoGrafico2, jsonData.elencoPuntatoLatoGrafico1],
            ['Testo ', jsonData.testoSottoGrafico2,  jsonData.elencoPuntatoLatoGrafico3,  jsonData.elencoPuntatoLatoGrafico2, jsonData.elencoPuntatoLatoGrafico1],
            ['Testo ', jsonData.testoSottoGrafico2, jsonData.elencoPuntatoLatoGrafico3,  jsonData.elencoPuntatoLatoGrafico2, jsonData.elencoPuntatoLatoGrafico1],
            ['Testo ', jsonData.testoSottoGrafico2, jsonData.elencoPuntatoLatoGrafico3,  jsonData.elencoPuntatoLatoGrafico2, jsonData.elencoPuntatoLatoGrafico1],
            ['Testo ', jsonData.testoSottoGrafico2, jsonData.elencoPuntatoLatoGrafico3,  jsonData.elencoPuntatoLatoGrafico2, jsonData.elencoPuntatoLatoGrafico1],
            ['Testo ', jsonData.testoSottoGrafico2,  jsonData.elencoPuntatoLatoGrafico3,  jsonData.elencoPuntatoLatoGrafico2, jsonData.elencoPuntatoLatoGrafico1],
            ['Testo ', jsonData.testoSottoGrafico2, jsonData.elencoPuntatoLatoGrafico3,  jsonData.elencoPuntatoLatoGrafico2, jsonData.elencoPuntatoLatoGrafico1],
            ['Testo ', jsonData.testoSottoGrafico2, jsonData.elencoPuntatoLatoGrafico3,  jsonData.elencoPuntatoLatoGrafico2, jsonData.elencoPuntatoLatoGrafico1]
        ]; 
        doc.autoTable({
            startY: y,
            margin: { left: 10 },
            head: [tableData[0]],
            tableWidth: 100,
            cellPadding: 1,
            body: tableData.slice(1),
            styles: { 
                fontSize: 10, 
                cellPadding: 3, 
                textColor: [0, 0, 0], // Testo nero per il corpo
                lineColor: [0, 0, 0], // Bordi neri evidenti
                lineWidth: 0.1, // Spessore del bordo
                cellPadding: 0.5
            },
            headStyles: { 
                fillColor: [220, 220, 220], // Sfondo azzurro per l'header
                textColor: [0, 170, 255], // Testo azzurro per l'header
                lineColor: [0, 0, 0], // Bordi neri per l'header
                lineWidth: 0.1, // Spessore del bordo dell'header
                cellPadding: 0.5
            },
            bodyStyles: { 
                fillColor: [255, 255, 255], // Sfondo bianco per tutto il corpo
                textColor: [0, 0, 0], // Testo nero per il corpo
                cellPadding: 0.5
            },
            alternateRowStyles: { fillColor: [255, 255, 255] }, // Forza tutte le righe a essere bianche
        });


        x += 135;
        //graficoLatoTabella
        let xGr = 25;
        let yGr = 45;
        if (graficoLatoTabella && fs.existsSync(graficoLatoTabella)) {
            const imageData = fs.readFileSync(graficoLatoTabella).toString('base64');
            doc.addImage(imageData, 'JPEG', x, y, xGr, yGr);
        }
        if (graficoLatoTabella && fs.existsSync(graficoLatoTabella)) {
            const imageData = fs.readFileSync(graficoLatoTabella).toString('base64');
            doc.addImage(imageData, 'JPEG', x, y + 77, xGr, yGr);
        }
        
        //guardo fino a dove è arrivata la tabella
        y = Math.ceil(doc.lastAutoTable.finalY)


        //agg. coordinate
        x = 10;
        y += 9;
        let diff = 105;

        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text(titoloSottoGrafico1, x, y, { maxWidth: 200 });
        diff = x + diff;
        doc.text(titoloSottoGrafico1, diff, y, { maxWidth: 200 });
        y = y + doc.getTextDimensions(titoloSottoGrafico1).h;

        // "grafico" 
        let wGr = 60;
        let hGr = 40;
        if (graficoSottoTabella && fs.existsSync(graficoSottoTabella)) {
            const imageData = fs.readFileSync(graficoSottoTabella).toString('base64');
            doc.addImage(imageData, 'JPEG', x, y, hGr, wGr);
        }
       
        doc.setFont("helvetica", "normal");
        doc.setFontSize(16);
        //elenco puntato lato grafico
        y += 5;
        for(let j = 0; j<4; j++){
            
            if (jsonData[`elencoPuntatoLatoGrafico${j}`]) {
                doc.text(`• ` + elencop2[j], diff , y);
                y += 9;
            }
        }

        y = hGr + y ;
        //titolo sotto grafico
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text(titoloSottoGrafico2, x, y, { maxWidth: 200 });
        
        
        y = y + 5 + doc.getTextDimensions(titoloSottoGrafico2).h;
        doc.setFont("helvetica", "normal");
        //testo vicino "grafico (foto2)"           
        doc.text(testoSottoGrafico1, x, y, { maxWidth: 200 });
        //elencoPuntatoSottoGrafico
        y = y + 15 + doc.getTextDimensions(testoSottoGrafico1).h;
        //y = y + doc.getTextDimensions(testoSottoGrafico1).h;

        for(let j = 4; j<7; j++){
            if (elencop3[j]) {
                doc.text(`• ` + elencop3[j], x, y);
                y += 7;
            }
        }
        y += 5;

        //testo sotto grafico 2
        doc.text(testoSottoGrafico2, x, y, { maxWidth: 200 });
        y = y + 5 + doc.getTextDimensions(testoSottoGrafico1).h;
        //y += 10;

        for(let j = 7; j<11; j++){
            if (elencop4[j]) {
                doc.text(`• ` + elencop4[j], x, y);
                y += 7;
            }
        }

        y += 5;

        //testo sotto grafico 2
        doc.text(testoSottoGrafico1, x, y, { maxWidth: 200 });

        // Salva il PDF sul Desktop 
        // [funziona] const pdfPath = path.join(desktopPath, 'provaDowloadPDF.pdf');
        // doc.save(pdfPath);

        //FOOTER
        const footerHeight = 15; // Altezza del piè di pagina
        const footerY = doc.internal.pageSize.height - footerHeight; // Posizione verticale

        doc.setFillColor(50, 50, 50); // Imposta il colore di sfondo (grigio scuro)
        doc.rect(0, footerY, doc.internal.pageSize.width, footerHeight, 'F'); // Disegna il rettangolo

        // Aggiungi il testo del piè di pagina
        doc.setTextColor(255, 255, 255); // Colore bianco per il testo
        doc.setFontSize(10);
        doc.text("Piè di", 10, footerY + 10);

        doc.save('provaPdf.pdf');
        console.log(`✅ PDF salvato `);
        //console.log(`✅ PDF salvato su: ${pdfPath}`);

    } catch (error) {
        console.error("Errore nel parsing del JSON:", error);
    }
});
