/* ----------------------
PUERTO (por defecto 7226)
---------------------- */
process.env.PORT = process.env.PORT || 7226;

/* ---------------------------------
   ENTORNO (desarrollo / produccion)
---------------------------------- */

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


/* ---------------------------------
   Vencimiento de Token
    60 Segundos
    60 Minutos
    24 Horas
    30 Días
---------------------------------- */
process.env.CADUCIDAD_TOKEN = '48h'; // 60 * 60 * 24 * 30;

/* ---------------------------------
   Semilla del Token
---------------------------------- */
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';




/* ---------------------------------
   BASE DATOS (desarrollo / produccion)
---------------------------------- */

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.urlDB = urlDB;


/* ---------------------------------
   GOOGLE CLIENT ID
---------------------------------- */
process.env.CLIENT_ID = process.env.CLIENT_ID || '219891519516-o4c1ihl03iti4j3lc3nn15d208imovre.apps.googleusercontent.com';