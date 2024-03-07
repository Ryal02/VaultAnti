'use client';
import React from 'react';
import Table from '../../../components/table/page';
import { renderCell } from './table/rendercell';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Loading from './loading';
import ErrorComponent from './error';

const fetchProducts = async () => {
  try {
      let token = localStorage.getItem('yourAuthToken');
      const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URI + '/api/get-products',{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(`Failed to fetch products. ${errorResponse.message}`);
      }
      return res.json();
  } catch (error) {
      console.error('Fetch error:', error);
      throw error; // Rethrow the error to propagate it further
  }
};

const ProductsPage: React.FC = () => {
  const { data: product, error, isLoading } = useQuery('products', fetchProducts, {
    staleTime: 10000,
  });
  if(isLoading) {
    return <Loading/>;
  }
  if(error) {
    return <ErrorComponent/>;
  }
  const productKeys = product && product.length > 0 ? Object.keys(product[0]) : [];
  const columns = productKeys.map((key) => ({
    uid: key,
    name: key.charAt(0).toUpperCase() + key.slice(1),
    sortable: true,
  }));
  columns.push({
    uid: "actions",
    name: "Actions",
    sortable: false,
  });
  const INITIAL_VISIBLE_COLUMNS = ["id", "name", "type", "quantity", "expire", "actions"];
  return (
    <main>
      <div className="p-5 relative overflow-x-auto text-black">
        <Table 
          columns={columns} 
          users={product as any} 
          initialVisibleColumns={INITIAL_VISIBLE_COLUMNS} 
          statusOptions={[]}  //Add your own options if you have
          renderCell={renderCell}
          reload={fetchProducts}
        />
      </div>
    </main>
  )
};

const queryClient = new QueryClient();

const QueryClientWrapper: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <ProductsPage />
  </QueryClientProvider>
);

export default QueryClientWrapper;
