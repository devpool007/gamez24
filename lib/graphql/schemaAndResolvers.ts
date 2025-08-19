import { type Product } from './types';
import { APIResponse } from '@/types/gog';
// The GOG API endpoint
const GOG_API_BASE_URL = 'https://embed.gog.com/games/ajax/filtered';

// 1. Define your GraphQL Schema (the "what")
export const typeDefs = `#graphql
  type Product {
    id: ID!
    name: String
    price: Float
  }

  type Query {
    cheapProducts(maxPrice: Float!): [Product]
  }
`;

// 2. Define your Resolvers (the "how")
export const resolvers = {
  Query: {
    cheapProducts: async (_: APIResponse, { maxPrice }: { maxPrice: number }): Promise<Product[]> => {
      let allProducts: Product[] = [];
      let currentPage = 1;
      let hasMorePages = true;

      while (hasMorePages) {
        try {
          const url = new URL(GOG_API_BASE_URL);
          url.searchParams.append('mediaType', 'game');
          url.searchParams.append('page', currentPage.toString());

          const response = await fetch(url.toString());

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          const { products, page, totalPages } = data;

          if (!products || products.length === 0) {
            hasMorePages = false;
          } else {
            // Transform the GOG product data into our GraphQL type.
            const transformedProducts: Product[] = products.map((gogProduct: Product) => ({
              id: gogProduct.id.toString(),
              name: gogProduct.title,
              price: gogProduct.price.final / 100,
            }));

            allProducts = allProducts.concat(transformedProducts);

            if (page >= totalPages) {
              hasMorePages = false;
            } else {
              currentPage++;
            }
          }
        } catch (error) {
          console.error('Error fetching from GOG API:', error);
          hasMorePages = false;
        }
      }

      const filteredProducts = allProducts.filter(product => product.price < maxPrice);
      return filteredProducts;
    },
  },
};
