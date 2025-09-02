import jwt from 'jsonwebtoken';
import Role from '../models/Role.mjs';

export const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id, role: decoded.role, tipo: decoded.tipo };
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido' });
    }
    };

    export const hasPermission = (requiredPermission) => {
    return async (req, res, next) => {
        try {
        if (!req.user) {
            return res.status(401).json({ message: 'No autenticado' });
        }

        const role = await Role.findById(req.user.role).populate('permissions');
        if (!role) {
            return res.status(403).json({ message: 'Rol no encontrado' });
        }

        const has = role.permissions.some(p => p.name === requiredPermission);
        if (!has) {
            return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
        }

        next();
        } catch (err) {
        res.status(500).json({ message: 'Error en el servidor' });
        }
    };
};
