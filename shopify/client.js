import { createAdminApiClient } from '@shopify/admin-api-client';
import { API_VERSION, SHOPIFY_ACCESS_TOKEN, SHOPIFY_STORE_DOMAIN } from '../utils/constants.js';


// Create Shopify API client
const Client = createAdminApiClient({
    storeDomain: SHOPIFY_STORE_DOMAIN,
    apiVersion: API_VERSION,
    accessToken: SHOPIFY_ACCESS_TOKEN,
});

export default Client