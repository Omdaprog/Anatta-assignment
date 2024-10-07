// Function to display products and their variants
export function displayProducts(products) {
    products.forEach(productEdge => {
      const product = productEdge.node;
      const variants = product.variants.edges
        .map(variantEdge => variantEdge.node)
        .sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  
      variants.forEach(variant => {
        console.log(`${product.title} - ${variant.title} - price $${variant.price}`);
      });
    });
  }