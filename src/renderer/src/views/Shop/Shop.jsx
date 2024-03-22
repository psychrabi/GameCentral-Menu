import { lazy, useEffect } from 'react'
import { useBoundStore } from '../../components/stores/BoundStore'
const Header = lazy(() => import('../../components/ui/Header'))
const Cart = lazy(() => import('./Cart'))
const Products = lazy(() => import('./Products'))

import ProductTypes from '../../data/ProductTypes.js'

import { useMemo } from 'react';

export default function Shop() {
  const {
    token,
    member,
    filter,
    type,
    setCount,
    fetchProducts,
    products,
    setFilter,
    setType,
    setTitle,
    cart,
  } = useBoundStore(state => ({
    token: state.token,
    member: state.member,
    filter: state.filter,
    type: state.type,
    setCount: state.setCount,
    fetchProducts: state.fetchProducts,
    products: state.products,
    setFilter: state.setFilter,
    setType: state.setType,
    setTitle: state.setTitle,
    cart: state.cart,
  }));

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts(member.center_id, token);
    }
    setFilter('');
    setType('');
    setTitle('All Products');
  }, [member.center_id, token, products.length, fetchProducts, setFilter, setType, setTitle]);

  const filteredProducts = useMemo(() => 
    products.filter(product => {
      const productNameLower = product.name.toLowerCase();
      const filterLower = filter.toLowerCase();
      return filter ? productNameLower.includes(filterLower) : type ? product.product_type === type : true;
    }),
    [products, filter, type]
  );

  useEffect(() => {
    setCount(filteredProducts.length);
  }, [filteredProducts.length, setCount]);

  return (
    <>
      <div className="d-flex">
        <div className={cart.length > 0 ? 'w-75 pe-3' : 'w-100'}>
          <Header categories={ProductTypes} page_title={'All Products'} />
          <Products products={filteredProducts} />
        </div>
        {cart.length > 0 && <Cart cart={cart} />}
      </div>
    </>
  );
}
