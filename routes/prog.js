const express = require('express');
const router = express.Router();
const Programacion = require('../models/programacion');

// Obtener todas las programaciones
router.get('/programaciones', async (req, res) => {
  try {
    const programaciones = await Programacion.find();
    res.json(programaciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener una programación por su ID
router.get('/programaciones/:id', getProgramacion, (req, res) => {
  res.json(res.programacion);
});

// Crear una nueva programación
router.post('/programaciones', async (req, res) => {
  const programacion = new Programacion({
    cliente_id: req.body.cliente_id,
    fecha_recogida: req.body.fecha_recogida,
    hora_recogida: req.body.hora_recogida,
    fecha_entrega: req.body.fecha_entrega,
    hora_entrega: req.body.hora_entrega
  });

  try {
    const nuevaProgramacion = await programacion.save();
    res.status(201).json(nuevaProgramacion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar una programación existente
router.put('/programaciones/:id', getProgramacion, async (req, res) => {
  // Lógica para actualizar campos según se requiera
  try {
    const programacionActualizada = await res.programacion.save();
    res.json(programacionActualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar una programación
router.delete('/programaciones/:id', getProgramacion, async (req, res) => {
  try {
    await res.programacion.remove();
    res.json({ message: 'Programación eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware para obtener una programación por su ID
async function getProgramacion(req, res, next) {
  let programacion;
  try {
    programacion = await Programacion.findById(req.params.id);
    if (programacion == null) {
      return res.status(404).json({ message: 'Programación no encontrada' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.programacion = programacion;
  next();
}

module.exports = router;
