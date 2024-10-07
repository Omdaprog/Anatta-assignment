import { flatProductsArray, sortVariantsByPrice, displayProducts } from '../../utils/general.js';

describe('general.js functions', () => {
    const products = [
        {
            title: 'Product 1',
            variants: [
                { title: 'Variant 1', price: '10.00' },
                { title: 'Variant 2', price: '20.00' }
            ]
        },
        {
            title: 'Product 2',
            variants: [
                { title: 'Variant 3', price: '30.00' }
            ]
        }
    ];

    test('displayProducts should correctly log sorted product variants and prices', () => {
        console.log = jest.fn();
        displayProducts(products);
        expect(console.log).toHaveBeenCalledWith('Product 1 - Variant 1 - price $10.00');
        expect(console.log).toHaveBeenCalledWith('Product 1 - Variant 2 - price $20.00');
        expect(console.log).toHaveBeenCalledWith('Product 2 - Variant 3 - price $30.00');
    });
});
