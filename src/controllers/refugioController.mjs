import * as refugioService from '../services/refugioService.mjs';

export async function obtenerRefugiosController(req, res) {
    try {
        const refugios = await refugioService.obtenerRefugios();
        res.json(refugios);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener refugios', error: error.message });
    }
}

export async function crearRefugioController(req, res) {
    try {
        const nuevo = await refugioService.crearRefugio(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear refugio', error: error.message });
    }
}

export async function obtenerRefugioPorIdController(req, res) {
    try {
        const refugio = await refugioService.obtenerRefugioPorId(req.params.id);
        if (!refugio) return res.status(404).json({ mensaje: 'Refugio no encontrado' });
        res.json(refugio);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener refugio', error: error.message });
    }
}

export async function actualizarRefugioController(req, res) {
    try {
        const actualizado = await refugioService.actualizarRefugio(req.params.id, req.body);
        if (!actualizado) return res.status(404).json({ mensaje: 'Refugio no encontrado' });
        res.json(actualizado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar refugio', error: error.message });
    }
}

export async function eliminarRefugioController(req, res) {
    try {
        const eliminado = await refugioService.eliminarRefugio(req.params.id);
        if (!eliminado) return res.status(404).json({ mensaje: 'Refugio no encontrado' });
        res.json({ mensaje: 'Refugio eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar refugio', error: error.message });
    }
}