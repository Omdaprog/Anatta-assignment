import Client from "./client.js";

// fetch paginated variants for a product
const fetchAllVariantsForProduct = async (product, operation, variables) => {
    let variants = product.variants.edges;
    let variantCursor = null;

    // Paginate through variants if it has next 
    while (product.variants.pageInfo.hasNextPage) {
        // operation has to be changed
        const variantResponse = await Client.request(operation, {
            variables: {
                ...variables,
                afterVariant: variantCursor,
            },
        });

        const newVariants = variantResponse.data.products.edges[0].node.variants.edges;
        variants = [...variants, ...newVariants];  // Append new variants
        variantCursor = newVariants[newVariants.length - 1].cursor;  // Update variant cursor
    }

    return {
        ...product,
        variants: variants.map(variant => variant.node),  // Return all variants
    };
};

// fetch paginated products by name
const fetchAllProductsByName = async (operation, variables) => {
    try {
        let allProducts = [];
        let productCursor = null;
        let response;
        do {
            response = await Client.request(operation, {
                variables: {
                    ...variables,
                    afterProduct: productCursor,
                },
            });
            if (response.errors) throw response.errors;

            const products = response.data.products.edges;

            for (let product of products) {
                // Fetch all variants for each product
                const productWithVariants = await fetchAllVariantsForProduct(product.node, operation, variables);
                allProducts.push(productWithVariants);
            }
            productCursor = products[products.length - 1]?.cursor || null;

        } while (response.data.products.pageInfo.hasNextPage);  // Continue until all products are fetched
        return allProducts;
    } catch (error) {
        throw error;
    }
};

//fetch products by name with pagination support
export const fetchProductsByName = async (productName) => {
    const operation = `
    query (
	$first: Int!
	$searchTerm: String!
	$afterProduct: String
	$afterVariant: String
) {
	products(first: $first, query: $searchTerm, after: $afterProduct) {
		edges {
			node {
				title
				variants(first: 250, after: $afterVariant) {
					edges {
						node {
							title
							price
						}
						cursor
					}
					pageInfo {
						hasNextPage
					}
				}
			}
			cursor
		}
		pageInfo {
			hasNextPage
		}
	}
}`;

    const variables = {
        first: 250,
        searchTerm: `title:*${productName}*`,
    };

    try {
        return await fetchAllProductsByName(operation, variables);
    } catch (error) {
        throw error;
    }
};
