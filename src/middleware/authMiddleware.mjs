import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/UserRepository.mjs';
import RoleRepository from '../repositories/RoleRepository.mjs';

// Middleware para verificar el token JWT
export const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserRepository.findById(decoded.id);
        if (!user) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        req.user = { id: user._id, role: user.role, tipo: user.tipo };
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token inválido' });
    }
};

// Middleware para verificar permisos según el rol del usuario
export const hasPermission = (requiredPermission) => {
    return async (req, res, next) => {
        try {
        if (!req.user) {
            return res.status(401).json({ message: 'No autenticado' });
        }

        const role = await RoleRepository.findById(req.user.role);
        if (!role) {
            return res.status(403).json({ message: 'Rol no encontrado' });
        }

        const has = role.permissions.some(
            (perm) => perm.name === requiredPermission
        );

        if (!has) {
            return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
        }

        next();
        } catch (err) {
        res.status(500).json({ message: 'Error en el servidor' });
        }
    };
};
