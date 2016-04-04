import React, { PropTypes } from 'react';
import ClassNames from 'classnames/bind';
import style from './button.css';

/**
 * Creates a reusable, customizable button.
 */
const Button = ({className, outline, href, loading, primary, secondary, success, warning, danger, link, large, small, block, disabled, children, ...others}) => {

    const element = href ? 'a' : 'button';
    const cx = ClassNames.bind(style);
    let classNames = cx({
        large,
        small,
        block,
        disabled,
        className
    });

    if (outline) {
      classNames += ' ' + cx({
        primary_outline: !secondary && !success && !warning && !danger && !link,
        secondary,
        success_outline: success,
        warning_outline: warning,
        danger_outline: danger,
        link_outline: link
      });
    } else {
      classNames += ' ' + cx({
        primary: !secondary && !success && !warning && !danger && !link,
        secondary,
        success,
        warning,
        danger,
        link
      });
    }


    let role;
    if (element === 'a') {
      role = 'button';
    }
    const props = {
      ...others,
      href,
      className: classNames,
      disabled: disabled || loading,
      role
    };

    return React.createElement(element, props,
      children
    );

};

Button.displayName = 'Button';

Button.styleguide = {
  index: '1.1',
  category: 'Buttons',
  example: `
  <section>
    <p>Regular Buttons</p>
    <Button>Button</Button>
    <Button>Secondary</Button>
    <Button>Success</Button>
    <Button>Warning</Button>
    <Button>Danger</Button>

    <p>Disabled Regular Buttons</p>
    <Button disabled >Button</Button>
    <Button disabled>Secondary</Button>
    <Button disabled >Success</Button>
    <Button disabled >Warning</Button>
    <Button disabled >Danger</Button>

    <p>Outline Buttons</p>
    <Button>Button</Button>
    <Button>Secondary</Button>
    <Button>Success</Button>
    <Button>Warning</Button>
    <Button>Danger</Button>

    <p>Disabled Outline Buttons</p>
    <Button disabled>Button</Button>
    <Button disabled>Secondary</Button>
    <Button disabled>Success</Button>
    <Button disabled>Warning</Button>
    <Button disabled>Danger</Button>

    <p>Large Buttons</p>
    <Button>Button</Button>
    <Button>Secondary</Button>

    <p>Small Buttons</p>
    <Button>Button</Button>
    <Button>Secondary</Button>

    <p>Block Level Buttons</p>
    <Button>Button</Button>
    <Button>Secondary</Button>
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
  outline: PropTypes.bool,
    /**
     * Define button href if anchor
     * @examples '#', 'http://some-website.com/'
     */
  href: PropTypes.string,
    /**
     * Set loading animation on button
     * @examples <Button loading>
     */
  loading: PropTypes.bool,
    /**
     * Use primary style button (button is set to this by default)
     * @examples <Button primary>
     */
  primary: PropTypes.bool,
  type: PropTypes.string,
    /**
     * Use secondary style button
     * @examples <Button secondary>
     */
  secondary: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  danger: PropTypes.bool,
  link: PropTypes.bool,
  large: PropTypes.bool,
  small: PropTypes.bool
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
  small: false

};

export default Button;
