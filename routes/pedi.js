const express = require("express");
const router = express.Router();
const pedidoSchema = require("../models/pedi");

// Validación de datos de entrada para la creación de pedidos
const validatePedidoCreation = [
  body("producto").notEmpty().isString(),
  body("cantidad").notEmpty().isNumeric(),
  body("cliente").notEmpty().isString(),
  // Otras validaciones que puedas necesitar
];

// Método post para crear nuevos pedidos
router.post("/pedi", validatePedidoCreation, (req, res) => {
  const pedidos = new pedi(req.body);
  pedidos
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// Método get para obtener todos los pedidos
router.get("/pedi", (req, res) => {
  pedidoSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Método get para encontrar la información mediante el id
router.get("/pedi/:id", param("id").isMongoId(), (req, res) => {
  const { id } = req.params;
  pedidoSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// Método put para actualizar un pedido
router.put("/pedi/:id", (req, res) => {
    const { id } = req.params;
    const { fecha_pedido, tipo_servicio, estado, articulos } = req.body;
    pedidoSchema.updateOne({_id:id}, {$set:{item, price, quantity, date}})
      .then((data) => res.json({mensaje:"Objeto actualizado"}))
      .catch((error) => res.json({mensaje:error}))
  });

// Método eliminar un pedido
router.delete("/pedido/:id", param("id").isMongoId(), (req, res) => {
  const { id } = req.params;
  pedidoSchema
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Pedido no encontrado" });
      }
      res.json({ message: "Pedido eliminado exitosamente" });
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;
