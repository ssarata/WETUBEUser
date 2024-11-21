import jwt from 'jsonwebtoken';

const JWT_SECRET = 'votre_secret_jwt'; // Stockez ce secret en environnement

export function generateToken(user) {
    return jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}
