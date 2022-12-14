import { useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import '../styles/Carousel.css';

function Carousel({ recommend, category }) {
  const [key, setContainerKey] = useState(1);
  const id = 1;
  // innerWidth, innerHeight
  // const { innerWidth, innerHeight } = window;
  // console.log(innerWidth);
  const [width, setWidth] = useState(0);
  const carousel = useRef();
  const name = category === 'meals' ? 'strDrink' : 'strMeal';
  const image = category === 'meals' ? 'strDrinkThumb' : 'strMealThumb';
  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    // console.log(innerWidth, carousel.current.offsetWidth);
  }, []);

  const handleLeftConstraint = useCallback(() => {
    const el = document.getElementById(id);
    if (el) {
      setWidth(el.scrollWidth - el.offsetWidth);
    }
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      setContainerKey((prev) => prev + 1);
      handleLeftConstraint();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleLeftConstraint]);

  return (
    <div className="container-carousel">
      <motion.div
        ref={ carousel }
        className="carousel"
        whileTap={ { cursor: 'grabbing' } }
        key={ key }
        id={ id }
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
