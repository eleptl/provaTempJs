
const { json, get, jsonp } = require('express/lib/response');
const fs = require('fs');
const { jsPDF } = require('jspdf');
const { PDFDocument } = require('pdf-lib');
// import axios from 'axios';
const axios = require('axios');

const path = require('path');
require('jspdf-autotable');
const pdfPoppler = require('pdf-poppler');

const ImageFactory = {
    compress: (imageData) => {
        // Simula la compressione 
        console.log('Compressione immagine in corso...');
        return imageData;
    }
};
var wtot = 290;

axios.get('http://localhost:3000/products').then( //INDIRIZZO DA CAMBIARE, DEVO TROVARE L'IP GIUSTO
    function (res) {
        console.log(res);
    }
)

fs.readFile('data1.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Errore nella lettura del file:', err);
        return;
    }

    try {
        const desktopPath = path.join(require('os').homedir(), 'Desktop');
        const jsonData = JSON.parse(data);

        //data
        let y = 10;
        let y1 = y;
        y += 10;
        let x = 10;

        // get json data
        let azienda = jsonData.azienda;                     // azienda => dipende il template
        const piedipagina = jsonData.pie_di_pagina;

        let doc1 = new jsPDF();

        const nomeProdotto = jsonData.nome;
        const numeroProdotto = jsonData.nomeProdotto;
        const testoLatoFoto = jsonData.descr;
        const fotoprodotto = jsonData.fotoprodotto;
        const dow = jsonData.dow;
        const logo = jsonData.logo;
        const graficoLatoTabella1 = jsonData.graficoLatoTabella1;
        const graficoLatoTabella2 = jsonData.graficoLatoTabella2;
        const graficoSottoTabella = jsonData.graficoSottoTabella;

        const headerTitles = {

            "air_cloud": jsonData.air_cloud,
            "alimentazione": jsonData.alimentazione,
            "alimentazione_prese": jsonData.alimentazione_prese,
            "altezza": jsonData.altezza,
            "assorbimento": jsonData.assorbimento,
            "attacco_aspirazione_scarico": jsonData.attacco_aspirazione_scarico,
            "capacita_bombola": jsonData.capacita_bombola,
            "capacita_contenitore_polveri": jsonData.capacita_contenitore_polveri,
            "capacita_sacchetto_polveri": jsonData.capacita_sacchetto_polveri,
            "classe_di_filtrazione": jsonData.classe_di_filtrazione,
            "peso": jsonData.peso,
            "portata_massima_aria": jsonData.portata_massima_aria,
            "potenza": jsonData.potenza,
            "computer_gestione_motore": jsonData.computer_gestione_motore,
            "computer_manutenzione": jsonData.computer_manutenzione,
            "convertitore_elettronico_di_velocita": jsonData.convertitore_elettronico_di_velocita,
            "depressione_max": jsonData.depressione_max,
            "frequenza": jsonData.frequenza,
            "grado_di_protezione": jsonData.grado_di_protezione,
            "griglia_di_protezione_filtro": jsonData.griglia_di_protezione_filtro,
            "ingresso_aria": jsonData.ingresso_aria,
            "ingresso_uscita_polveri": jsonData.ingresso_uscita_polveri,
            "larghezza": jsonData.larghezza,
            "materiale_cartuccia_filtro": jsonData.materiale_cartuccia_filtro,
            "misura_a": jsonData.misura_a,
            "misura_b": jsonData.misura_b,
            "misura_c": jsonData.misura_c,
            "misura_d": jsonData.misura_d,
            "misura_e": jsonData.misura_e,
            "misura_f": jsonData.misura_f,
            "misura_g": jsonData.misura_g,
            "misura_h": jsonData.misura_h,
            "misura_i": jsonData.misura_i,
            "misura_l": jsonData.misura_l,
            "misura_m": jsonData.misura_m,
            "misura_n": jsonData.misura_n,
            "misura_o": jsonData.misura_o,
            "misura_x_min": jsonData.misura_x_min,
            "numero_operatori_consigliati": jsonData.numero_operatori_consigliati,
            "operatori": jsonData.operatori,
            "potenza_motore": jsonData.potenza_motore,
            "presa_aspirante_a_bordo": jsonData.presa_aspirante_a_bordo,
            "pressione_aria": jsonData.pressione_aria,
            "pressione_attuatore_pneumatico": jsonData.pressione_attuatore_pneumatico,
            "pressione_ugelli": jsonData.pressione_ugelli,
            "pulizia_filtro_automatica": jsonData.pulizia_filtro_automatica,
            "punti_presa_aspiranti_consigliati": jsonData.punti_presa_aspiranti_consigliati,
            "rumorosita_motore": jsonData.rumorosita_motore,
            "scarico_aria": jsonData.scarico_aria,
            "scheda_di_gestione_dell_aspirazione": jsonData.scheda_di_gestione_dell_aspirazione,
            "sfiato_aria": jsonData.sfiato_aria,
            "sfiato_micropolveri": jsonData.sfiato_micropolveri,
            "silenziatore_scarico_aria": jsonData.silenziatore_scarico_aria,
            //"sku": jsonData.sku,
            "superficie_filtrante": jsonData.superficie_filtrante,
            "superficie_max_da_pulire": jsonData.superficie_max_da_pulire,
            "tendisacco": jsonData.tendisacco,
            "uscita_aria": jsonData.uscita_aria,
            "valvola_rompivuoto_di_sicurezza": jsonData.valvola_rompivuoto_di_sicurezza,
        };

        const headerTitles1 = {

            "air_cloud": jsonData.air_cloud,
            "alimentazione": jsonData.alimentazione,
            "alimentazione_prese": jsonData.alimentazione_prese,
            "altezza": jsonData.altezza,
            "assorbimento": jsonData.assorbimento,
            "attacco_aspirazione_scarico": jsonData.attacco_aspirazione_scarico,
            "capacita_bombola": jsonData.capacita_bombola
        };


        const testoSottoFoto = jsonData.princApp;
        const testoSottoGrafico1 = jsonData.testoSottoGrafico1;

        // costanti titoli
        const titolo1 = "Principali Applicazioni";
        const titolo2 = "Dati tecnici";
        let titoloSottoGrafico1;
        if (azienda == 1) {
            titoloSottoGrafico1 = "Grafico di prestazione";
        } else {
            if (azienda == 2) {
                titoloSottoGrafico1 = "Sequenza di monitoraggio";
            }
        }

        let titoloSottoGrafico3;
        const titoloSottoGrafico2 = "Omologazioni";
        if (azienda == '1') {
            titoloSottoGrafico3 = "Conformità e normative";
        } else {
            if (azienda == '2') {
                titoloSottoGrafico3 = "Consigli per la posa";
            }
        }
        let titoloSottoGrafico4;
        if (azienda == '1') {
            titoloSottoGrafico4 = "Conformità";
        } else {
            if (azienda == '2') {
                titoloSottoGrafico4 = "Prova di Carico";
            }
        }
        let titoloSottoGrafico5;
        if (azienda == '1') {
            titoloSottoGrafico5 = "Normative armonizzate applicate";
        }
        else {
            if (azienda == '2') {
                titoloSottoGrafico5 = "Certificazioni";
            }
        }

        let headers = [];
        let headers1 = ["Parametro", "Valore", "Unita"];
        if (azienda == '1') {
            headers = ["Parametro", "Valore", "Unita"];
        }
        else {
            headers = ["Parametro", "Unita", "Descrizione", "Valore", "Sku"];
        }
        let suffixies = [];
        suffixies = headers.map(header =>
            header.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()
        );
        let suffixies1 = [];
        suffixies1 = headers1.map(header1 =>
            header1.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()
        );


        // Aggiornato: Creazione dati tabella con dati in base agli headers
        const tableData = Object.entries(headerTitles)
            .filter(([_, value]) => value)
            .map(([key, value]) => {
                const row = [];

                suffixies.forEach(suffix => {
                    if (suffix == 'parametro')
                        suffix = '';
                    const colid = `${key}${suffix}`;

                    row.push(jsonData[colid] || "-");
                });
                const isEmptyRow = row.every(cell => cell === "-" || cell === null || cell === "");
                return isEmptyRow ? null : row; // Esclude la riga se tutti i campi sono vuoti
            })
            .filter(row => row !== null); // Rimuove le righe vuote

        //w tab
        let maxDataWidth = 0;
        let cellWidth = 0;
        let maxw = 0;
        let headerWidth = 0;
        let xGr = 25;

        // Funzione per calcolare larghezza massima delle colonne
        function getOptimalColumnWidths(headers, tableData) {
            return headers.map((header, colIndex) => {
                headerWidth = doc1.getTextWidth(header);           // larghezza massima dei dati nella colonna 
                maxDataWidth = tableData.reduce((max, row) => {
                    cellWidth = doc1.getTextWidth(row[colIndex] || "");  // Se cella vuota, usa stringa vuota
                    return Math.max(max, cellWidth);
                }, 0);
                console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAA', maxDataWidth, headerWidth, wtot);
                maxw = Math.max(headerWidth, maxDataWidth - 20);       //return Math.max(headerWidth-10, maxDataWidth-40);
                return maxw;
            });
        }
        // calcolo larghezza totale tabella (adattamento larghezza foglio)
        function getTotalTableWidth(headers, tableData) {
            const columnWidths = getOptimalColumnWidths(headers, tableData);
            const totalWidth = columnWidths.reduce((sum, width) => sum + width, 0);
            return totalWidth;
        }

        let maxwtot = getTotalTableWidth(headers, tableData);
        console.log('wtot: ', maxwtot, 'tot', wtot);
        if (maxwtot >= wtot) {
            wtot = maxwtot + 40 + xGr;
        }

        //h righe
        const fontCalc = 6;
        const lineSpacCalc = 0.5;
        function calculateTableHeight(tableData, fontSize, lineSpacing) {
            let totaltableHeight = 0;

            tableData.forEach(row => {
                let maxRowHeight = 0;

                row.forEach(cellText => {
                    const textLines = doc1.splitTextToSize(cellText, 50); // 50 = larghezza stimata
                    const cellHeight = textLines.length * (fontSize * lineSpacing);
                    console.log('altezza singola cella', cellHeight);
                    maxRowHeight = Math.max(maxRowHeight, cellHeight);
                });

                totaltableHeight += maxRowHeight;
            });

            return totaltableHeight;
        }

        const tableData1 = Object.entries(headerTitles1)
            .filter(([_, value]) => value)
            .map(([key, value]) => {
                const row = [];
                suffixies1.forEach(suffix1 => {

                    if (suffix1 == 'parametro')
                        suffix1 = '';
                    const colid = `${key}${suffix1}`;
                    row.push(jsonData[colid] || "-");
                });
                const isEmptyRow = row.every(cell => cell === "-" || cell === null || cell === "");
                return isEmptyRow ? null : row; // Esclude la riga se tutti i campi sono vuoti
            })
            .filter(row => row !== null); // Rimuove le righe vuote

        let elencop1 = [];
        let i = 1;
        let iend1 = 0;
        let j = i + 1;
        let n1 = 0;
        let istart1 = j;
        for (i; i < j; i++) {
            iend1 = j;
            if (jsonData[`riga${i}`]) {
                elencop1[i] = jsonData[`elencoPuntatoLatoFoto${i}`];
                j = j + 1;
            }
            else {
                j -= 1;
            }
        }
        n1 = iend1 - istart1;
        console.log('n1', n1);


        let elencop2 = [];
        let i2 = 1;
        let j2 = i2 + 1;
        let n2 = 0;
        let istart2 = j2;
        let iend2 = 0;

        for (i2; i2 < j2; i2++) {
            iend2 = j2;
            if (jsonData[`elencoPuntatoLatoGrafico${i2}`]) {
                elencop2[i2] = jsonData[`elencoPuntatoLatoGrafico${i2}`];
                j2 += 1;
            }
            else {
                j2 -= 1;
            }
        }
        n2 = iend2 - istart2;
        console.log('n2', n2);

        let elencop3 = [];
        let i3 = 4;
        let j3 = i3 + 1;
        let n3 = 0;
        let istart3 = j3;
        let iend3 = 0;
        for (i3; i3 < j3; i3++) {
            iend3 = j3;
            if (jsonData[`elencoPuntatoSottoGrafico${i3}`]) {
                elencop3[i3] = jsonData[`elencoPuntatoSottoGrafico${i3}`];
                j3 += 1;
            }
            else {
                j3 -= 1;
            }
        }
        n3 = iend3 - istart3;
        console.log('n3', n3);

        let elencop4 = [];
        let i4 = 8;
        let j4 = i4 + 1;
        let istart4 = j4;
        let iend4 = 0;
        let n4 = 0;
        for (i4; i4 < j4; i4++) {
            iend4 = j4;
            if (jsonData[`elencoPuntatoSottoGrafico${i4}`]) {
                elencop4[i4] = jsonData[`elencoPuntatoSottoGrafico${i4}`];
                j4 += 1;
            }
            else {
                j4 -= 1;
            }
        }
        n4 = iend4 - istart4;
        console.log('n4', n4);
        let carLenght = 0;
        let carosello = [];
        const maxPhoto = 9;
        for (let i = 0; i < maxPhoto; i++) {
            if (jsonData[`carosello${i}`]) {
                carosello[i] = jsonData[`carosello${i}`];
                //console.log(carosello[i]);
                carLenght = i;
            }
        }
        //spaces
        let spacetab1 = calculateTableHeight(tableData, fontCalc, lineSpacCalc);
        let yGr1 = (spacetab1 / 6.5) * 2 + 10;
        let spacetab2 = calculateTableHeight(tableData1, fontCalc, lineSpacCalc);
        let space1 = 6;
        let space2 = 10;
        let space3 = 3;
        let space4 = 35;
        let space5 = 5;
        let space5_1 = space5 * (n1 + 1);
        let space6 = 7;
        let hgr1 = 40;
        let hPhoto = 65;
        let wPhoto = 65;
        let spacef = 5 * (n1 + 1);
        let space7 = doc1.getTextDimensions(titolo1).h + 5;
        let space8 = space7 + doc1.getTextDimensions(testoSottoFoto).h + 25;
        let cimgy = y + space1 + space2 + space3 + space4 + space5 + space6 + space7 + space8;
        let cimgy1 = y + space1 + space2 + space3 + space4 + space5 + space6 + space7 + space8;
        let d1 = ((wtot - (y + space1 + space2 + space3 + space4 + space5 + space6 + space7 + space8)) / carLenght) / 4;
        let wtottemp = ((wtot - (space1 + space2 + space3 + space4 + space5 + space6 + space7 + space8)) / carLenght) / 4;
        let cimgw = (((wtot / carLenght) * 3) / 4);
        let cimgw1 = (((wtot / carLenght) * 3) / 4);
        let cimgh = (cimgw * 1.5) / 2;
        let cimgh1 = cimgw1;
        let hgr2 = cimgh + 10;
        let space9 = doc1.getTextDimensions(testoSottoFoto).h; // + 10;
        let space9_a = doc1.getTextDimensions(testoSottoFoto).h * 2;
        let space9_a1 = (doc1.getTextDimensions(testoSottoFoto).h + cimgh1) * 2;
        let spaceimg1 = 5;
        let space10 = doc1.getTextDimensions(titolo2).h;
        let space12 = 9;
        let space13 = doc1.getTextDimensions(titoloSottoGrafico1).h;
        let space14 = 5;
        let space15 = 9;
        let space15_1 = space15 * (n2 + 1);
        let space16 = 5 + doc1.getTextDimensions(titoloSottoGrafico3).h;
        let space17 = 15 + doc1.getTextDimensions(testoSottoGrafico1).h;
        let space18 = 5 + doc1.getTextDimensions(testoSottoGrafico1).h;
        let space19 = 7;
        let space19_1 = space19 * (n3 + 1);
        let space20 = 5;
        let space21 = 5 + doc1.getTextDimensions(testoSottoGrafico1).h;
        let space22 = 7;
        let space22_1 = space22 * (n4 + 1);
        let space23 = 3;
        let space24 = doc1.getTextDimensions(testoSottoGrafico1).h + 10;
        const footerHeight = 50; // Altezza del piè di pagina


        if (spacetab1 < yGr1) {
            spacetab1 = yGr1 + 35;
        }

        if (azienda == '1') {
            y1 = y1 + hgr1 + space1 + space2 + space3 + space4 + space5_1 + spacef + space6
                + space7 + space8 + space9 + spacetab1 + space10 + space12 + space13 + space14 + space15_1
                + space16 + space17 + space18 + space19_1 + space20 + space21 + space22_1;

        } else {
            if (azienda == '2') {
                y1 = y1 + space1 + space2 + space3 + space4 + space5_1 + spacef + space6 + space9_a1
                    + space7 + space8 + space10 + spacetab1 + space12 + space13 + hgr2 + space16
                    + space17 + space18 + spacetab2 + space21 + space21 + space21 + space22_1
                    + (space9 + 10);

            }
        }

        let footerY = y1; // Posizione verticale
        console.log('y1', y1, footerY);
        const htot = y1; // + footerHeight;

        let doc = new jsPDF({
            orientation: "portrait",        // "landscape" per orizzontale
            unit: "mm",                     // Unità di misura ("mm", "cm", "in", "px")
            //format: [wtot, htot-10]       // Larghezza e altezza personalizzate in mm
            format: [wtot, y1]
        });

        // nome prodotto
        doc.setFontSize(25);
        doc.setFont("helvetica", "bold");
        doc.text(nomeProdotto, x, y);

        // numero articolo (prodotto)
        doc.setFontSize(15)
        doc.setFont("helvetica", "normal");
        y += space1;
        doc.text(numeroProdotto, x, y);

        let xLogo = wtot - 45;
        let yLogo = 5;
        let wLogo = 35;
        let hLogo = 10;
        //logo
        if (logo && fs.existsSync(logo)) {
            const imageData = fs.readFileSync(logo).toString('base64');
            doc.addImage(imageData, 'JPEG', xLogo, yLogo, wLogo, hLogo);
        }
        y += space2;

        // foto prodotto
        if (fotoprodotto && fs.existsSync(fotoprodotto)) {
            const imageData = fs.readFileSync(fotoprodotto).toString('base64');
            doc.addImage(imageData, 'JPEG', 10, y, wPhoto, hPhoto);
        }
        let xleftPhoto = x + 75;
        let yleftPhoto = y + space3;

        // Testo lato foto 
        doc.setFontSize(8);
        doc.text(testoLatoFoto, xleftPhoto, yleftPhoto, { maxWidth: wtot - 100 });
        console.log(doc.getTextDimensions(testoLatoFoto).h);
        y = y + space4;
        // Elenco puntato lato alla foto
        for (let i = 1; i <= 6; i++) {
            if (elencop1[i]) {
                doc.setFontSize(8);
                doc.text(`•` + elencop1[i], xleftPhoto, y);
                y += space5;
                hPhoto += spacef;
            }
        }
        y += space6;

        // titolo        
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(titolo1, x, y);

        y = y + space7;

        // Testo sotto foto 
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(testoSottoFoto, x, y, { maxWidth: wtot - 20 });
        y = y + space8;


        let cimgx = x;
        let cimgx1 = x;
        if (azienda == '1') {
            console.log('d', d1);
            //  foto carosello            
            console.log('n', carLenght, i);
            for (let ic = 0; ic <= carLenght; ic++) {
                if (carosello[ic] && fs.existsSync(carosello[ic])) {
                    var imgCar = fs.readFileSync(carosello[ic]).toString('base64');
                    doc.addImage(imgCar, 'JPEG', cimgx, cimgy, cimgw, cimgh);
                    // aumento x dopo ogni img
                    cimgx += cimgw + d1;
                }
            }
            y = y + space9;
        } else {
            if (azienda == '2') {
                for (let ic1 = 0; ic1 <= carLenght; ic1++) {
                    if (cimgx1 >= (wtot - 20) / 2) {
                        cimgx1 = cimgx;
                        cimgy1 = cimgy1 + cimgh1 + spaceimg1;
                    }
                    if (carosello[ic1] && fs.existsSync(carosello[ic1])) {
                        var imgCar = fs.readFileSync(carosello[ic1]).toString('base64');
                        doc.addImage(imgCar, 'JPEG', cimgx1, cimgy1, cimgw1, cimgh1);
                        // aumento x dopo ogni img
                        cimgx1 += cimgw1 + d1;
                    }
                }
                y = y + cimgh1 + space9_a;
            }
        }
        y += 15;
        //titolo sopra tabella
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(titolo2, x, y);
        y = y + space10;

        const marginLeft = 10;

        const columnWidths = getOptimalColumnWidths(headers, tableData, doc);
        const tableWidth = columnWidths.reduce((totalWidth, width) => totalWidth + width, 0);

        console.log('y prima di tabDat: ', y);

        doc.autoTable({
            startY: y,                                          // Posizione della tabella
            margin: { left: marginLeft, right: maxw },
            tableWidth: tableWidth,
            head: [headers],
            body: tableData,
            styles: {
                fontSize: 8,
                cellPadding: 0.2,                                 // Margine interno delle celle
                overflow: 'linebreak',                          // Gestisce l'overflow con interruzioni di riga
                halign: 'left',                                 // Allineamento orizzontale
                valign: 'middle',                               // Allineamento verticale
            },
            headStyles: {
                fillColor: [200, 200, 200],                    // Colore di riempimento per l'intestazione
                textColor: [0, 0, 0],                          // Colore del testo per l'intestazione
            },
            bodyStyles: {
                fillColor: [255, 255, 255],                    // Colore di riempimento per il corpo (bianco)
                textColor: [0, 0, 0],                          // Colore del testo per il corpo
                lineWidth: 0.001,                                // Larghezza dei bordi
                lineColor: [0, 0, 0],                          // Colore dei bordi (nero)
            },
            columnStyles: headers.reduce((styles, header, index) => {
                styles[index] = {
                    cellWidth: columnWidths[index],
                    fontStyle: index === 0 ? 'bold' : 'normal'  // Grassetto per la prima colonna
                };
                return styles;
            }, {}),
            tableLineColor: [0, 0, 0],                          // Colore dei bordi (nero)
            tableLineWidth: 0.1,                                // Larghezza del bordo
        });
        const xT = marginLeft + tableWidth + 2.5;

        x += xT;
        console.log('y dopo di tabDat: ', doc.lastAutoTable.finalY);
        //graficoLatoTabella
        let space = (Math.ceil(doc.lastAutoTable.finalY) / 6);
        //let xGr     =  25;
        let yGr = (Math.ceil(doc.lastAutoTable.finalY) / 6.5);

        if (graficoLatoTabella1 && fs.existsSync(graficoLatoTabella1)) {
            const imageData = fs.readFileSync(graficoLatoTabella1).toString('base64');
            doc.addImage(imageData, 'JPEG', x, y, xGr, yGr);
        }

        if (graficoLatoTabella2 && fs.existsSync(graficoLatoTabella2)) {
            const imageData = fs.readFileSync(graficoLatoTabella2).toString('base64');
            doc.addImage(imageData, 'JPEG', x, y + space, xGr, yGr);
        }

        //guardo fino a dove è arrivata la tabella
        let space11 = Math.ceil(doc.lastAutoTable.finalY) + 10;
        let space11a = (yGr * 2) + 10;
        console.log(space11, space11a);
        if (space11 < space11a)
            space11 = space11a + 35;

        console.log(y)

        console.log(space11, space11a);
        y = space11 + space12;
        console.log(y)

        //agg. coordinate
        x = 10;
        let diff = 105;

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(titoloSottoGrafico1, x, y, { maxWidth: wtot - 20 });
        diff = x + diff;
        if (azienda == '1')
            doc.text(titoloSottoGrafico2, diff, y, { maxWidth: wtot - 20 });
        y = y + space13;

        // "grafico"                 
        doc.setFontSize(10);
        let hGr = 60;
        let wGr = 60;
        if (azienda == '1') {
            hGr = 40;
            if (graficoSottoTabella && fs.existsSync(graficoSottoTabella)) {
                const imageData = fs.readFileSync(graficoSottoTabella).toString('base64');
                doc.addImage(imageData, 'JPEG', x, y, hGr, wGr);
            }


            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            //elenco puntato lato grafico
            y += space14;
            for (let j = 0; j < 4; j++) {

                if (jsonData[`elencoPuntatoLatoGrafico${j}`]) {
                    doc.text(`• ` + elencop2[j], diff, y);
                    y += space15;
                }
            }
        }


        if (azienda == '2') {
            hGr = cimgh + 10;
            console.log('d', d1);
            cimgx = x;
            cimgy = y;
            //  foto carosello            
            console.log('n', carLenght, i);
            for (let ic = 0; ic <= carLenght; ic++) {
                if (carosello[ic] && fs.existsSync(carosello[ic])) {
                    var imgCar = fs.readFileSync(carosello[ic]).toString('base64');
                    doc.addImage(imgCar, 'JPEG', cimgx, cimgy, cimgw, cimgh);
                    // aumento x dopo ogni img
                    cimgx += cimgw + d1;
                }
            }
        }

        y += hGr;
        //titolo sotto grafico
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text(titoloSottoGrafico3, x, y, { maxWidth: wtot - 20 });

        doc.setFontSize(9);
        y += space16;
        doc.setFont("helvetica", "normal");
        doc.text(testoSottoGrafico1, x, y, { maxWidth: wtot - 20 });

        if (azienda == '2') {
            let y2 = y + 10;
            y = y2 + space9;
            for (let j = 0; j < 7; j++) {

                if (jsonData[`elencoPuntatoLatoGrafico${j}`]) {
                    doc.text(`• ` + elencop2[j], x, y2);
                    y2 += 4;
                }
            }
        }

        y = y + space17;

        //titolo sotto grafico 2
        doc.setFont("helvetica", "bold");
        doc.text(titoloSottoGrafico4, x, y, { maxWidth: wtot - 20 });
        y += space18;
        doc.setFont("helvetica", "normal");

        //elencoPuntatoSottoGrafico    
        if (azienda == '1') {
            for (let j = 4; j < 7; j++) {
                if (elencop3[j]) {
                    doc.text(`• ` + elencop3[j], x, y);
                    y += space19;
                }
            }

            y += space20;

        } else {
            if (azienda == '2') {
                console.log('y prima di tabDat1: ', y);
                const columnWidths1 = getOptimalColumnWidths(headers1, tableData1, doc);
                const tableWidth1 = columnWidths1.reduce((totalWidth1, width1) => totalWidth1 + width1, 0);

                doc.autoTable({
                    startY: y,                                          // Posizione della tabella
                    margin: { left: marginLeft, right: maxw },
                    tableWidth: tableWidth1,
                    head: [headers1],
                    body: tableData1,
                    styles: {
                        fontSize: 8,
                        cellPadding: 0.1,                                 // Margine interno delle celle
                        overflow: 'linebreak',                          // Gestisce l'overflow con interruzioni di riga
                        halign: 'left',                                 // Allineamento orizzontale
                        valign: 'middle',                               // Allineamento verticale
                    },
                    headStyles: {
                        fillColor: [200, 200, 200],                    // Colore di riempimento per l'intestazione
                        textColor: [0, 0, 0],                          // Colore del testo per l'intestazione
                    },
                    bodyStyles: {
                        fillColor: [255, 255, 255],                    // Colore di riempimento per il corpo (bianco)
                        textColor: [0, 0, 0],                          // Colore del testo per il corpo
                        lineWidth: 0.01,                                // Larghezza dei bordi
                        lineColor: [0, 0, 0],                          // Colore dei bordi (nero)
                    },
                    columnStyles: headers1.reduce((styles, header1, index) => {
                        styles[index] = {
                            cellWidth: columnWidths1[index],
                            fontStyle: index === 0 ? 'bold' : 'normal'  // Grassetto per la prima colonna
                        };
                        return styles;
                    }, {}),
                    tableLineColor: [0, 0, 0],                          // Colore dei bordi (nero)
                    tableLineWidth: 0.1,                                // Larghezza del bordo
                });
                y = Math.ceil(doc.lastAutoTable.finalY) + 10;

            }
        }
        console.log('y dopo di tabDat1: ', y);

        doc.setFont("helvetica", "normal");
        if (azienda == '2') {

            doc.text(testoSottoGrafico1, x, y, { maxWidth: wtot - 20 });
            y = y + space21;
        }
        //titolo sotto grafico 2                
        doc.setFont("helvetica", "bold");
        doc.text(titoloSottoGrafico5, x, y, { maxWidth: wtot - 20 });
        y = y + space21;
        doc.setFont("helvetica", "normal");

        if (azienda == '2') {
            doc.text(testoSottoGrafico1, x, y, { maxWidth: wtot - 20 });
            y = y + space21;
        }

        y += space23;

        for (let j = 8; j < 12; j++) { //n4 8 12
            if (elencop4[j]) {
                doc.text(`• ` + elencop4[j], x, y);
                y += space22;
            }
        }
        //testo sotto grafico 2
        doc.setFontSize(7);
        doc.text(testoSottoGrafico1, x, y, { maxWidth: wtot - 20 });

        console.log('y finale: ', y);
        console.log('y1 totale: ', y1);

        doc.setTextColor(255, 255, 255); // Colore bianco per il testo
        doc.setFontSize(10);

        /**
         * stampa pie di pagina
        if (piedipagina && fs.existsSync(piedipagina)) {
            const imgData = jsonData.pie_di_pagina;
            
            doc.addImage(imgData, 'JPEG', 0, footerY, wtot, footerHeight/2);            
        }*/



        doc.save('provaPdf.pdf');
        console.log(`✅ PDF salvato `);
        //console.log(`✅ PDF salvato su: ${pdfPath}`);
        // }

    } catch (error) {
        console.error("Errore nel parsing del JSON:", error);
    }
});




// Converte il PDF in immagine --- DA RIVEDERE
/*pdfPoppler.convert(graficoSottoTabella_p, opts)
    .then(() => {
        console.log("Conversione completata!");

        // Legge tutti i file nella cartella images/
        const files = fs.readdirSync(outputDir);
        console.log("File presenti nella cartella:", files);

        // Trova il primo file che corrisponde al nome base del PDF
        const outputImage = files.find(file => file.startsWith(opts.out_prefix) && file.endsWith('.jpg'));

        if (outputImage) {
            const imagePath = path.join(outputDir, outputImage);
            console.log("Immagine trovata:", imagePath);

            // Legge il file immagine e lo converte in base64
            const imageData = fs.readFileSync(imagePath).toString('base64');

            // Aggiunge l'immagine al PDF (assumendo che `doc` sia il tuo documento)
            doc.addImage(imageData, 'JPEG', x, y, hGr, wGr);
            console.log("Immagine aggiunta con successo al PDF!");
        } else {
            console.error("Errore: nessun file immagine trovato dopo la conversione!");
        }
    })
    .catch(err => {
        console.error("Errore nella conversione:", err);
    });*/