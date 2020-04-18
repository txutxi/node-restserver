const express = require('express');
let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let app = express();

let Categoria = require('../models/categoria');

//-----------------------------------
//---Obtener Todas categorias--------
//-----------------------------------
app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                categorias: categorias
            });

        });

});

//-------------------------
//---Obtener por ID--------
//-------------------------
app.get('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    //let body = req.body;

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                message: 'Categoría no obtenida'
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });


    });

});

//-------------------------
//----------Crear----------
//-------------------------
app.post('/categoria', verificaToken, (req, res) => {
    //req.usuario._id

    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            categoria: categoriaDB
        });
    });

});

//-------------------------
//----------Actualizar-----
//-------------------------
app.put('/categoria/:id', verificaToken, (req, res) => {
    //req.usuario._id
    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    };
    // console.log(req);
    // console.log(body);
    // console.log(id);

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });

});

//-------------------------
//-------Borrar------------
//-------------------------
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    //req.usuario._id
    let id = req.params.id;

    let body = req.body;


    Categoria.findByIdAndRemove(id, (err, categoriaBorrada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No existe la categoría'
                }
            });
        }

        res.json({
            ok: true,
            //categoria: categoriaBorrada
            message: 'Categoria borrada'
        });
    });
});







module.exports = app;