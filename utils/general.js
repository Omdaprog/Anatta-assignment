
const flatProductsArray = (products) => {
    return products.flatMap(product => 
        product.variants.map(variant => ({
            productTitle: product.title,
            variantTitle: variant.title,
            price: parseFloat(variant.price)
        }))
    );
}

const sortVariantsByPrice = (allVariants) => {
    return allVariants.sort((a, b) => a.price - b.price);
}

export function displayProducts(products) {
    try {
        // Combine all products and their variants into a single array
        const flattenArray = flatProductsArray(products)
        // Sort the combined variants by price in ascending order
        const sortedVariants = sortVariantsByPrice(flattenArray)
        // Display each product's variant and price
        sortedVariants.forEach(({ productTitle, variantTitle, price }) => {
            console.log(`${productTitle} - ${variantTitle} - price $${price.toFixed(2)}`);
        });
    } catch (error) {
        throw error;
    }
}
