import style from './button.css';
import Button from '../../components/Buttons/Button';
import createComponent from '../../tools/createComponent';

// An example of generated hashclasses by either JSS, CSSModules or any other
// CSS libraries which generates classes.
const theme = {
  base: style.primary,
  disabled: style.disabled
};

export default createComponent(Button, theme);
