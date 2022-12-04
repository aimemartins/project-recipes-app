import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import '../styles/Carousel.css';

function Carousel({ recommend, category }) {
  const [width, setWidth] = useState(0);
  const carousel = useRef();
  const name = category === 'meals' ? 'strDrink' : 'strMeal';
  const image = category === 'meals' ? 'strDrinkThumb' : 'strMealThumb';
  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);
  return (
    <div className="container">
      <motion.div
        ref={ carousel }
        className="carousel"
        whileTap={ { cursor: 'grabbing' } }
      >
        <motion.div
          drag="x"
          dragConstraints={ { right: 0, left: -width } }
          className="inner-carousel"
        >
          {recommend.map((item, index) => (
            <motion.div
              className="item"
              data-testid={ `${index}-recommendation-card` }
              key={ item[name] }
            >
              <img src={ item[image] } alt={ item[name] } />
              <p data-testid={ `${index}-recommendation-title` }>{item[name]}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

Carousel.propTypes = {
  recommend: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  category: PropTypes.string.isRequired,
};

export default Carousel;
