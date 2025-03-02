
const { json, get, jsonp } = require('express/lib/response');
const fs = require('fs');
const { jsPDF } = require('jspdf');
const { PDFDocument } = require('pdf-lib');
// import axios from 'axios';
//const axios = require('axios');
const express = require('express');
const app = express();
const db = require('./knexConfig');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3001;


app.use(cors());

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

// Parse incoming request bodies in JSON format
app.use(bodyParser.json({ limit: '16MB' }));


const path = require('path');
require('jspdf-autotable');
const pdfPoppler = require('pdf-poppler');
const { fileURLToPath } = require('url');

const ImageFactory = {
    compress: (imageData) => {
        // Simula la compressione 
        // console.log('Compressione immagine in corso...');
        return imageData;
    }
};

//font
const fontPathDemi = "Font_ttf/KohinoorLatin-Demi.ttf";
const fontPathDemi2 = "Font_ttf/KohinoorLatin-Demi2.ttf";
const fontPathLight = "Font_ttf/KohinoorLatin-Light.ttf";
const fontPathLight2 = "Font_ttf/KohinoorLatin-Light2.ttf";

function convertTTFtoBase64(path) {
    return fs.readFileSync(path).toString('base64');
}

let base64Demi = convertTTFtoBase64(fontPathDemi);
let base64Demi2 = convertTTFtoBase64(fontPathDemi2);
let base64Light = convertTTFtoBase64(fontPathLight);
let base64Light2 = convertTTFtoBase64(fontPathLight2);

//path dataFile.jsof
const jsonFilePath = 'data1.json';
const jsonFIlePath2 = 'data2.json';

let jsonData2;

// function eliminaFile(nomeFile) {
//     try {
//         fs.unlinkSync(nomeFile);
//         console.log(`Il file ${nomeFile} è stato eliminato con successo.`);
//     } catch (err) {
//         console.error(`Errore durante l'eliminazione del file ${nomeFile}:`, err);
//     }
// }


