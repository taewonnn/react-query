import React, { useState } from 'react';
// import useProducts from '../hooks/use-products';
import {useQuery} from "@tanstack/react-query";

export default function Products() {
  const [checked, setChecked] = useState(false);
  // const [loading, error, products] = useProducts({ salesOnly: checked });


  // use-query
  const { isLoading, error, data: products } = useQuery(['products', checked], async () => {
    console.log('fetching...', checked);
    return fetch(`data/${checked ? 'sale_' : ''}products.json`).then((res) => res.json())
  }, {
    // 캐시를 길게
    staleTime: 1000 * 60 * 5,
  });

  const handleChange = () => setChecked((prev) => !prev);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <>
      <label>
        <input type='checkbox' checked={checked} onChange={handleChange} />
        Show Only 🔥 Sale
      </label>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <article>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}

