const db = require("../db/connection.js");

exports.fetchAllProducts = ()=>{
    return db.query(`SELECT * FROM products;`).then((rows)=>{
        return rows
    })
}

exports.fetchProductById = (productId)=>{
    return db.query(
        `SELECT * FROM products
        WHERE product_id=$1;`,[productId]).then((rows)=>{
        return rows[0]
    })
}

exports.fetchProductsFromShop = (shopId)=>{
    return db.query(`SELECT * FROM products
        WHERE shop_id=$1`,[shopId]).then((rows)=>{
        return rows[0]
    })
}

exports.postProduct = ()=>{
}

exports.patchProduct = ()=>{
}

exports.deleteProduct = ()=>{
    
}