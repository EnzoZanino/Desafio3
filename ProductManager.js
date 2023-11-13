// const fs = require("node:fs")
import fs from "fs"

class ProductManager {
  constructor(fileName) {
		this.path = fileName;
		this.id = 0;
		if (fs.existsSync(this.path)) {
			try {
				const fileText = fs.readFileSync(this.path, "utf-8");
				this.products = JSON.parse(fileText);
			} catch {
				this.products = [];
			}
		} else {
			this.products = [];
		}
	}

  async saveProduct() {
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, "\t"),
        "utf-8"
      );
    } catch (error) {
      console.log(`[ERROR] ${error}`);
    }
  }

  getProducts() {
    return this.products
    // console.log(this.products);
  }

  getProductById(id) {
    let prodPorId = this.products.find((prod) => prod.id === id)
    console.log(prodPorId)
    return prodPorId
  }

  async addProduct(product) {
    const prodFinded = this.products.find((t) => t.code === product.code);

    if (prodFinded) {
      console.log("[ERROR] Producto buscado already exist");
    } else {
      const newProduct = { ...product, id: ++this.id };
      this.products.push(newProduct);

      await this.saveProduct();
    }
  }

  async deleteProduct(id) {
    const productSelected = this.products.find((p) => p.id == id);

    if (productSelected) {
      const newProductsArray = this.products.filter((p) => p.id != id);

      this.products = newProductsArray;

      await this.saveProduct();
    } else {
      console.log("[ERROR en deleteProduct]");
    }
  }

  async updateProduct(id , propsMod) {
    let productAModificar = this.products.find((p) => p.id == id);
    console.log(productAModificar)
    
    if (productAModificar !== undefined) {
      if(!propsMod.id) {
        console.log("no existe id")
      } else {
        console.log(`No se puede modificar el id --> "id": ${propsMod.id} se borrara esta prop para mantener la que tiene`)
        delete propsMod.id
      }
      
      const newProductsArray = this.products.filter((p) => p.id != id);
      this.products = newProductsArray;
      
      let prodFinal = {...productAModificar, ...propsMod}
      
      this.products.push(prodFinal)
      await this.saveProduct();
    } else {
      console.log("[ERROR delete en updateProduct]");
    }
  }
}

class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    (this.title = title), (this.description = description), (this.price = price), (this.thumbnail = thumbnail), (this.code = code), (this.stock = stock);
  }
}

//  🔨🔧 PRUEBAS DE FUNCIONAMIENTO 🔧🔨 // 🔨🔧 PRUEBAS DE FUNCIONAMIENTO 🔧🔨 // 🔨🔧 PRUEBAS DE FUNCIONAMIENTO 🔧🔨 //

/* async function pruebaFuncionamiento() {
  const manager = new ProductManager("./products.json");
  
  await manager.addProduct(new Product("Microfono Blue Yeti", "Microfono con gran calidad de captura y transmision de sonido", 240, "https://http2.mlstatic.com/D_NQ_NP_993032-MLA51056198917_082022-O.webp", "gbe330", 25));
  await manager.addProduct(new Product("Auriculares Noga", "Auriculares inalamrbicos de calidad", 160, "https://www.sevenelectronics.com.ar/images/000779813771393377614600-750-NG-BT-469-RJ.jpg", "zxy987", 34))
  
  await manager.deleteProduct(1)
  
  await manager.addProduct(new Product("Microfono Blue Yeti", "Microfono con gran calidad de captura y transmision de sonido", 240, "https://http2.mlstatic.com/D_NQ_NP_993032-MLA51056198917_082022-O.webp", "gbe330", 25));
  await manager.addProduct(new Product("Arroz Gallo", "Arroz Largo y Fino", 54, "❌ Sin Imagen ❌", "abc123", 13));
  
  manager.getProducts();
  
  await manager.getProductById(3)
  await manager.updateProduct(2, {price: 50, stock: 11, id: 7})
}

pruebaFuncionamiento(); */

//  🔨🔧 PRUEBAS DE FUNCIONAMIENTO 🔧🔨 // 🔨🔧 PRUEBAS DE FUNCIONAMIENTO 🔧🔨 // 🔨🔧 PRUEBAS DE FUNCIONAMIENTO 🔧🔨 //

export { ProductManager }; // → import { ProductManager } from "ProductManager.js"


/* 
TODO: ¡APUNTES EXTRAS SOBRE EL DESAFIO! TODO: ¡APUNTES EXTRAS SOBRE EL DESAFIO!

! en la diapositiva se habla de una lectura del archivo (readFileSync??)
! en ese caso getProducts tambien deberia de usar readFile?
? Use siguiendo los pasos del prof, como en getProducts() ...
? uso this.products hago lo mismo en getProductsById()

TODO: ¡APUNTES EXTRAS SOBRE EL DESAFIO! TODO: ¡APUNTES EXTRAS SOBRE EL DESAFIO! 
*/

// !update para solo una prop en especifico

/* await manager.updateProduct(2, "stock", 77)
// ! al producto con "id": 2 ↑    ↑      ↑
// ? le busco actualizar la prop: ↑      ↑
// * le cambio su stock actualizado a 77 ↑ */

/* async updateProduct(id, prop, nuevoValor) {

  const productSelected = this.products.find((p) => p.id == id);

  if (productSelected) {
    const indice = this.products.findIndex(prod => prod.id === productSelected.id);
    
    switch (prop) {
      case "title":
        this.products[indice].title = nuevoValor
        break;
      case "description":
        this.products[indice].description = nuevoValor
        break;
      case "price":
        this.products[indice].price = nuevoValor
        break;
      case "thumbnail":
        this.products[indice].thumbnail = nuevoValor
      break;
      case "code":
        this.products[indice].code = nuevoValor
        break;
      case "stock":
        this.products[indice].stock = nuevoValor
        break;
      default:
        console.log(`error al buscar ${prop}`)
        break;
    }
    // const newProductsArray = this.products.filter((p) => p.id != id);
    // this.products = newProductsArray;
    await this.saveProduct();

  } else {
    console.log("[ERROR en Update]");
  }
} */

// !update para solo una prop en especifico