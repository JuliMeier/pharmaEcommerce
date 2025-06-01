import { seedCategoriesAndProducts } from './seedData.js'
import { seedOrderStatus } from './seedOrderStatus.js'
import { seedRoles } from './seedRoles.js'
import { seedUsers} from './seedUsers.js'
import { db } from '../src/config/db.js'

async function runAllSeeders(){
    console.log('Ejecutando seeders....')
    
    await seedRoles();
    await seedOrderStatus();
    await seedCategoriesAndProducts();
    await seedUsers();
    console.log('Seeders ejecutados con éxito')
}

runAllSeeders();