const express = require('express');
const router = express.Router();
const Promocion = require('../models/promocion');

// Obtener todas las promociones
router.get('/promociones', async (req, res) => {
  try {
    const promociones = await Promocion.find();
    res.json(promociones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener una promoción por su ID
router.get('/promociones/:id', getPromocion, (req, res) => {
  res.json(res.promocion);
});

// Crear una nueva promoción
router.post('/promociones', async (req, res) => {
  const promocion = new Promocion({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    fechaInicio: req.body.fechaInicio,
    fechaFin: req.body.fechaFin,
    descuento: req.body.descuento,
    condiciones: req.body.condiciones
  });

  try {
    const nuevaPromocion = await promocion.save();
    res.status(201).json(nuevaPromocion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar una promoción existente
router.put('/promociones/:id', getPromocion, async (req, res) => {
  // Actualizar solo los campos que se envían en la solicitud
  if (req.body.nombre != null) {
    res.promocion.nombre = req.body.nombre;
  }
  if (req.body.descripcion != null) {
    res.promocion.descripcion = req.body.descripcion;
  }
  // Actualizar otros campos según sea necesario

  try {
    const promocionActualizada = await res.promocion.save();
    res.json(promocionActualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar una promoción
router.delete('/promociones/:id', getPromocion, async (req, res) => {
  try {
    await res.promocion.remove();
    res.json({ message: 'Promoción eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware para obtener una promoción por su ID
async function getPromocion(req, res, next) {
  let promocion;
  try {
    promocion = await Promocion.findById(req.params.id);
    if (promocion == null) {
      return res.status(404).json({ message: 'Promoción no encontrada' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.promocion = promocion;
  next();
}

module.exports = router;
