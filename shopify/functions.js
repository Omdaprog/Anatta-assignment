import Client from "./client.js";

const fetchAllVariantsForProducts = async (productId) => {
    const operation = `
        query getProductVariants($id: ID!, $afterVariant: String) {
            product(id: $id) {
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
        }
    `;

    try {
        let variants = [];
        let variantCursor = null;

        // Fetch the initial product with variants
        const initialResponse = await Client.request(operation, {
            variables: {
                id: productId,
                afterVariant: variantCursor,
            },
        });
        let product = initialResponse.data.product;
        variants = product?.variants?.edges;

        // Paginate through variants if it has nextPage
        while (product.variants.pageInfo.hasNextPage) {
            const variantResponse = await Client.request(operation, {
                variables: {
                    id: productId,
                    afterVariant: variantCursor,
                },
            });



            const newVariants = variantResponse.data.product.variants.edges;
            variants = [...variants, ...newVariants];
            variantCursor = newVariants[newVariants.length - 1]?.cursor; 
            product = variantResponse.data.product
        }

        return {
            ...product,
            variants: variants.map(variant => variant.node),
        };
    } catch (error) {
        throw error;
    }
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
                if(product?.node?.variants?.pageInfo?.hasNextPage){
                    const productWithVariants = await fetchAllVariantsForProducts(product.node.id);
                    allProducts.push(productWithVariants);
                }else{
                    allProducts.push(
                        {
                            ...product?.node,
                            variants: product?.node?.variants?.edges?.map(variant => variant.node),
                        }
                    )
                }
            }
            productCursor = products[products.length - 1]?.cursor || null;
            
            // Continue until all products are fetched
        } while (response.data.products.pageInfo.hasNextPage);  
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
                id
				variants(first: 80, after: $afterVariant) {
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
        first: 10,
        searchTerm: `title:*${productName}*`,
    };

    try {
        return await fetchAllProductsByName(operation, variables);
    } catch (error) {
        throw error;
    }
};
