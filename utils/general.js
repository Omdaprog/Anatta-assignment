
export function displayProducts(products) {
    products.forEach(product => {
        // Clone and sort the variants by price in ascending order
        const variants = product.variants;
        const sortedVariants = variants.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

        sortedVariants.forEach(variant => {
            console.log(`${product.title} - ${variant.title} - price $${variant.price}`);
        });
    });
}