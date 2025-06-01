import { User } from '../src/models/User.js'
import { Role } from '../src/models/Role.js'
import { db } from '../src/config/db.js'
import bcrypt from 'bcryptjs'


export async function seedUsers(){

  try {

    
const adminHashedPassword = await bcrypt.hash('admin123', 10)
const superadminHashedPassword = await bcrypt.hash('superadmin123', 10)

const adminRole = await Role.findOne({ where: { name: 'admin' } })

const superadminRole = await Role.findOne({ where: { name: 'superadmin' } })


console.log('adminRole:', adminRole);
console.log('superadminRole:', superadminRole);

if (!adminRole || !superadminRole) {
  throw new Error('Roles admin o superadmin no existen. Crea los roles antes de los usuarios.')
}

await User.findOrCreate({
  where: { email: 'admin@admin.com' },
  defaults: {
    name: 'Admin',
    lastName: 'User',
    address: 'Oficina Central',
    password: adminHashedPassword,
    roleId: adminRole.id 
  }
})

await User.findOrCreate({
  where: { email: 'superadmin@admin.com' },
  defaults: {
    name: 'Super',
    lastName: 'Admin',
    address: 'Oficina Central',
    password: superadminHashedPassword,
    roleId: superadminRole.id 
  }
})

console.log('Usuarios admin y superadmin creados')


  } catch (error) {
    console.error("Error al cargar usuarios:", error);
  }


}



