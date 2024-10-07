import { fetchProductsByName } from '../../shopify/functions.js'; 
import Client from '../../shopify/client.js';

jest.mock('../../shopify/client.js');

describe('fetchProductsByName', () => {
    const mockProductName = 'Test Product';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch products by name and return them', async () => {
        Client.request.mockResolvedValueOnce({
            data: {
                products: {
                    edges: [
                        {
                            node: {
                                title: 'Test Product 1',
                                id: '1',
                                variants: {
                                    edges: [
                                        { node: { title: 'Variant 1', price: '10.00' } },
                                    ],
                                    pageInfo: {
                                        hasNextPage: false,
                                    },
                                },
                            },
                        },
                        {
                            node: {
                                title: 'Test Product 2',
                                id: '2',
                                variants: {
                                    edges: [
                                        { node: { title: 'Variant 2', price: '20.00' } },
                                    ],
                                    pageInfo: {
                                        hasNextPage: false,
                                    },
                                },
                            },
                        },
                    ],
                    pageInfo: {
                        hasNextPage: false,
                    },
                },
            },
        });

        const products = await fetchProductsByName(mockProductName);

        expect(products).toEqual([
            {
                title: 'Test Product 1',
                id: '1',
                variants: [{ title: 'Variant 1', price: '10.00' }],
            },
            {
                title: 'Test Product 2',
                id: '2',
                variants: [{ title: 'Variant 2', price: '20.00' }],
            },
        ]);
    });

    it('should handle errors when fetching products', async () => {
        // Mocking an error response
        Client.request.mockRejectedValueOnce(new Error('Fetch error'));

        await expect(fetchProductsByName(mockProductName)).rejects.toThrow('Fetch error');
    });

    it('should paginate through products', async () => {
        // Mocking paginated response
        Client.request
            .mockResolvedValueOnce({
                data: {
                    products: {
                        edges: [
                            {
                                node: {
                                    title: 'Test Product 1',
                                    id: '1',
                                    variants: {
                                        edges: [],
                                        pageInfo: {
                                            hasNextPage: false,
                                        },
                                    },
                                },
                            },
                        ],
                        pageInfo: {
                            hasNextPage: true,
                        },
                    },
                },
            })
            .mockResolvedValueOnce({
                data: {
                    products: {
                        edges: [
                            {
                                node: {
                                    title: 'Test Product 2',
                                    id: '2',
                                    variants: {
                                        edges: [],
                                        pageInfo: {
                                            hasNextPage: false,
                                        },
                                    },
                                },
                            },
                        ],
                        pageInfo: {
                            hasNextPage: false,
                        },
                    },
                },
            });

        const products = await fetchProductsByName(mockProductName);

        expect(products).toEqual([
            {
                title: 'Test Product 1',
                id: '1',
                variants: [],
            },
            {
                title: 'Test Product 2',
                id: '2',
                variants: [],
            },
        ]);
    });
});
