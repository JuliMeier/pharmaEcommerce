import { OrderStatus } from '../src/models/OrderStatus.js'
import { db } from '../src/config/db.js'


const statuses = ['pendiente', 'en curso', 'finalizado', 'cancelado']

export async function seedOrderStatus(){
    try {
        for (const status of statuses) {
        await OrderStatus.findOrCreate({ where: { status } })
        }
        console.log('Estados de orden cargados')
    } catch (error) {
        console.error('Error al cargar estados de orden:', error)
    }
}
