const fs = require('fs');

let key= fs.readFileSync('C:/Users/ASUS/Documents/NodeJs/test/product/carts/key.pem');

module.exports = {
    secret:key
}