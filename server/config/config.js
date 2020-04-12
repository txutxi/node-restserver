/* ----------------------
PUERTO (por defecto 7226)
---------------------- */
process.env.PORT = process.env.PORT || 7226;

/* ---------------------------------
   ENTORNO (desarrollo / produccion)
---------------------------------- */

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'


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