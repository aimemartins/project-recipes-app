import PropTypes from 'prop-types';
import { useState } from 'react';

function CheckBox({ ingredient, index }) {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <label
        htmlFor={ `${index}-ingredient-step` }
        data-testid={ `${index}-ingredient-step` }
        style={
          { textDecoration: `${checked ? 'line-through solid black' : 'none'}` }
        }
      >
        <input
          type="checkbox"
          name=""
          id={ `${index}-ingredient-step` }
          checked={ checked }
          onChange={ () => setChecked((prev) => !prev) }
        />
        {' '}
        {ingredient}
      </label>
    </div>
  );
}

CheckBox.propTypes = {
  ingredient: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default CheckBox;
