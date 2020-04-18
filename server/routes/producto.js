const express = require('express');

const { verificaToken } = require('../middlewares/autenticacion');

let app = express();

let Producto = require('../models/producto');



//------------------------------------
//---Obtener Todos los productos -----
//-- Populate: usuario y categoría ---
//-- paginado
//------------------------------------
app.get('/producto', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    //let limite = req.query.limite || 10;
    //limite = Number(limite);

    Producto.find({ disponible: true })
        .skip(desde)
        .limit(5)
        //.limit(limite)
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                productos: productos
            });

        });

});

//-------------------------------------
//---Obtener por ID--------------------
//-- Populate: usuario y categoría ----
//-------------------------------------
app.get('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    //let body = req.body;

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    message: 'Producto no encontrado'
                });
            }

            res.json({
                ok: true,
                producto: productoDB
            });

        });

});

//-------------------------------------
//---Buscar productos------------------
//-- Populate: usuario y categoría ----
//-------------------------------------
app.get('/producto/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'descripcion')
        .sort('nombre')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                productos: productos
            });

        });


});


//-------------------------
//----------Crear----------
//-------------------------
app.post('/producto', verificaToken, (req, res) => {
    //req.usuario._id

    let body = req.body;

    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        });
    });

});

//-------------------------
//----------Actualizar-----
//-------------------------
app.put('/producto/:id', verificaToken, (req, res) => {
    //req.usuario._id
    let id = req.params.id;
    let body = req.body;

    //Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {

    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.descripcion = body.descripcion;
        productoDB.categoria = body.categoria;
        productoDB.disponible = body.disponible;

        productoDB.save((err, productoGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoGuardado
            });

        });

    });


});

//-------------------------
//-------Borrar------------
//-------------------------
app.delete('/producto/:id', verificaToken, (req, res) => {
    //req.usuario._id
    let id = req.params.id;

    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no disponible'
                }
            });
        }

        productoDB.disponible = false;

        productoDB.save((err, productoBorrado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                producto: productoBorrado,
                message: 'Producto borrado'
            });

        });


    });
});




module.exports = app;