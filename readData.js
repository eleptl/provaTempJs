
const { json, get } = require('express/lib/response');
const fs = require('fs');
const { jsPDF } = require('jspdf');
////
const PDFDocument = require('pdfkit');
////
const path = require('path');
require('jspdf-autotable');
const pdfPoppler = require('pdf-poppler');

const htot =  600;
const wtot = 230;

// Legge il file JSON
// fs.readFile('data.json', 'utf8', (err, data) => {
fs.readFile('data1.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Errore nella lettura del file:', err);
        return;
    }

    try {
        const desktopPath = path.join(require('os').homedir(), 'Desktop');
        const jsonData = JSON.parse(data);
        //const doc = new jsPDF();

        const doc = new jsPDF({
            orientation: "portrait",        // "landscape" per orizzontale
            unit: "mm",                     // Unità di misura ("mm", "cm", "in", "px")
            format: [wtot, htot]              // Larghezza e altezza personalizzate in mm
            
        });


        let y = 10; // Posizione iniziale verticale
        let x = 10; // Posizione iniziale orizzontale

        // azienda => dipende il template
        let azienda = jsonData.azienda;

        if(azienda == '1'){
            // costanti titoli
            const titolo1 = "Principali Applicazioni";
            const titolo2 = "Dati tecnici";

            // data

            console.log('azienda:',azienda);

            //const nomeProdotto = jsonData.nomeProdotto;
            const nomeProdotto = jsonData.nome;

            const numeroProdotto = jsonData.nomeProdotto;
            
            //const testoLatoFoto = jsonData.testoLatoFoto;
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

        const header = headerTitles;
        console.log('header',header);
            
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

            const immagine = jsonData.immagine;


            //const testoSottoFoto = jsonData.testoSottoFoto;
            const testoSottoFoto = jsonData.princApp;
            console.log(testoSottoFoto);

            const testoSottoGrafico1 = jsonData.testoSottoGrafico1;
            const testoSottoGrafico2 = jsonData.testoSottoGrafico2;
            const titoloSottoGrafico1 = jsonData.titoloSottoGrafico1;
            const titoloSottoGrafico2 = jsonData.titoloSottoGrafico2;
            const titoloSottoGrafico3 = jsonData.titoloSottoGrafico3;
            const titoloSottoGrafico4 = jsonData.titoloSottoGrafico4;
            const titoloSottoGrafico5 = jsonData.titoloSottoGrafico5;

            let elencop1 = [];
            let l1 = 0;
            let i = 1;
            let j = i+1;
            for(i ; i < j; i++){
                /*if(jsonData[`elencoPuntatoLatoFoto${i}` ]){
                    elencop1[i] = jsonData[`elencoPuntatoLatoFoto${i}`];
                    j =  j + 1;
                }
                else{
                    l1 = i-1;           //lunghezza finche trova elencoPuntatoLatoFoto
                    j -= 1;
                }*/
                    if(jsonData[`riga${i}` ]){
                        elencop1[i] = jsonData[`elencoPuntatoLatoFoto${i}`];
                        j =  j + 1;
                    }
                    else{
                        l1 = i-1;           //lunghezza finche trova elencoPuntatoLatoFoto
                        j -= 1;
                    }
            }

            //elenchi
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
            let elencoCol = [];
            for(let i=1; i < 5; i++){
                elencoCol[i] = jsonData[`colTab${i}`]
            }
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

            console.log('imm carosello', carLenght);
        
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
            if (fotoprodotto && fs.existsSync(fotoprodotto)) {
                const imageData = fs.readFileSync(fotoprodotto).toString('base64');
                doc.addImage(imageData, 'JPEG', 10, y, wPhoto, hPhoto);
            }
            //
            let xleftPhoto = x + 75;
            let yleftPhoto = y + 3;

            // Testo lato foto 
            doc.setFontSize(8);
            doc.text(testoLatoFoto, xleftPhoto, yleftPhoto, { maxWidth: 120 , maxDataLength: 700});
            // doc.text(testoLatoFoto, xleftPhoto, yleftPhoto, { maxWidth: 700 });
            ///y += 40;
            console.log(doc.getTextDimensions(testoLatoFoto).h);
            y = (y  + 40 );
            // console.log(doc.getTextDimensions(maxDataLength));
            // Elenco puntato lato alla foto
            for (let i = 1; i <= 4; i++) {
                if (elencop1[i]) {
                    doc.setFontSize(8);
                    doc.text(`•` + elencop1[i], xleftPhoto, y);
                    y += 5;
                    hPhoto += 5; 
                }
            }
            y = hPhoto + 40;        //altezza foto + 17

            // titolo        
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text(titolo1, x, y );
            
            y = y +  doc.getTextDimensions(titolo1).h + 5;

            // Testo sotto foto 
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text(testoSottoFoto, x, y, { maxWidth: 195 });
            y += 15;
            y = y +  doc.getTextDimensions(testoSottoFoto).h;

            // conto quante foto nel carosello (max 8)
            let cimgx = x;
            let cimgy = y;
            let cimgw = 0;
            let cimgh = 0;
            let wtottemp = wtot - y;
            console.log('wtottemp', wtottemp);
            let d = ( wtottemp/carLenght )/ 4; // un quarto dello spazio singolo è l'intervallo
            console.log('d', d);
            //  foto carosello
            cimgw = ( ( (wtot/carLenght) *3)/4);
            cimgh = (cimgw*1.5)/2;
            
            console.log('n', carLenght, i);
            for(let ic = 0; ic <=carLenght; ic++){
                if(carosello[ic] && fs.existsSync(carosello[ic])){
                    var imgCar = fs.readFileSync(carosello[ic]).toString('base64');
                    doc.addImage(imgCar, 'JPEG', cimgx, cimgy, cimgw, cimgh);
                    console.log('wimgc',cimgw,'himgc', cimgh,'d', d, 'ic', ic);
                    
                // aumento y dopo ogni img
                    cimgx += cimgw + d;
                }
            }
            
            //y += 7;
            //y = y +  doc.getTextDimensions(titolo1).h;
            y = y + d + cimgh + 10;  //altezza immagini

            // Testo sotto foto 
            /*doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text(testoSottoFoto, x, y, { maxWidth: 195 });
            y += 15;*/
            y = y +  doc.getTextDimensions(testoSottoFoto).h ;

            //titolo sopra tabella
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text(titolo2, x, y);

            //y += 2,5;
            y = y +  doc.getTextDimensions(titolo2).h;
            

            const headers = ["Parametro", "Valore"];                                            // Intestazione fissa

            const tableData = Object.entries(headerTitles).map(([key, value]) => [
                key.replace(/_/g, " "),                                                         // sostituisce "_" con " "
                value ? String(value) : ""                                                      // Converte tutti i valori in stringa per evitare errori
            ]);

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
                    // La larghezza ottimale per la colonna sarà la larghezza massima tra il titolo e i dati
                    maxw = Math.max(headerWidth, maxDataWidth);
                    return Math.max(headerWidth, maxDataWidth);
                });
            }
            
            
            /////////            

            // Calcola le larghezze ottimali per le colonne
            const columnWidths = getOptimalColumnWidths(headers, tableData, doc, pageWidth);
            console.log('quanto?', jsonData.pressione_attuatore_pneumatico.length, columnWidths );
            

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

                if (graficoLatoTabella1 && fs.existsSync(graficoLatoTabella1)) {
                    const imageData = fs.readFileSync(graficoLatoTabella1).toString('base64');
                    doc.addImage(imageData, 'JPEG', x, y, xGr, yGr);
                }

                if (graficoLatoTabella2 && fs.existsSync(graficoLatoTabella2)) {
                    const imageData = fs.readFileSync(graficoLatoTabella2).toString('base64');
                    doc.addImage(imageData, 'JPEG', x, y + space, xGr, yGr);
                }
                
                //guardo fino a dove è arrivata la tabella
                y = Math.ceil(doc.lastAutoTable.finalY)+10;

                //agg. coordinate
                x = 10;
                y += 9;
                let diff = 105;

                doc.setFontSize(12);
                doc.setFont("helvetica", "bold");
                doc.text(titoloSottoGrafico1, x, y, { maxWidth: 200 });
                diff = x + diff;
                doc.text(titoloSottoGrafico2, diff, y, { maxWidth: 200 });
                y = y + doc.getTextDimensions(titoloSottoGrafico1).h;

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
                doc.setFontSize(12);
                doc.text(titoloSottoGrafico3, x, y, { maxWidth: 200 });
                
                doc.setFontSize(10);
                y = y + 5 + doc.getTextDimensions(titoloSottoGrafico3).h;
                doc.setFont("helvetica", "normal");
                //testo vicino "grafico (foto2)"           
                doc.text(testoSottoGrafico1, x, y, { maxWidth: 200 });
                //elencoPuntatoSottoGrafico
                y = y + 15 + doc.getTextDimensions(testoSottoGrafico1).h;
                //y = y + doc.getTextDimensions(testoSottoGrafico1).h;
                //titolo sotto grafico 2
                doc.setFont("helvetica", "bold");
                doc.text(titoloSottoGrafico4, x, y, { maxWidth: 200 });
                y = y + 5 + doc.getTextDimensions(testoSottoGrafico1).h;
                doc.setFont("helvetica", "normal");

                for(let j = 4; j<7; j++){
                    if (elencop3[j]) {
                        doc.text(`• ` + elencop3[j], x, y);
                        y += 7;
                    }
                }
                y += 5;

                //titolo sotto grafico 2                
                doc.setFont("helvetica", "bold");
                doc.text(titoloSottoGrafico5, x, y, { maxWidth: 200 });
                y = y + 5 + doc.getTextDimensions(testoSottoGrafico1).h;
                doc.setFont("helvetica", "normal");
                //y += 10;

                for(let j = 7; j<11; j++){
                    if (elencop4[j]) {
                        doc.text(`• ` + elencop4[j], x, y);
                        y += 7;
                    }
                }

                y += 3;

                //testo sotto grafico 2
                doc.setFontSize(7);
                doc.text(testoSottoGrafico1, x, y, { maxWidth: 200 });

        }

            // Salva il PDF sul Desktop 
            // [funziona] const pdfPath = path.join(desktopPath, 'provaDowloadPDF.pdf');
            // doc.save(pdfPath);

            // Footer
            const footerHeight = 15; // Altezza del piè di pagina
            const footerY = doc.internal.pageSize.height - footerHeight; // Posizione verticale

            doc.setFillColor(50, 50, 50); // Imposta il colore di sfondo (grigio scuro)
            doc.rect(0, footerY, doc.internal.pageSize.width, footerHeight, 'F'); // Disegna il rettangolo

            // Aggiungi il testo del piè di pagina
            doc.setTextColor(255, 255, 255); // Colore bianco per il testo
            doc.setFontSize(10);
            doc.text("Piè di", 10, footerY + 5);

            doc.save('provaPdf.pdf');
            console.log(`✅ PDF salvato `);
            //console.log(`✅ PDF salvato su: ${pdfPath}`);

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