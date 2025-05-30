import { Role } from '../src/models/Role.js'
import { db } from '../src/config/db.js'



const roles = ['client', 'admin', 'superadmin']

export async function seedRoles(){
    try {

        for (const name of roles) {
        await Role.findOrCreate({ where: { name } })
    }

    const allRoles = await Role.findAll();
    console.log('Roles en la base de datos:', allRoles.map(r => r.name));
    console.log('Roles creados')

    } catch (error) {
    console.error("Error al cargar roles:", error);
    }
}

