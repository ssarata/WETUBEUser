import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwtUtilis.js';
import * as status from "../constantes/httpStatus.js";
import UserService from '../services/UserService.js';


export default class AuthController {

    userService;

    constructor(){
        this.userService = new UserService();
    }

    async register(req, res) {
        const { email, password } = req.body;
        try {
            // Vérifiez si l'utilisateur existe déjà
            const existingUser = await this.userService.filterByEmail(email);
            if (existingUser) return res.status(400).json({ message: 'User already exists' });
    
            // Hachez le mot de passe
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Créez l'utilisateur
            const user = await this.userService.create({ email, password: hashedPassword });
    
            // Générez un token
            const token = generateToken(user);
            res.status(status.HTTP_201_CREATE).json({ token });
        } catch (error) {
            console.log(error);
            res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
        }
    }
    
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await this.userService.filterByEmail(email);
            if (!user) return res.status(400).json({ message: 'Invalid email or password' });
    
            // Vérifiez le mot de passe
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) return res.status(400).json({ message: 'Invalid email or password' });
    
            // Générez un token
            const token = generateToken(user);
            res.status(status.HTTP_200_OK).json({ token });
        } catch (error) {
            console.log(error);
            res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
        }
    }
}