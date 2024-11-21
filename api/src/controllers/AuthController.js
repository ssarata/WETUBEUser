import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwtUtils.js';


export default class AuthController {

    async register(req, res) {
        const { email, password } = req.body;
        try {
            // Vérifiez si l'utilisateur existe déjà
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) return res.status(400).json({ message: 'User already exists' });
    
            // Hachez le mot de passe
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Créez l'utilisateur
            const user = await prisma.user.create({
                data: { email, password: hashedPassword }
            });
    
            // Générez un token
            const token = generateToken(user);
            res.status(201).json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) return res.status(400).json({ message: 'Invalid email or password' });
    
            // Vérifiez le mot de passe
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) return res.status(400).json({ message: 'Invalid email or password' });
    
            // Générez un token
            const token = generateToken(user);
            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}