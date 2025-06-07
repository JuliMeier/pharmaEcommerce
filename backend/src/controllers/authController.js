import dotenv from 'dotenv'
dotenv.config()
import { User } from '../models/User.js'
import { Role } from '../models/Role.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const JWT_SECRET = process.env.JWT_SECRET

export const createAccount = async (req, res) => {

    try {
        const {name, lastName, address, email, password, roleId} = req.body;

        const existingUser = await User.findOne({ where: { email } })

        if (existingUser) return res.status(400).json({ message: 'Email ya registrado' })

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({ 
            name, 
            lastName,
            address,
            email, 
            password: hashedPassword, 
            roleId: roleId || 1 
        })

        res.status(201).json({message: 'Usuario registrado con exito'})

    } catch (error) {
        console.error('Error en registerUser:', error)
        res.status(500).json({error: 'Error al registrar el usuario'})
    }

}

export const loginUser = async (req, res) => {

    try {
        const {email, password} = req.body

        const user = await User.findOne({ 
            where: { email },
            include: { model: Role, attributes: ['name'] }
        })
        

        if(!user) return res.status(404).json({error: 'Usuario no encontrado'})

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' })
         
        const token = jwt.sign({ id: user.id, roleId: user.roleId },JWT_SECRET,{ expiresIn: '1d' })
       

        res.json({ message: 'Login exitoso',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.Role.name
            }
        })
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' })
    }
    
}