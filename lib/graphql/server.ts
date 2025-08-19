'use server';

import { ApolloServer } from '@apollo/server';
import { typeDefs, resolvers } from './schemaAndResolvers';
import { Product } from './types';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// A helper function to execute a GraphQL query directly on the server
export async function executeGraphQLQuery<T>(query: string, variables: Record<string, number> = {}): Promise<{ data: T }> {
  try {
    const response = await server.executeOperation({ query, variables });
    if (response.body.kind === 'single' && response.body.singleResult.errors) {
        console.error('GraphQL errors:', response.body.singleResult.errors);
        throw new Error('GraphQL query failed');
    }
    if (response.body.kind === 'single') {
        return response.body.singleResult as { data: T };
    }
    throw new Error('Unsupported GraphQL response format');
  } catch (error) {
    console.error('Error executing GraphQL operation:', error);
    throw error;
  }
}

// A specific type-safe function for the cheapProducts query
export async function getCheapProducts(maxPrice: number): Promise<Product[]> {
  const result = await executeGraphQLQuery<{ cheapProducts: Product[] }>(
    `
    query GetCheapProducts($maxPrice: Float!) {
      cheapProducts(maxPrice: $maxPrice) {
        id
        name
        price
      }
    }
  `,
    { maxPrice }
  );
  return result.data.cheapProducts;
}

// app/cheap-products/page.tsx
// import { getCheapProducts } from '../lib/graphql/server';
// import { Product } from '../lib/graphql/types';

// export default async function CheapProductsPage() {
//   // Call the server function directly! No need for fetch.
//   // The type of `products` is inferred correctly as `Product[]`.
//   const products: Product[] = await getCheapProducts(5.0);

//   return (
//     <div>
//       <h1>Cheap Products</h1>
//       <ul>
//         {products.map((product) => (
//           <li key={product.id}>
//             {product.name} - ${product.price.toFixed(2)}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }