import { User } from '../models/User.js'
import { Role } from '../models/Role.js'

export const getUsers = async (req, res) => {
  const users = await User.findAll({ include: Role })
  res.json(users)
}

export const getUserById = async (req, res) => {
  const user = await User.findByPk(req.params.id, { include: Role })
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })
  res.json(user)
}

export const createUser = async (req, res) => {
  const { name, email, password, roleId } = req.body
  const user = await User.create({ name, email, password, roleId })
  res.status(201).json(user)
}

export const updateUser = async (req, res) => {
    const { name, email, password, roleId } = req.body
    const user = await User.update(req.params.id, { name, email, password, roleId })
    res.json(user)
}

export const deleteUser = async (req, res) => {
    const user = await User.destroy(req.params.id)
    res.json({ message: 'Usuario eliminado' })
}