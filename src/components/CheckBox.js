import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function CheckBox({ ingredient, index, handleCheckBox, isChecked }) {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(isChecked);
  }, []);
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
          onChange={ () => {
            setChecked((prev) => !prev);
            handleCheckBox(ingredient, !checked);
          } }
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
  handleCheckBox: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

export default CheckBox;
