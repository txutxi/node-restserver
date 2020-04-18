const mongoose = require('mongoose')
    //const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    descripcion: {
        type: String,
        unique: true,
        required: [true, 'La descripcion de la categoría es necesaria']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

// categoriaSchema.methods.toJSON = function() {
//     let categoria = this;
//     let categoriaObject = categoria.toObject();

//     return categoriaObject;
// }

//categoriaSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unica' });



module.exports = mongoose.model('Categoria', categoriaSchema);



// const mongoose = require('mongoose')
// const Schema = mongoose.Schema;

// let categoriaSchema = new Schema({
//     descripcion: { type: String, unique: true, required: [true, 'La descripción es obligatoria'] },
//     usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
// });


// module.exports = mongoose.model('Categoria', categoriaSchema);