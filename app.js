import { fetchProductsByName } from './shopify/functions.js';
import { SHOPIFY_ACCESS_TOKEN, SHOPIFY_STORE_DOMAIN } from './utils/constants.js';
import { displayProducts } from './utils/general.js';
import { getParameters } from './utils/yargs.js';

async function main() {
    try {
        if(!SHOPIFY_STORE_DOMAIN || !SHOPIFY_ACCESS_TOKEN){
            console.log("please add your ENV variables");
        }
        const productName = getParameters()
        if (productName === null) {
            console.log("please input the product name")
            return;
        } else if (!productName) {
            throw ({message:"error in getting product name"})
        }
        const products = await fetchProductsByName(productName);
        if (products.length === 0) {
            console.log(`No products found matching the name "${productName}".`);
            return;
        }
        displayProducts(products);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