// function for create pdf
function createPdfFromJsonFile(data) {
    // function createPdfFromJsonFile(jsonFilePath, jsonFIlePath2) {
    // fs.readFile(jsonFIlePath2, 'utf8', (err, data2) => {
    //     if (err) {
    //         console.error('Errore nella lettura del file:', err);
    //         return;
    //     }

    //     jsonData2 = JSON.parse(data2);
    // })


    // fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    //     if (err) {
    //         console.error('Errore nella lettura del file:', err);
    //         return;
    //     }



    try {
        const desktopPath = path.join(require('os').homedir(), 'Desktop');
        // console.log(data)
        // const jsonData = JSON.parse(data);
        const jsonData = data;
        const jsonData2 = data;
        console.log(jsonData);
        //data
        var wtot = 290;
        let y = 10;
        let y1 = y;
        y += 10;
        let x = 10;

        // get json data
        // let company = jsonData.company;// company => dipende il template
        let company = '';
        if (jsonData.company == 'Sistem Air') {
            company = '1';
        }
        // const piedipagina = jsonData.pie_di_pagina;
        const piedipagina = "images/piedipagina.jpg";

        let doc1 = new jsPDF();

        const nome = jsonData.nome;
        const sku = jsonData.sku;
        const descr = jsonData.descr;
        const img1 = jsonData.img1;
        const logo = "images/logo.jpg";//jsonData.logo;
        const img12 = jsonData.img12;
        const img13 = jsonData.img13;
        const img14 = jsonData.img14;

        const headerTitles = {

            //"air_cloud": jsonData.air_cloud,

            "alim": "alim", //jsonData.alim,
            /*"alimentazione_prese": jsonData.alimentazione_prese,
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
            "superficie_filtrante": jsonData.superficie_filtrante,
            "superficie_max_da_pulire": jsonData.superficie_max_da_pulire,
            "tendisacco": jsonData.tendisacco,
            "uscita_aria": jsonData.uscita_aria,
            "valvola_rompivuoto_di_sicurezza": jsonData.valvola_rompivuoto_di_sicurezza,*/

            "cap": jsonData.cap,
            "misura": jsonData.misura,
            "misa": jsonData.misa,
            "misb": jsonData.misb,
            "misc": jsonData.misc,
            "misd": jsonData.misd,
            "mise": jsonData.mise,
            "misf": jsonData.misf,
            "misg": jsonData.misg,
            "mish": jsonData.mish,
            "misi": jsonData.misi,
            "misl": jsonData.misl,
            "mism": jsonData.mism,
            "misn": jsonData.misn,
            "miso": jsonData.miso,
            "misp": jsonData.misp,
            "misq": jsonData.misq,
            "misr": jsonData.misr,
            "miss": jsonData.miss,
            "mist": jsonData.mist,
            "misu": jsonData.misu,
            "misv": jsonData.misv,
            "misz": jsonData.misz,
            "misxmin": jsonData.misxmin,
            "mat": jsonData.mat,
            "finitura": jsonData.finitura,
            "tubofless": jsonData.tubofless,
            "classeres": jsonData.classeres,
            "accessori": jsonData.accessori,
            "puntipresasp": jsonData.puntipresasp,
            "supmaxpulire": jsonData.supmaxpulire,
            "op": jsonData.op,
            "sfiatomicrop": jsonData.sfiatomicrop,
            "compmanut": jsonData.compmanut,
            "presaabo": jsonData.presaabo,
            "attaspiscarico": jsonData.attaspiscarico,
            "gradoprot": jsonData.gradoprot,
            "alim": jsonData.alim,
            "frequ": jsonData.frequ,
            "potmotore": jsonData.potmotore,
            "assorb": jsonData.assorb,
            "alimprese": jsonData.alimprese,
            "portataaria": jsonData.portataaria,
            "depressmax": jsonData.depressmax,
            "classfiltr": jsonData.classfiltr,
            "supfiltr": jsonData.supfiltr,
            "capcontpolveri": jsonData.capcontpolveri,
            "silenzaria": jsonData.silenzaria,
            "peso": jsonData.peso,
            "rumorotot": jsonData.rumorotot,
            "rumor1motore": jsonData.rumor1motore,
            "rumor2motori": jsonData.rumor2motori,
            "uscitaaria": jsonData.uscitaaria,
            "pot": jsonData.pot,
            "pressaria": jsonData.pressaria,
            "capbombola": jsonData.capbombola,
            "scatincasso": jsonData.scatincasso,
            "cornicemuro": jsonData.cornicemuro,
            "kitpulizia": jsonData.kitpulizia,
            "airpowmax": jsonData.airpowmax,
            "maxtubi": jsonData.maxtubi,
            "centralspiranti": jsonData.centralspiranti,
            "conf": jsonData.conf,
            "dia": jsonData.dia,
            "tuboflessraccordo": jsonData.tuboflessraccordo,
            "tuboflisy2": jsonData.tuboflisy2,
            "tubosensecalza": jsonData.tubosensecalza,
            "tubosensesenza": jsonData.tubosensesenza,
            "impugnaturasense": jsonData.impugnaturasense,
            "gancio4pz": jsonData.gancio4pz,
            "cestello10pz": jsonData.cestello10pz,
            "spazzolapolv": jsonData.spazzolapolv,
            "lanciaangoli": jsonData.lanciaangoli,
            "prolunrigida": jsonData.prolunrigida,
            "spazzolapavim": jsonData.spazzolapavim,
            "spazzolapavtapp": jsonData.spazzolapavtapp,
            "spazzolaabiti": jsonData.spazzolaabiti,
            "spazzolamaterassi": jsonData.spazzolamaterassi,
            "accfermaoggetti": jsonData.accfermaoggetti,
            "prolunatelesco": jsonData.prolunatelesco,
            "spazzolaradiatori": jsonData.spazzolaradiatori,
            "lineaspazzole": jsonData.lineaspazzole,
            "setole": jsonData.setole,
            "numaccessori": jsonData.numaccessori,
            "imballo": jsonData.imballo,
            "retetubiera": jsonData.retetubiera,
            "spessore": jsonData.spessore,
            "versione": jsonData.versione,
            "bancale": jsonData.bancale,
            "formato": jsonData.formato,
            "lunghezza": jsonData.lunghezza,
            "colorefinitura": jsonData.colorefinitura,
            "preselinea": jsonData.preselinea,
            "conductermica": jsonData.conductermica,
            "resistelett": jsonData.resistelett,
            "resisturto": jsonData.resisturto,
            "lslowsmoke": jsonData.lslowsmoke,
            "zerohalogen": jsonData.zerohalogen,
            "resistfuoco": jsonData.resistfuoco,
            "direttivabassatensione": jsonData.direttivabassatensione,
            "tensionenom": jsonData.tensionenom,
            "conformecpr": jsonData.conformecpr,
            "classecpr": jsonData.classecpr,
            "antistatico": jsonData.antistatico,
            "atex": jsonData.atex,
            "sezione": jsonData.sezione,
            "impianti": jsonData.impianti,
            "multiimpsense": jsonData.multiimpsense,
            "monoimpsense": jsonData.monoimpsense,
            "puntipresa": jsonData.puntipresa,
            "contropresacurvo": jsonData.contropresacurvo,
            "tubopvc": jsonData.tubopvc,
            "curvamf": jsonData.curvamf,
            "curvaff": jsonData.curvaff,
            "derivazioneff": jsonData.derivazioneff,
            "manicotto": jsonData.manicotto,
            "grigliasfiato": jsonData.grigliasfiato,
            "guainaelettrica": jsonData.guainaelettrica,
            "colla250": jsonData.colla250,
            "tipocontropresa": jsonData.tipocontropresa,
            "cover": jsonData.cover,
            "curvaff225": jsonData.curvaff225,
            "curvaff45": jsonData.curvaff45,
            "curvaff90": jsonData.curvaff90,
            "colla60": jsonData.colla60,
            "manicottopvc2": jsonData.manicottopvc2,
            "manicotto50": jsonData.manicotto50,
            "tubopvc2": jsonData.tubopvc2,
            "barra": jsonData.barra,
            "larghezza": jsonData.larghezza,
            "linea": jsonData.linea,
            "contropresa": jsonData.contropresa,
            "seriecivile": jsonData.seriecivile,
            "coloresportello": jsonData.coloresportello,
            "installazione": jsonData.installazione,
            "install": jsonData.install,
            "ingressopolveri": jsonData.ingressopolveri,
            "contenitoripolveri": jsonData.contenitoripolveri,
            "profondita": jsonData.profondita,
            "lunghezzatubo": jsonData.lunghezzatubo,
            "onofflisy2": jsonData.onofflisy2,
            "regolatorepressione": jsonData.regolatorepressione,
            "gradoipimpugnatura": jsonData.gradoipimpugnatura,
            "gradoipricevente": jsonData.gradoipricevente,
            "operatorimax": jsonData.operatorimax,
            "batteria": jsonData.batteria,
            "vdc": jsonData.vdc,
            "vdcmin": jsonData.vdcmin,
            "in_ampere": jsonData.in_ampere,
            "nervaturerinforzo": jsonData.nervaturerinforzo,
            "frequenza": jsonData.frequenza,
            "vac": jsonData.vac,
            "vacmin": jsonData.vacmin,
            "vacmax": jsonData.vacmax,
            "fusibileprotezione": jsonData.fusibileprotezione,
            "antennarf": jsonData.antennarf,
            "imax": jsonData.imax,
            "isniff": jsonData.isniff,
            "isleep": jsonData.isleep,
            "cavominiusb": jsonData.cavominiusb,
            "raccordi360": jsonData.raccordi360,
            "universale": jsonData.universale,
            "supidonee": jsonData.supidonee,
            "turbotech": jsonData.turbotech,
            "imbocco": jsonData.imbocco,
            "snodo": jsonData.snodo,
            "altezza": jsonData.altezza,
            "portatamax": jsonData.portatamax,
            "fusibile": jsonData.fusibile,
            "assorbmax": jsonData.assorbmax,
            "dimacarta": jsonData.dimacarta,
            "alimaus": jsonData.alimaus,
            "caricocombust": jsonData.caricocombust,
            "staffamuro": jsonData.staffamuro,
            "rumorosita": jsonData.rumorosita,
            "disgiuntterm": jsonData.disgiuntterm,
            "filtroispez": jsonData.filtroispez,
            "capmaxdos": jsonData.capmaxdos,
            "capmax": jsonData.capmax,
            "cariconomuscite": jsonData.cariconomuscite,
            "fusibileprot": jsonData.fusibileprot,
            "tempfunz": jsonData.tempfunz,
            "umidita": jsonData.umidita,
            "numgiri": jsonData.numgiri,
            "tempfunzminmax": jsonData.tempfunzminmax,
            "gradoumidita": jsonData.gradoumidita,
            "classeiso": jsonData.classeiso,
            "coppianom": jsonData.coppianom,
            "volumenetto": jsonData.volumenetto,
            "lungcavo": jsonData.lungcavo,
            "tempesercminmax": jsonData.tempesercminmax,
            "tessuto": jsonData.tessuto,
            "tubazioni": jsonData.tubazioni,
            "uscitapolveri": jsonData.uscitapolveri,
            "misurax": jsonData.misurax,
            "capdosatore": jsonData.capdosatore,
            "altezzamaxh": jsonData.altezzamaxh,
            "altezzaminh": jsonData.altezzaminh,
            "escming": jsonData.escming,
            "escmaxh": jsonData.escmaxh,
            "colore": jsonData.colore,
            "compatibilita": jsonData.compatibilita,
            "diametrokit": jsonData.diametrokit,
            "voltmassimo": jsonData.voltmassimo,
            "corrmassima": jsonData.corrmassima,
            "carico": jsonData.carico,
            "regsensibilita": jsonData.regsensibilita,
            "regritardo": jsonData.regritardo,
            "diametrosensore": jsonData.diametrosensore,
            "certatex": jsonData.certatex,
            "diametroint": jsonData.diametroint,
            "racctubometallo": jsonData.racctubometallo,
            "raccurvoplastic": jsonData.raccurvoplastic,
            "coppiatubicromati": jsonData.coppiatubicromati,
            "spazzolapavimento": jsonData.spazzolapavimento,
            "permotoriaspiranti": jsonData.permotoriaspiranti,
            "pesodosatore": jsonData.pesodosatore,
            "pesomotore": jsonData.pesomotore,
            "idealeper": jsonData.idealeper,
            "misuraine": jsonData.misuraine,
            "misuraoute": jsonData.misuraoute,
            "pressioneariamax": jsonData.pressioneariamax,
            "grigliaprotfiltro": jsonData.grigliaprotfiltro,
            "tendisacco": jsonData.tendisacco,
            "corpo": jsonData.corpo,
            "tenute": jsonData.tenute,
            "partiinterne": jsonData.partiinterne,
            "tensione": jsonData.tensione,
            "potassorbita": jsonData.potassorbita,
            "serviziocont": jsonData.serviziocont,
            "connelettrica": jsonData.connelettrica,
            "funzione": jsonData.funzione,
            "azionamento": jsonData.azionamento,
            "connpneumatiche": jsonData.connpneumatiche,
            "dn": jsonData.dn,
            "pn": jsonData.pn,
            "pressinelavorominmax": jsonData.pressinelavorominmax,
            "fluido": jsonData.fluido,
            "tempirisposta": jsonData.tempirisposta,
            "scaricoterzavia": jsonData.scaricoterzavia,
            "attaccitubpvc": jsonData.attaccitubpvc,
            "assorbelettrovalvola": jsonData.assorbelettrovalvola,
            "attariacompressa": jsonData.attariacompressa,
            "alimelettrovalvola": jsonData.alimelettrovalvola,
            "pressioneingressoac": jsonData.pressioneingressoac,
            "pressioneacmax": jsonData.pressioneacmax,
            "pressioneflussomin": jsonData.pressioneflussomin,
            "pressioneflussomax": jsonData.pressioneflussomax,
            "attaccitubfilettatia": jsonData.attaccitubfilettatia,
            "tassello": jsonData.tassello,
            "lungtassello": jsonData.lungtassello,
            "rondella": jsonData.rondella,
            "mattassello": jsonData.mattassello,
            "coltassello": jsonData.coltassello,
            "distanzld": jsonData.distanzld,
            "foroggfiss": jsonData.foroggfiss,
            "punzone": jsonData.punzone,
            "lungfilint": jsonData.lungfilint,
            "vite": jsonData.vite,
            "lungviteld": jsonData.lungviteld,
            "tipotesta": jsonData.tipotesta,
            "largtesta": jsonData.largtesta,
            "matvite": jsonData.matvite,
            "colorvite": jsonData.colorvite,
            "pitoneria": jsonData.pitoneria,
            "chiave": jsonData.chiave,
            "occhiolo": jsonData.occhiolo,
            "gancio": jsonData.gancio,
            "coppiaserr": jsonData.coppiaserr,
            "spessmaxfiss": jsonData.spessmaxfiss,
            "profposa": jsonData.profposa,
            "profeffins": jsonData.profeffins,
            "matcarico": jsonData.matcarico,
            "trazione": jsonData.trazione,
            "taglio": jsonData.taglio,
            "trazobliqua": jsonData.trazobliqua,
            "trazsism": jsonData.trazsism,
            "tipotass": jsonData.tipotass,
            "perapplin": jsonData.perapplin,
            "distcritbordo": jsonData.distcritbordo,
            "intercrit": jsonData.intercrit,
            "intermin": jsonData.intermin,
            "distminbord": jsonData.distminbord,
            "spessminsupp": jsonData.spessminsupp,
            "matprima": jsonData.matprima,
            "gradoinfiamm": jsonData.gradoinfiamm,
            "tempfusio": jsonData.tempfusio,
            "colfasce": jsonData.colfasce,
            "girispazz": jsonData.girispazz,
            "motore": jsonData.motore,
            "voltaggio": jsonData.voltaggio,
            "spazzola": jsonData.spazzola,
            "spazzinclu": jsonData.spazzinclu,
            "abrasione": jsonData.abrasione,
            "sfiaria": jsonData.sfiaria,
            "ingraria": jsonData.ingraria,
            "scaria": jsonData.scaria,
            "compmanut": jsonData.compmanu,
            "opmaxcont": jsonData.opmaxcont,
            "convelettrvel": jsonData.convelettrvel,
            "pulvibrfiltro": jsonData.pulvibrfiltro,
            "applsu": jsonData.applsu,
            "monoblosep": jsonData.monoblosep,
            "diatubo": jsonData.diatubo,
            "permotori": jsonData.permotori,
            "motorimax": jsonData.motorimax,
            "diaing": jsonData.diaing,
            "tensalimelett": jsonData.tensalimelett,
            "presslav": jsonData.presslav,
            "perso": jsonData.perso,
            "barratubo1m": jsonData.barratubo1m,
            "manicgiunz": jsonData.manicgiunz,
            "curva90": jsonData.curva90,
            "grigliascarico": jsonData.grigliascarico,
            "persistmod": jsonData.persistmod,
            "compgestmot": jsonData.compgestmot,
            "rompivuoto": jsonData.rompivuoto,
            "opmax32": jsonData.opmax32,
            "opmax40": jsonData.opmax40,
            "griprotfiltr": jsonData.griprotfiltr,
            "scariautom": jsonData.scariautom,
            "schedgestasp": jsonData.schedgestasp,
            "pressattpne": jsonData.pressattpne,
            "pressugelli": jsonData.pressugelli,
            "tuboflessdot": jsonData.tuboflessdot,
            "lungmaxtubo": jsonData.lungmaxtubo,
            "pulsanti": jsonData.pulsanti,
            "regpress": jsonData.regpress,
            "raccordo360": jsonData.raccordo360


        };

        // const headerTitles1 = {

        //     "air_cloud": jsonData.air_cloud,
        //     "alim": jsonData.alim,
        //     "alimentazione_prese": jsonData.alimentazione_prese,
        //     "altezza": jsonData.altezza,
        //     "assorbimento": jsonData.assorbimento,
        //     "attacco_aspirazione_scarico": jsonData.attacco_aspirazione_scarico,
        //     "capacita_bombola": jsonData.capacita_bombola
        // };


        const princapp = jsonData.princapp;
        // const testoSottoGrafico1 = jsonData.testoSottoGrafico1;
        const testoSottoGrafico1 = '';

        // costanti titoli
        const titolo1 = "Principali Applicazioni";
        let titolo2;
        if (company == '1') {
            titolo2 = "Dati tecnici";
        } else {
            titolo2 = "Condizioni di installazione";
        }

        let titoloSottoGrafico1 = "Grafico di prestazione";
        //if(company == 1 ){
        //titoloSottoGrafico1 = "Grafico di prestazione";
        //}else{
        //  if(company == 2){
        //  titoloSottoGrafico1 = "Sequenza di montaggio";
        //  }
        //}
        let titoloSottoGrafico1_2 = "Sequenza di montaggio";

        let titoloSottoGrafico3 = ' ';
        const titoloSottoGrafico2 = "Omologazioni";
        if (company == '1') {
            titoloSottoGrafico3 = "Conformità e normative";
        } else {
            if (company == '2') {
                titoloSottoGrafico3 = "Consigli per la posa";
            }
        }
        let titoloSottoGrafico4 = ' ';
        if (company == '1') {
            titoloSottoGrafico4 = "Conformità";
        } else {
            if (company == '2') {
                titoloSottoGrafico4 = "Prova di Carico";
            }
        }
        let titoloSottoGrafico5 = ' ';
        if (company == '1') {
            titoloSottoGrafico5 = "Normative armonizzate applicate";
        }
        else {
            if (company == '2') {
                titoloSottoGrafico5 = "Certificazioni";
            }
        }

        let headers = ["Parametro", "Valore", "Unita"];
        let headers1 = ["Parametro", "Valore", "Unita"];

        let suffixies = [];
        suffixies = headers.map(header =>
            header.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()
        );
        let suffixies1 = [];
        suffixies1 = headers1.map(header1 =>
            header1.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()
        );


        // Aggiornato: Creazione dati tabella con dati in base agli headers
        /*const tableData = Object.entries(headerTitles)
        .filter(([_, value]) => value)
            .map(([key, value]) => {
                const row = [];
        
            suffixies.forEach(suffix => {
                
                if(suffix == 'parametro')
                    suffix = '';
                const colid = `${key}`;  
                if (suffix === "unita") {
                    // Prendi il valore dal secondo JSON (unitJsonData)
                    cellValue = jsonData2[colid] || "-";
                }



                row.push(jsonData[colid] || "-");
            });        
            const isEmptyRow = row.every(cell => cell === "-" || cell === null || cell === "");
            return isEmptyRow ? null : row; // Esclude la riga se tutti i campi sono vuoti
        })
        .filter(row => row !== null); // Rimuove le righe vuote*/

        // Creazione dati tabella con dati in base agli headers
        // Creazione dati tabella con dati in base agli headers
        const tableData = Object.entries(headerTitles)
            .filter(([_, value]) => value) // Filtra solo gli header attivi
            .map(([key, value]) => {
                const row = [];

                suffixies.forEach(suffix => {
                    let cellValue = "-";

                    if (suffix === "parametro") {
                        // Prende direttamente la chiave (es. 'alim')
                        cellValue = key;
                    } else if (suffix === "valore") {
                        // Prende il valore da jsonData (es. 'alimentazione a')
                        cellValue = jsonData[key] || "-";
                    } else if (suffix === "unita") {
                        // Prende il valore da jsonData2 (es. 'V ac')
                        cellValue = jsonData2[key] || "-";
                    }

                    row.push(cellValue);
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
                // console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAA', maxDataWidth, headerWidth, wtot);
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
        // console.log('wtot: ', maxwtot , 'tot', wtot);
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
                    // console.log('altezza singola cella', cellHeight);
                    maxRowHeight = Math.max(maxRowHeight, cellHeight);
                });

                totaltableHeight += maxRowHeight;
            });

            return totaltableHeight;
        }

        // const tableData1 = Object.entries(headerTitles1)
        //     .filter(([_, value]) => value)
        //     .map(([key, value]) => {
        //         const row = [];
        //         suffixies1.forEach(suffix1 => {

        //             if (suffix1 == 'parametro')
        //                 suffix1 = '';
        //             const colid = `${key}${suffix1}`;
        //             row.push(jsonData[colid] || "-");
        //         });
        //         const isEmptyRow = row.every(cell => cell === "-" || cell === null || cell === "");
        //         return isEmptyRow ? null : row; // Esclude la riga se tutti i campi sono vuoti
        //     })
        //     .filter(row => row !== null); // Rimuove le righe vuote

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
        // console.log('n1', n1);


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
        // console.log('n2', n2);

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
        // console.log('n3', n3);

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
        // console.log('n4',n4);
        let carLenght = 0;
        let carosello = [];
        const maxPhoto = 9;
        for (let i = 0; i < maxPhoto; i++) {
            if (jsonData[`carosello${i}`]) {
                carosello[i] = jsonData[`carosello${i}`];
                // console.log(carosello[i]);
                carLenght = i;
            }
        }
        //spaces
        let spacetab1 = calculateTableHeight(tableData, fontCalc, lineSpacCalc);
        let yGr1 = (spacetab1 / 6.5) * 2 + 35;
        let spacetab2 = 0;//calculateTableHeight(tableData1, fontCalc,lineSpacCalc);
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
        let space8 = space7 + doc1.getTextDimensions(princapp).h + 25;
        let cimgy = y + space1 + space2 + space3 + space4 + space5 + space6 + space7 + space8;
        let cimgy1 = y + space1 + space2 + space3 + space4 + space5 + space6 + space7 + space8;
        let d1 = ((wtot - (y + space1 + space2 + space3 + space4 + space5 + space6 + space7 + space8)) / carLenght) / 4;
        let wtottemp = ((wtot - (space1 + space2 + space3 + space4 + space5 + space6 + space7 + space8)) / carLenght) / 4;
        let cimgw = (((wtot / carLenght) * 3) / 4);
        let cimgw1 = (((wtot / carLenght) * 3) / 4);
        let cimgh = (cimgw * 1.5) / 2;
        let cimgh1 = cimgw1;
        let hgr2 = hgr1;// cimgh + 10;
        let space9 = doc1.getTextDimensions(princapp).h; // + 10;
        let space9_a = doc1.getTextDimensions(princapp).h * 2;
        let space9_a1 = (doc1.getTextDimensions(princapp).h + cimgh1) * 2;
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
        let space20 = 0;//5;
        let space21 = 5 + doc1.getTextDimensions(testoSottoGrafico1).h;
        let space22 = 7;
        let space22_1 = space22 * (n4 + 1);
        let space23 = 10;
        let space24 = doc1.getTextDimensions(testoSottoGrafico1).h;// + 10;
        const footerHeight = 40; // Altezza del piè di pagina


        console.log('tab', spacetab1, 'imgs', yGr1, yGr1 + 35);
        if (spacetab1 < yGr1) {
            spacetab1 = yGr1;// + 35;
            //if(company == '1'){
            spacetab1 -= 60;
            //}
        }
        else {
            if (company == '1') {
                spacetab1 -= 70;
            }
            else
                spacetab1 -= 40;

        }
        console.log('dopotab', spacetab1);

        if (company == '1') {
            y1 = + hgr1 + space1 + space2 + space3 + space4 + space5_1 + spacef + space6
                + space7 + space8 + space9 + spacetab1 + space10 + /**space12*/ + space13 + space14 + space15_1
                + space16 + space17 + space18 + space19_1 + space20 + space21 + space23 + space22_1 + footerHeight + 10;

        } else {
            if (company == '2') {
                y1 = + space1 + space2 + space3 + space4 + space5_1 + spacef + space6 + space9_a1
                    + space7 + space8 + space10 + spacetab1 + /**space12+ space13*/ + hgr2 + space16
                    + space17 + space18 + space21 + space21 + space21 + space22_1
                    + ((space9 + 10)) + footerHeight + 10 + space23;

            }
        }

        // console.log('y1', y1, footerY);
        const htot = y1; // + footerHeight;

        let doc = new jsPDF({
            orientation: "portrait",        // "landscape" per orizzontale
            unit: "mm",                     // Unità di misura ("mm", "cm", "in", "px")
            //format: [wtot, htot-10]       // Larghezza e altezza personalizzate in mm
            format: [wtot, y1]
        });

        let hGr = 60;
        let wGr = 60;

        //font                   
        doc.addFileToVFS("KohinoorLatin-Demi.ttf", base64Demi);
        doc.addFont("KohinoorLatin-Demi.ttf", "Demi", base64Demi, "normal");

        doc.addFileToVFS("KohinoorLatin-Demi2.ttf", base64Demi);
        doc.addFont("KohinoorLatin-Demi.ttf", "Demi2", base64Demi, "normal");

        doc.addFileToVFS("KohinoorLatin-Light.ttf", base64Demi);
        doc.addFont("KohinoorLatin-Demi.ttf", "Light", base64Demi, "normal");

        doc.addFileToVFS("KohinoorLatin-Light2.ttf", base64Demi);
        doc.addFont("KohinoorLatin-Demi.ttf", "Light2", base64Demi, "normal");

        // nome prodotto
        doc.setFontSize(25);
        doc.setFont("helvetica", "bold");
        doc.text(nome, x, y);

        // numero articolo (prodotto)
        doc.setFontSize(15)
        doc.setFont("helvetica", "normal");
        y += space1;

        doc.setFont("helvetica", "normal");
        doc.text(sku, x, y);

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
        if (img1 && fs.existsSync(img1)) {
            const imageData = fs.readFileSync(img1).toString('base64');
            doc.addImage(imageData, 'JPEG', 10, y, wPhoto, hPhoto);
        }
        let xleftPhoto = x + 75;
        let yleftPhoto = y + space3;

        // Testo lato foto 
        doc.setFontSize(8);
        doc.text(descr, xleftPhoto, yleftPhoto, { maxWidth: wtot - 100 });
        // console.log(doc.getTextDimensions(testoLatoFoto).h);
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
        doc.text(princapp, x, y, { maxWidth: wtot - 20 });
        y = y + space8;


        let cimgx = x;
        if (company == '1') {
            // console.log('d', d1);
            //  foto carosello            
            // console.log('n', carLenght, i);


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
            if (company == '2') {

                doc.setFontSize(12);
                doc.setFont("helvetica", "bold");

                doc.text(titoloSottoGrafico1_2, cimgx, cimgy - 4, { maxWidth: wtot - 20 });

                /*for(let ic1 = 0; ic1 <=carLenght; ic1++){
                    if(cimgx1 >= (wtot-20)/2){
                        cimgx1 = cimgx;
                        cimgy1 = cimgy1 + cimgh1 + spaceimg1; 
                    }
                    if(carosello[ic1] && fs.existsSync(carosello[ic1])){
                        var imgCar = fs.readFileSync(carosello[ic1]).toString('base64');
                        doc.addImage(imgCar, 'JPEG', cimgx1, cimgy1, cimgw1, cimgh1);                    
                    // aumento x dopo ogni img
                        cimgx1 += cimgw1 + d1;
                    }
                }
                y = y+ cimgh1 + space9_a;*/

                //  foto carosello            
                // console.log('n', carLenght, i);
                for (let ic = 0; ic <= carLenght; ic++) {
                    if (carosello[ic] && fs.existsSync(carosello[ic])) {
                        var imgCar = fs.readFileSync(carosello[ic]).toString('base64');
                        doc.addImage(imgCar, 'JPEG', cimgx, cimgy, cimgw, cimgh);
                        // aumento x dopo ogni img
                        cimgx += cimgw + d1;
                    }
                }
            }
        }
        y += space3;

        //titolo sopra tabella
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(titolo2, x, y);
        y = y + space10;

        const marginLeft = 10;

        const columnWidths = getOptimalColumnWidths(headers, tableData, doc);
        const tableWidth = columnWidths.reduce((totalWidth, width) => totalWidth + width, 0);

        // console.log('y prima di tabDat: ', y);

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
        let space11 = Math.ceil(doc.lastAutoTable.finalY) + 10;

        x += xT;
        // console.log('y dopo di tabDat: ', doc.lastAutoTable.finalY);
        //graficoLatoTabella
        let space = (Math.ceil(doc.lastAutoTable.finalY) / 6);
        //let xGr     =  25;
        let yGr = (Math.ceil(doc.lastAutoTable.finalY) / 6.5);

        if (img12 && fs.existsSync(img12)) {
            const imageData = fs.readFileSync(img12).toString('base64');
            doc.addImage(imageData, 'JPEG', x, y, xGr, yGr);
        }

        if (img13 && fs.existsSync(img13)) {
            const imageData = fs.readFileSync(img13).toString('base64');
            doc.addImage(imageData, 'JPEG', x, y + space, xGr, yGr);
        }

        //guardo fino a dove è arrivata la tabella

        let space11a = y + (yGr * 2) + 5;

        if (space11 <= space11a)
            space11 = space11a;

        // console.log(space11,space11a);
        y = space11;// + space12 ;
        // console.log(y)

        //agg. coordinate
        x = 10;
        let diff = 105;

        if (company == '1') {
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text(titoloSottoGrafico1, x, y, { maxWidth: wtot - 20 });
            diff = x + diff;
            if (company == '1')
                doc.text(titoloSottoGrafico2, diff, y, { maxWidth: wtot - 20 });
            y = y + space13;

            // "grafico"                 
            doc.setFontSize(10);
            //if(company == '1'){
            hGr = 40;
            if (img14 && fs.existsSync(img14)) {
                const imageData = fs.readFileSync(img14).toString('base64');
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
            //}
            y += hGr;
        }


        /*if(company == '2'){
            hGr = cimgh+10;
           
            cimgx = x;
            cimgy = y;
            //  foto carosello            
            // console.log('n', carLenght, i);
            for(let ic = 0; ic <=carLenght; ic++){
                if(carosello[ic] && fs.existsSync(carosello[ic])){
                    var imgCar = fs.readFileSync(carosello[ic]).toString('base64');
                    doc.addImage(imgCar, 'JPEG', cimgx, cimgy, cimgw, cimgh);    
                    doc.text('sn qui',x,y)                
                // aumento x dopo ogni img
                    cimgx += cimgw + d1;
                }
            }                    
        }*/


        //titolo sotto grafico
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text(titoloSottoGrafico3, x, y, { maxWidth: wtot - 20 });

        doc.setFontSize(9);
        y += space16;
        doc.setFont("helvetica", "normal");
        doc.text(testoSottoGrafico1, x, y, { maxWidth: wtot - 20 });

        if (company == '2') {
            let y2 = y + 10;
            for (let j = 0; j < 7; j++) {

                if (jsonData[`elencoPuntatoLatoGrafico${j}`]) {
                    doc.text(`• ` + elencop2[j], x, y2);
                    y2 += 4;
                }
            }

            y = y2 + space9;
        }

        y = y + space17;

        //titolo sotto grafico 2
        doc.setFont("helvetica", "bold");
        doc.text(titoloSottoGrafico4, x, y, { maxWidth: wtot - 20 });
        y += space18;
        doc.setFont("helvetica", "normal");

        //elencoPuntatoSottoGrafico    
        //if(company == '1'){
        for (let j = 4; j < 7; j++) {
            if (elencop3[j]) {
                doc.text(`• ` + elencop3[j], x, y);
                y += space19;
            }
        }

        y += 4;

        // }else{
        //  if(company == '2'){
        // console.log('y prima di tabDat1: ', y);
        /*const columnWidths1 = getOptimalColumnWidths(headers1, tableData1, doc);      
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
    }); */
        // y = Math.ceil(doc.lastAutoTable.finalY)+10;
        // }
        // }
        // console.log('y dopo di tabDat1: ', y);

        // if(spacetab1 < yGr1){
        //  y += yGr1;
        // }else{
        // y = Math.ceil(doc.lastAutoTable.finalY)+10;
        // }
        doc.setFont("helvetica", "normal");
        if (company == '2') {

            doc.text(testoSottoGrafico1, x, y, { maxWidth: wtot - 20 });
            y = y + space21;
        }
        //titolo sotto grafico 2                
        doc.setFont("helvetica", "bold");
        doc.text(titoloSottoGrafico5, x, y, { maxWidth: wtot - 20 });


        doc.setFont("helvetica", "normal");

        if (company == '2') {
            y = y + space21;
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
        y += space23;
        //testo sotto grafico 2
        doc.setFontSize(7);
        doc.text(testoSottoGrafico1, x, y1 - footerHeight - 5, { maxWidth: wtot - 20 });
        y += space24;

        // console.log('y finale: ', y);
        // console.log('y1 totale: ', y1);

        doc.setTextColor(255, 255, 255); // Colore bianco per il testo
        doc.setFontSize(10);

        /**
         * stampa pie di pagina*/
        if (piedipagina && fs.existsSync(piedipagina)) {
            const imageData = fs.readFileSync(piedipagina).toString('base64');
            console.log("stampa pie di pagina");
            doc.addImage(imageData, 'JPEG', 0, y1 - footerHeight, wtot, footerHeight);
        }


        //sku+it
        // delete path('provaPdf.pdf');
        // doc.save('provaPdf.pdf');
        doc.save(`${jsonData.sku}_IT.pdf`);
        // console.log(`✅ PDF salvato `);
        //console.log(`✅ PDF salvato su: ${pdfPath}`);
        // }

    } catch (error) {
        console.error("Errore nel parsing del JSON:", error);
    }
}
// );
// }

console.log('Call Function for the creation of the PDF file..')
// createPdfFromJsonFile(jsonFilePath, jsonFIlePath2);


// function leggiFile(sku) {
//     try {
//         var scheda64;
//         const schedaBuffer = fs.readFile(`${sku}_IT.pdf`, (err, data) => {
//             if (err) {
//                 throw err;
//             } else {
//                 scheda64 = schedaBuffer.toString('base64');
//             }
//         });
//         return scheda64;
//     } catch (err) {
//         console.error(err);
//     }
// }

async function leggiFile(sku) {
    try {
      const data = await fs.promises.readFile(`${sku}_IT.pdf`);
      const scheda64 = data.toString('base64');
      return scheda64;
    } catch (err) {
      console.error(err);
      throw err; // Rilancia l'errore per gestirlo esternamente
    }
  }

app.post('/pdf_generator', async (req, res) => {
    try {
        const prod = req.body;
        createPdfFromJsonFile(prod, jsonFIlePath2);
        // createPdfFromJsonFile(jsonFilePath, jsonFIlePath2);
        // console.log(prod);
        var sku = prod.sku;
        var company = prod.company;
        var category = prod.category;
        var scheda = await leggiFile(sku);
        var schedaObj = {
            sku: sku,
            company: company,
            category: category,
            scheda_tecnica: scheda
        }
        console.log(schedaObj, 'LA SCHEDA');
        const result = await db('schede_tecniche').insert(schedaObj);
        res.json({ success: true, message: 'insert successful' });
        console.log(result)
    }
    catch (e) {
        console.error(e);
    }
})

// app.post('/post_pdf', async (req, res) => {
//     try {
//         const prod = req.body;
//         var sku = prod.sku;
//         var company = prod.company;
//         var category = prod.category;
//         // var scheda = fs.readFile(`${sku}_IT.pdf`, 'base64');
//         var scheda = await leggiFile(sku);
//         var schedaObj = {
//             sku: sku,
//             company: company,
//             category: category,
//             scheda_tecnica: scheda
//         }
//         console.log(schedaObj, 'LA SCHEDA');
//         // fs.unlinkSync(`${sku}_IT.pdf`);
        // eliminaFile(`${sku}_IT.pdf`);
//         const result = await db('schede_tecniche').insert(schedaObj);
//         // console.log(result.toString());
//         res.json({ success: true, message: 'insert successful' });
//         console.log(result);
//     } catch (e) {
//         console.error(e);
//     }
// })

/**CONVERSIONE BINARIO -- JPEG per pdf
 *
 * function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

const binaryImageFromJson = // Qui il dato binario dell'immagine ;
const base64String = arrayBufferToBase64(binaryImageFromJson);
const base64Image = `data:image/png;base64,${base64String}`;

const doc = new jsPDF();
doc.addImage(base64Image, 'PNG', 10, 10, 50, 50);
doc.save("documento.pdf");

 */



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