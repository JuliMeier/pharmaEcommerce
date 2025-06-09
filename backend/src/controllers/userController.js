import bcrypt from 'bcryptjs'
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

  try {
    const { name, lastName, email, password, roleId } = req.body

    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ error: 'Email ya registrado' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      name,
      lastName,
      email,
      password: hashedPassword,
      roleId: roleId || 1
    })
    res.status(201).json({ message: 'Usuario creado correctamente', user })
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' })
  }


}

export const updateUser = async (req, res) => {
  try {
    const { name, lastName, email, password, roleId } = req.body
    const user = await User.findByPk(req.params.id)
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })
    let updatedFields = { name, lastName, email, roleId }
    if (password) {
      updatedFields.password = await bcrypt.hash(password, 10);
    }
    await user.update(updatedFields)
    const userSafe = { ...user.dataValues }
    delete userSafe.password
    res.json({ user: userSafe, message: 'Usuario actualizado correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } })

    if (deleted) {
      res.json({ message: 'Usuario eliminado' })
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' })
  }
}

export const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findByPk(req.params.id);

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "La contraseña actual es incorrecta" });
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedNewPassword;

  await user.save();

  res.json({ message: "Contraseña actualizada" });
};