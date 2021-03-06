const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const app = express();

//______________________________________________________________________
//OBTENER LISTADO DE USUARIOS (limite y desde)
//______________________________________________________________________
app.get('/usuario', verificaToken, (req, res) => {

    // return res.json({
    //     usuario: req.usuario,
    //     nombre: req.usuario.nombre,
    //     email: req.usuario.email
    // });


    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);

    //Usuario.find({ google: true }) //Para filtrado
    Usuario.find({ estado: true }, 'nombre email role estado google')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            //Usuario.count({ google: true }, (err, conteo) => { //Para filtrado
            Usuario.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });
            });

        });
});

//______________________________________________________________________
//CREANDO UN USUARIO
//______________________________________________________________________
app.post('/usuario', [verificaToken, verificaAdmin_Role], function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

//______________________________________________________________________
//ACTUALIZANDO EL USUARIO
//______________________________________________________________________
app.put('/usuario/:id', [verificaToken, verificaAdmin_Role], function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    // delete body.password;
    // delete body.google;


    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }


        res.json({
            ok: true,
            usuario: usuarioDB
        });


    });


});



//______________________________________________________________________
//BORRADO ACTUALIZANDO EL ESTADO
//______________________________________________________________________
app.delete('/usuario/:id', [verificaToken, verificaAdmin_Role], function(req, res) {

    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    };

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true, runValidators: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (usuarioBorrado === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    mensaje: 'Usuario no encontrado'
                }
            });
        }


        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });

});

//______________________________________________________________________

//______________________________________________________________________
//BORRADO ELIMINADO EL REGISTRO
//______________________________________________________________________
// app.delete('/usuario/:id', function(req, res) {

//     let id = req.params.id;

//     Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
//         if (err) {
//             return res.status(400).json({
//                 ok: false,
//                 err
//             });
//         }

//         if (usuarioBorrado === null) {
//             return res.status(400).json({
//                 ok: false,
//                 err: {
//                     mensaje: 'Usuario no encontrado'
//                 }
//             });
//         }


//         res.json({
//             ok: true,
//             usuario: usuarioBorrado
//         });

//     });

// });

//______________________________________________________________________




module.exports = app;