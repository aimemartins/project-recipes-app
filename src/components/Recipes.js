import React from 'react';
import { useHistory } from 'react-router-dom';
import Drinks from './Drinks';
import Meals from './Meals';
import Footer from './Footer';

export default function Recipes() {
  const { location } = useHistory();
  return (
    <>
      { location.pathname === '/drinks'
        ? <Drinks />
        : <Meals />}
      <Footer />
    </>
  );
}
