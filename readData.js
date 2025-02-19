
const { json, get, jsonp } = require('express/lib/response');
const fs = require('fs');
const { jsPDF } = require('jspdf');
////
const PDFDocument = require('pdfkit');
////
const path = require('path');
require('jspdf-autotable');
const pdfPoppler = require('pdf-poppler');
//const { content } = require('pdfkit/js/page');

//var htot =  600;
const wtot = 230;

fs.readFile('data1.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Errore nella lettura del file:', err);
        return;
    }

    try {
        const desktopPath = path.join(require('os').homedir(), 'Desktop');
        const jsonData = JSON.parse(data);

        //data
        let y = 10 ; // Posizione iniziale verticale
        let y1 = y;
         y += 10;
        let x = 10; // Posizione iniziale orizzontale

        // get json data
        let azienda = jsonData.azienda;                     // azienda => dipende il template
        const piedipagina = jsonData.pie_di_pagina;

        if(azienda == '1'){
        const nomeProdotto = jsonData.nome;
        const numeroProdotto = jsonData.nomeProdotto;
        const testoLatoFoto = jsonData.descr;
        const fotoprodotto = jsonData.fotoprodotto;
        const dow = jsonData.dow;
        const logo = jsonData.logo;
        const graficoLatoTabella1 = jsonData.graficoLatoTabella1;
        const graficoLatoTabella2 = jsonData.graficoLatoTabella2;
        const graficoSottoTabella = jsonData.graficoSottoTabella;
        // costanti titoli
        const titolo1 = "Principali Applicazioni";
        const titolo2 = "Dati tecnici";

        const headerTitles = {
            "air_cloud": jsonData.air_cloud,
            "alimentazione": jsonData.alimentazione,
            "alimentazione_prese": jsonData.alimentazione_prese,
            "altezza": jsonData.altezza,
            "assorbimento": jsonData.assorbimento,
            "attacco_aspirazione_scarico": jsonData.attacco_aspirazione_scarico,
            "capacita_bombola":jsonData.capacita_bombola,
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

        const testoSottoFoto = jsonData.princApp;
            const testoSottoGrafico1 = jsonData.testoSottoGrafico1;
            const titoloSottoGrafico1 = jsonData.titoloSottoGrafico1;
            const titoloSottoGrafico2 = jsonData.titoloSottoGrafico2;
            const titoloSottoGrafico3 = jsonData.titoloSottoGrafico3;
            const titoloSottoGrafico4 = jsonData.titoloSottoGrafico4;
            const titoloSottoGrafico5 = jsonData.titoloSottoGrafico5;

            //tab
            const headers = ["Parametro", "Valore"];                                            // Intestazione fissa

            const tableData = Object.entries(headerTitles).filter(([_,value])=>value)
            .map(([key, value]) => [
                key.replace(/_/g, " "),                                                         // sostituisce "_" con " "
                value ? String(value) : key++                                                      // Converte tutti i valori in stringa per evitare errori
            ]);

            let elencop1 = [];
            let i = 1;
            let iend1 = 0;
            let j = i+1;
            let n1 = 0;
            let istart1 = j;
            for(i ; i < j; i++){
                iend1 = j;
                    if(jsonData[`riga${i}` ]){
                        elencop1[i] = jsonData[`elencoPuntatoLatoFoto${i}`];
                        j =  j + 1;
                    }
                    else{
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

            for(i2 ; i2 < j2; i2++){
                iend2 = j2;
                if(jsonData[`elencoPuntatoLatoGrafico${i2}`]){
                    elencop2[i2] = jsonData[`elencoPuntatoLatoGrafico${i2}`];
                    j2 += 1;
                }
                else{
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
            for(i3; i3 < j3; i3++){
                iend3 = j3;
                if(jsonData[`elencoPuntatoSottoGrafico${i3}`]){
                    elencop3[i3] = jsonData[`elencoPuntatoSottoGrafico${i3}`];
                    j3 += 1;
                }
                else{
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
            for(i4; i4 < j4; i4++){
                iend4 = j4;
                if(jsonData[`elencoPuntatoSottoGrafico${i4}`]){
                    elencop4[i4] = jsonData[`elencoPuntatoSottoGrafico${i4}`];
                    j4 += 1;
                }
                else{
                    j4 -= 1;
                }
            }
            n4 = iend4 - istart4;
            console.log('n4',n4);

            /*let elencoCol = [];
            for(let i=1; i < 5; i++){
                elencoCol[i] = jsonData[`colTab${i}`]
            }*/
            let carLenght = 0;
            let carosello = [];
            const maxPhoto = 9;
            for(let i = 0; i < maxPhoto; i++){
                if(jsonData[`carosello${i}`] ){
                    carosello[i] = jsonData[`carosello${i}`]; 
                    console.log(carosello[i]);
                    carLenght = i; 

                    
                }
            }



            //space
            let doc1 = new jsPDF(); 
            let space1 = 6;
            let space2 = 10;
            let space3 = 3;
            let space4 = 35;
            let space5 = 5;
            let space5_1 = space5 * n1;
            let space6 = 7;
            let hPhoto = 65;
            let wPhoto = 65;
            let spacef = 5;
            let space7 = doc1.getTextDimensions(titolo1).h + 5;
            let space8 = space7 +  doc1.getTextDimensions(testoSottoFoto).h + 25;
            let cimgy = y + space1 + space2 + space3 + space4 + space5 + space6 + space7 + space8;
            let d1 = ( (wtot - (y + space1 + space2 + space3 + space4 + space5 + space6 + space7 + space8) ) / carLenght)/4;
            let wtottemp = ( (wtot - (space1 + space2 + space3 + space4 + space5 + space6 + space7 + space8) ) /carLenght)/4;
            let cimgw = ( ( (wtot/carLenght) *3)/4);
            let cimgh = (cimgw*1.5)/2;
            let space9 =  doc1.getTextDimensions(testoSottoFoto).h; // + 10;
            let space10 = doc1.getTextDimensions(titolo2).h;
            //let space11 = Math.ceil(doc1.lastAutoTable.finalY)+10; 
            let space12 = 9;
            let space13 = doc1.getTextDimensions(titoloSottoGrafico1).h;
            let space14 = 5;
            let space15 = 9;
            let space15_1 = space15 * n2;
            let space16 = 5 + doc1.getTextDimensions(titoloSottoGrafico3).h;
            let space17 = 15 + doc1.getTextDimensions(testoSottoGrafico1).h;
            let space18 =  5 + doc1.getTextDimensions(testoSottoGrafico1).h;
            let space19 = 7;
            let space19_1 = space19 * n3;
            let space20 = 5;
            let space21 = 5 + doc1.getTextDimensions(testoSottoGrafico1).h;
            let space22 = 7;
            let space22_1 = space22 * n4;
            let space23 = 3;
            let space24 =  doc1.getTextDimensions(testoSottoGrafico1).h + 10;
            const footerHeight = 50; // Altezza del piè di pagina

            y1 = y1 + cimgy + hPhoto + footerHeight + space24 +  space1 + space2 + space3 + space4 + space5_1 + space6 + space7 + space8 + space9 + space10 + space12 + space13 + space14 + space15_1 + space16 + space17 + space18 + space19_1 + space20 + space21 + space22_1 + space23 + space24;
            
            let footerY = y1 ; // Posizione verticale
            console.log('y1', y1, footerY);
            const htot = y1 + footerHeight;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        let doc = new jsPDF({
            orientation: "portrait",        // "landscape" per orizzontale
            unit: "mm",                     // Unità di misura ("mm", "cm", "in", "px")
            format: [wtot, htot-10]              // Larghezza e altezza personalizzate in mm
            
        });

        
            
            
                        // per conversione pdf jpg
                        /*let graficoSottoTabella_p = graficoSottoTabella.split("/")[1];
                        const outputDir = "images";
                        const outputImage = path.join(outputDir,  path.extname(graficoSottoTabella_p));
            
                        const opts = {
                            format: 'jpeg',
                            out_dir: outputDir,
                            out_prefix: path.basename(graficoSottoTabella_p, path.extname(graficoSottoTabella_p)),
                            page: 1 // Converte solo la prima pagina del PDF
                        };
            
                        //controllo esistenza cartella otput
                        if (!fs.existsSync(outputDir)) {
                            fs.mkdirSync(outputDir, { recursive: true });
                        }
                        */
        
            // nome prodotto
            doc.setFontSize(25);
            doc.setFont("helvetica", "bold");
            doc.text(nomeProdotto, x, y);

            // numero articolo (prodotto)
            doc.setFontSize(15)
            doc.setFont("helvetica", "normal");
            //let space1 = 6;
            y += space1;
            doc.text(numeroProdotto, x, y);

            //logo
            if (logo && fs.existsSync(logo)) {
                const imageData = fs.readFileSync(logo).toString('base64');
                doc.addImage(imageData, 'JPEG', 150, 5, 35, 10);            
            }        
            //let space2 = 10;
            y += space2; // Spazio sotto il titolo

            // foto prodotto
            //let hPhoto = 65;
            //let wPhoto = 65;
            //let spacef = 5;
            if (fotoprodotto && fs.existsSync(fotoprodotto)) {
                const imageData = fs.readFileSync(fotoprodotto).toString('base64');
                doc.addImage(imageData, 'JPEG', 10, y, wPhoto, hPhoto);
            }
            let xleftPhoto = x + 75;
            //let space3 = 3;
            let yleftPhoto = y + space3;

            // Testo lato foto 
            doc.setFontSize(8);
            doc.text(testoLatoFoto, xleftPhoto, yleftPhoto, { maxWidth: 120 , maxDataLength: 700});
            // doc.text(testoLatoFoto, xleftPhoto, yleftPhoto, { maxWidth: 700 });
            ///y += 40;
            console.log(doc.getTextDimensions(testoLatoFoto).h);
            //let space4 = 35;
            y = y  + space4 ;
            // Elenco puntato lato alla foto
            //let space5 = 5;
            for (let i = 1; i <= 6; i++) {
                if (elencop1[i]) {
                    doc.setFontSize(8);
                    doc.text(`•` + elencop1[i], xleftPhoto, y);
                    y += space5;
                    hPhoto += spacef; 
                }
            }
            //let space6 = 7;
            y = hPhoto + space6 + 10;        //altezza foto + 17

            // titolo        
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text(titolo1, x, y );
            
            //let space7 = doc.getTextDimensions(titolo1).h ;//+ 5;
            y = y  + space7;

            // Testo sotto foto 
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text(testoSottoFoto, x, y, { maxWidth: 195 });
            //let space8 = 15 + doc.getTextDimensions(testoSottoFoto).h;//y += 15;
            y = y +  space8;

            // conto quante foto nel carosello (max 8)
            let cimgx = x;
            //let cimgy = y; //let cimgy = y + space1 + space2 + space3 + space4 + space5 + space6 + space7 + space8;
            //let cimgw = 0;
            //let cimgh = 0;
            console.log('questo valore qua', y);
            //let wtottemp = wtot - y; /// let wtottemp = ( (wtot - (space1 + space2 + space3 + space4 + space5 + space6 + space7 + space8) ) <7carLenght)/4;
            console.log('wtottemp', wtottemp);
            let d = ( wtottemp/carLenght )/ 4; // un quarto dello spazio singolo è l'intervallo
            console.log('d', d1);
            //  foto carosello
            // cimgw = ( ( (wtot/carLenght) *3)/4);
            // cimgh = (cimgw*1.5)/2;
            
            console.log('n', carLenght, i);
            for(let ic = 0; ic <=carLenght; ic++){
                if(carosello[ic] && fs.existsSync(carosello[ic])){
                    var imgCar = fs.readFileSync(carosello[ic]).toString('base64');
                    doc.addImage(imgCar, 'JPEG', cimgx, cimgy, cimgw, cimgh);                    
                // aumento x dopo ogni img
                    cimgx += cimgw + d1;
                }
            }
            
            //y += 7;
            //y = y +  doc.getTextDimensions(titolo1).h;
            //let space9 = d + cimgh + doc.getTextDimensions(testoSottoFoto).h + 10; //-------------DEVO PORTARE SU ACNHE d
            y = y + space9;  //altezza immagini

            //titolo sopra tabella
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text(titolo2, x, y);

            //y += 2,5;
            //let space10 = doc.getTextDimensions(titolo2).h;
            y = y +  space10;
            

            /*const headers = ["Parametro", "Valore"];                                            // Intestazione fissa

            const tableData = Object.entries(headerTitles).filter(([_,value])=>value)
            .map(([key, value]) => [
                key.replace(/_/g, " "),                                                         // sostituisce "_" con " "
                value ? String(value) : key++                                                      // Converte tutti i valori in stringa per evitare errori
            ]);*/

            const marginLeft = 10;
            const marginRight = 10;
            const pageWidth = doc.internal.pageSize.width - marginLeft - marginRight;
            const pageHeight = htot;        
            let maxDataWidth = 0;
            let  cellWidth = 0;
            let maxw = 0;

            // Funzione per calcolare larghezza massima delle colonne
            function getOptimalColumnWidths(headers, tableData, doc) {
                return headers.map((header, colIndex) => {
                    // titolo della colonna (header)
                    const headerWidth = doc.getTextWidth(header);            
                    // larghezza massima dei dati nella colonna 
                    maxDataWidth = tableData.reduce((max, row) => {
                        cellWidth = doc.getTextWidth(row[colIndex] || ""); // Se cella vuota, usa stringa vuota
                        return Math.max(max, cellWidth);
                    }, 0);            
                    maxw = Math.max(headerWidth, maxDataWidth);
                    return Math.max(headerWidth, maxDataWidth);
                });
            }
            
            
            /////////            

            // Calcola le larghezze ottimali per le colonne
            const columnWidths = getOptimalColumnWidths(headers, tableData, doc); //, pageWidth);
            

            doc.autoTable({
                startY: y,                                          // Posizione della tabella
                margin: { left: marginLeft, right: maxw },
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
                    lineWidth: 0.01,                                // Larghezza dei bordi
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
                didDrawPage: function (data) {
                    // Se lo spazio della pagina è esaurito, aggiunge una nuova pagina
                    if (data.cursor.y > pageHeight) {
                        doc.addPage();
                    }
                }
            }); 

                const tableWidth = columnWidths.reduce((totalWidth, width) => totalWidth + width, 0);
                const xT = marginLeft + tableWidth + 10; 

                x += xT;

                //graficoLatoTabella
                let space   = (Math.ceil(doc.lastAutoTable.finalY)/6);
                let xGr     =  25;
                let yGr     = (Math.ceil(doc.lastAutoTable.finalY)/6.5);//45;
                //tab = Math.ceil(doc.lastAutoTable.finalY);
            
                if (graficoLatoTabella1 && fs.existsSync(graficoLatoTabella1)) {
                    const imageData = fs.readFileSync(graficoLatoTabella1).toString('base64');
                    doc.addImage(imageData, 'JPEG', x, y, xGr, yGr);
                }

                if (graficoLatoTabella2 && fs.existsSync(graficoLatoTabella2)) {
                    const imageData = fs.readFileSync(graficoLatoTabella2).toString('base64');
                    doc.addImage(imageData, 'JPEG', x, y + space, xGr, yGr);
                }
                
                //guardo fino a dove è arrivata la tabella
                let space11 = Math.ceil(doc.lastAutoTable.finalY)+10; 
                y = space11 + space12;

                //agg. coordinate
                x = 10;
                //let space12 = 9;
                //y += space12;
                let diff = 105;

                doc.setFontSize(12);
                doc.setFont("helvetica", "bold");
                doc.text(titoloSottoGrafico1, x, y, { maxWidth: 200 });
                diff = x + diff;
                doc.text(titoloSottoGrafico2, diff, y, { maxWidth: 200 });
                //let space13 = doc.getTextDimensions(titoloSottoGrafico1).h;
                y = y + space13;

                // "grafico" 
                
                doc.setFontSize(10);
                let wGr = 60;
                let hGr = 40;

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

                if (graficoSottoTabella && fs.existsSync(graficoSottoTabella)) {
                    const imageData = fs.readFileSync(graficoSottoTabella).toString('base64');
                    doc.addImage(imageData, 'JPEG', x, y, hGr, wGr);
                }
            
                doc.setFont("helvetica", "normal");
                doc.setFontSize(10);
                //elenco puntato lato grafico
                //let space14 = 5; // SERVE ANCHE hGr
                y += space14;
                //let space15 = 9;
                for(let j = 0; j<4; j++){
                    
                    if (jsonData[`elencoPuntatoLatoGrafico${j}`]) {
                        doc.text(`• ` + elencop2[j], diff , y);
                        y += space15;
                    }
                }

                y = hGr + y ;
                //titolo sotto grafico
                doc.setFont("helvetica", "bold");
                doc.setFontSize(12);
                doc.text(titoloSottoGrafico3, x, y, { maxWidth: 200 });
                
                doc.setFontSize(10);
                //let space16 = 5 + doc.getTextDimensions(titoloSottoGrafico3).h;
                y = y + space16;
                doc.setFont("helvetica", "normal");
                //testo vicino "grafico (foto2)"   
                doc.text(testoSottoGrafico1, x, y, { maxWidth: 200 });
                //elencoPuntatoSottoGrafico
                //let space17 = 15 + doc.getTextDimensions(testoSottoGrafico1).h;
                y = y + space17;
                //y = y + doc.getTextDimensions(testoSottoGrafico1).h;
                //titolo sotto grafico 2
                doc.setFont("helvetica", "bold");
                doc.text(titoloSottoGrafico4, x, y, { maxWidth: 200 });
                //let space18 =  5 + doc.getTextDimensions(testoSottoGrafico1).h;
                y = y + space18;
                doc.setFont("helvetica", "normal");

                //let space19 = 7;
                for(let j = 4; j<7; j++){
                    if (elencop3[j]) {
                        doc.text(`• ` + elencop3[j], x, y);
                        y += space19;
                    }
                }
                //let space20 = 5;
                y += space20;

                //titolo sotto grafico 2                
                doc.setFont("helvetica", "bold");
                doc.text(titoloSottoGrafico5, x, y, { maxWidth: 200 });
                //let space21 = 5 + doc.getTextDimensions(testoSottoGrafico1).h;
                y = y + space21;
                doc.setFont("helvetica", "normal");
                //y += 10;
                //let space22 = 7;

                for(let j = 8; j<12; j++){
                    if (elencop4[j]) {
                        doc.text(`• ` + elencop4[j], x, y);
                        y += space22;
                    }
                }
                
                y += space23;

                //testo sotto grafico 2
                doc.setFontSize(7);
                doc.text(testoSottoGrafico1, x, y, { maxWidth: 200 });

        //} --end azienda

            // Salva il PDF sul Desktop 
            // [funziona] const pdfPath = path.join(desktopPath, 'provaDowloadPDF.pdf');
            // doc.save(pdfPath);

            // Footer
            // const footerHeight = 15; // Altezza del piè di pagina
            // const footerY = doc.internal.pageSize.height - footerHeight; // Posizione verticale
            // let space24 = doc.getTextDimensions(testoSottoGrafico1);
            //footerY += space24;
            //doc.setFillColor(50, 50, 50); // Imposta il colore di sfondo (grigio scuro)
            //doc.rect(0, footerY, doc.internal.pageSize.width, footerHeight, 'F'); // Disegna il rettangolo
            
            footerY += space24;
            // Aggiungi il testo del piè di pagina
            doc.setTextColor(255, 255, 255); // Colore bianco per il testo
            doc.setFontSize(10);
            //doc.text("Piè di pagina", 10, footerY);
            
            // Copia i contenuti dal vecchio PDF al nuovo
            // newDoc.addImage(doc.output("datauristring"), "JPEG", 0, 0, wtot, 800);
           
            /**
             * stampa pie di pagina
            */
            if (piedipagina && fs.existsSync(piedipagina)) {
                const imageData = fs.readFileSync(piedipagina).toString('base64');
        //const piedipagina = jsonData.piedipagina;
                doc.addImage(imageData, 'JPEG', 0, footerY, wtot, footerHeight/2);            
            }  
    
             


            
            doc.save('provaPdf.pdf');
            console.log(`✅ PDF salvato `);
            //console.log(`✅ PDF salvato su: ${pdfPath}`);
            }

        } catch (error) {
            console.error("Errore nel parsing del JSON:", error);
        }
});


//VECCHI TABELLA

        /*const tableData = [
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
        });*/


                    // Tabella             
            /*const headers = Object.keys(jsonData.tabella[0]); // Intestazioni dinamiche
                const tableData = jsonData.tabella.map(row => headers.map(header => row[header] || ""));

                // Funzione per calcolare la larghezza massima di ciascuna colonna
                function getMaxColumnWidths(headers, tableData, doc) {
                    const columnWidths = headers.map((header, index) => {
                        // Calcola la lunghezza massima del contenuto per ogni colonna
                        const headerLength = doc.getTextWidth(header);
                        const maxDataLength = tableData.reduce((max, row) => {
                            const cellLength = doc.getTextWidth(row[index]);
                            return Math.max(max, cellLength);
                        }, 0);
                        return Math.max(headerLength, maxDataLength) + 10; // Aggiungi un po' di padding
                    });
                    return columnWidths;
                }*/

            // Impostazioni per margini e larghezza
            // const marginLeft = 10;
            // const marginRight = 10;
            // const headerHeight = 10;
            // const rowHeight = 8;

                        // Impostare il layout della tabella
            /*doc.autoTable({
                startY: y,                                          // Posizione della tabella
                margin: { left: marginLeft, right: marginRight },
                head: [headers], 
                body: tableData, 
                styles: {
                    fontSize: 8,               
                    cellPadding: 3,                                 // Margine interno delle celle
                    overflow: 'linebreak',                          // Gestisce l'overflow con interruzioni di riga
                    halign: 'center',                               // centrato orizzontale 
                    valign: 'middle'                                // centrato verticale 
                },
                columnStyles: headers.reduce((styles, header, index) => {
                    styles[index] = { cellWidth: columnWidths[index] };
                    return styles;
                }, {}),
                headStyles: {
                    fillColor: [200, 200, 200], 
                    textColor: [0, 0, 0], 
                },
                bodyStyles: {
                    fillColor: [255, 255, 255], 
                    textColor: [0, 0, 0], 
                },
            });*/