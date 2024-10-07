import Client from "./client.js";

// Function to fetch products by name
export const fetchProductsByName = async (productName) => {
    const operation = `
    query ($first: Int!, $query: String!) {
      products(first: $first, query: $query) {
        edges {
          node {
            title
            variants(first: 100) {
              edges {
                node {
                  title
                  price
                }
              }
            }
          }
        }
      }
    }
  `;

    const variables = {
        first: 10, // Adjust this number as needed
        query: `title:*${productName}*`,
    };

    try {
        const { data, errors } = await Client.request(operation, {
            variables: variables
        });
        if (errors) {
            console.log(errors)
            return [];
        }
        return data.products.edges;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}