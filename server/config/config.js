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
    //mongodb+srv://txutxi:QRxn2wjEyXSs8pdY@cluster0-hkh3g.mongodb.net/cafe?retryWrites=true&w=majority
    urlDB = 'mongodb+srv://cafe-user:fap123456@cluster0-hkh3g.mongodb.net/cafe?retryWrites=true&w=majority'
}

process.env.urlDB = urlDB;