import React, { PropTypes } from 'react';

/**
 * Creates a reusable, customizable button.
 */
const Button = ({loading, disabled, children, theme, className, ...props}) => {

    var disabledStyle = disabled || loading ? theme.disabled : '';
    return <button {...props} className={`${theme.base} ${disabledStyle} ${className}`}>{children}</button>
};

Button.displayName = 'Button';

Button.styleguide = {
  index: '1.1',
  category: 'Buttons',
  example: `
  <section>
    <p>Regular Buttons</p>
    <PrimaryButton>PrimaryButton</PrimaryButton>
    <SecondaryButton>Secondary</SecondaryButton>
    <div style={{clear: 'both'}}> </div>
    <Button>Core 'unstyled' Button with primary theme as default</Button>
  </section>
  `
};

Button.propTypes = {
	/**
     * Anything that can be in a button. Usually text, but could also be icons/glyphs
     * @examples 'Save', 'Cancel'
     */
  children: PropTypes.node.isRequired,
    /**
     * Define a custom css class name
     * @examples "btn", "btn-active"
     */
  className: PropTypes.string,
    /**
     * Set button to disabled
     * @examples <Button disabled>
     */
  disabled: PropTypes.bool,
    /**
     * Use outline styled button
     * @examples <Button outline>
     */
  theme: PropTypes.object
};

Button.defaultProps = {
  children: 'Default Button',
  className: '',
  disabled: false,
  outline: false,
  href: '#',
  loading: false,
  primary: false,
  secondary: false,
  success: false,
  warning: false,
  danger: false,
  link: false,
  large: false,
  small: false,
  theme: {
    base: "",
    disabled: ""
  }
};

export default Button;
