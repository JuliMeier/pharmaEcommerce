
import { db } from '../src/config/db.js'
import { Category } from '../src/models/Category.js'
import { Product } from '../src/models/Product.js'


const categories = [
  { id: 1, title: "Cuidado Personal" },
  { id: 2, title: "Cuidados Generales" },
  { id: 3, title: "Maquillaje" },
  { id: 4, title: "Perfume" },
  { id: 5, title: "Accesorios" },
  { id: 6, title: "Mundo Bebé" },
  { id: 7, title: "Regaleria" }
]

const products = [
  {
    title: "Emulsión Corporal Hidratante PERPIEL EMULSION X400 GR",
    price: 12000.00,
    stock: 100,
    available: true,
    description: "Emulsión corporal hidratante para piel seca y sensible.",
    imgUrl: "https://cdn.batitienda.com/baticloud/images/product_31d448c821734def9c6d5b7916a50f4b_637302460074099473_0_m.jpg",
    favorite: true,
    categoryId: 1
  },
  {
    title: "Base de Maquillaje Rimmel Matte Foundation x 30 ml",
    price: 42000.00,
    stock: 100,
    available: true,
    description: "Base de maquillaje para piel normal a aceitosa.",
    imgUrl: "https://farmacityar.vtexassets.com/arquivos/ids/235418-1200-auto?v=638101037834770000&width=1200&height=auto&aspect=true",
    favorite: false,
    categoryId: 2
  },
    {
    title: "Desodorante Dove Men Clin Cr Sotf Solid x 58 g",
    price: 4500.00,
    stock: 20,
    available: true,
    description: "Desodorante para hombres con sabor a frutas.",
    imgUrl: "https://farmacityar.vtexassets.com/arquivos/ids/264359-1200-auto?v=638757625211370000&width=1200&height=auto&aspect=true",
    favorite: false,
    categoryId: 2
  },
    {
    title: "Máscara de Pestañas Maybelline Lash Sensational Sky High Cosmic",
    price: 22000.00,
    stock: 15,
    available: true,
    description: "Máscara de pestañas para dar volumen y longitud a las pestañas.",
    imgUrl: "https://farmacityar.vtexassets.com/arquivos/ids/257019-1200-auto?v=638537061641170000&width=1200&height=auto&aspect=true",
    favorite: false,
    categoryId: 3
  },
    {
    title: "Base de Maquillaje L'Oréal París True Match Tono Beige Creme x 30 ml",
    price: 29000.00,
    stock: 8,
    available: true,
    description: "Base de maquillaje para piel normal a aceitosa.",
    imgUrl: "https://farmacityar.vtexassets.com/arquivos/ids/257062-1200-auto?v=638537142896530000&width=1200&height=auto&aspect=true",
    favorite: false,
    categoryId: 4
  },
    {
    title: "Protector Térmico Tresemmé Spray x 120 ml",
    price: 12000.00,
    stock: 14,
    available: true,
    description: "Protector térmico para cabello para protegerlo de la temperatura del secador.",
    imgUrl: "https://farmacityar.vtexassets.com/arquivos/ids/260255-1200-auto?v=638618280724670000&width=1200&height=auto&aspect=true",
    favorite: false,
    categoryId: 5
  },
  
]

 export async function seedCategoriesAndProducts(){
  try {

    await Category.bulkCreate(categories, {ignoreDuplicates: true});
    await Product.bulkCreate(products, {ignoreDuplicates: true});

    console.log("Categorías y productos cargados exitosamente.")

  } catch (error) {
    console.error("Error al cargar categorías y productos:", error);
  }
 }


  

