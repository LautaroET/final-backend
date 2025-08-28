import Mascota from '../models/Mascota.mjs';
import Refugio from '../models/Refugio.mjs';
import SolicitudAdopcion from '../models/SolicitudAdopcion.mjs';
import SolicitudDarEnAdopcion from '../models/SolicitudDarEnAdopcion.mjs';

export const obtenerEstadisticasController = async (_req, res) => {
  try {
    const [
      totalMascotas,
      adoptadas,
      enAdopcion,
      totalRefugios,
      solicitudesAdopcion,
      solicitudesDarEnAdopcion
    ] = await Promise.all([
      Mascota.countDocuments(),
      Mascota.countDocuments({ status: 'Adoptado' }),
      Mascota.countDocuments({ status: 'En adopción' }),
      Refugio.countDocuments(),
      SolicitudAdopcion.countDocuments(),
      SolicitudDarEnAdopcion.countDocuments()
    ]);

    res.json({
      mascotas: {
        total: totalMascotas,
        adoptadas,
        enAdopcion
      },
      refugios: totalRefugios,
      solicitudes: {
        adopcion: solicitudesAdopcion,
        darEnAdopcion: solicitudesDarEnAdopcion
      }
    });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener estadísticas', error: err.message });
  }
};