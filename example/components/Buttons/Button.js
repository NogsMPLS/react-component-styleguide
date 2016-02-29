import React, { PropTypes } from 'react';
import ClassNames from 'classnames/bind';
import * as readme from '!!raw!./docs.md'
import style from './button.css';

/**
 * Component Descriptions
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
  category: 'Buttons!',
  title: 'Buttons',
  readme: readme
};

Button.propTypes = {
  children: PropTypes.node,
    /**
     * define a custom css class name
     * @examples "btn", "btn-active"
     */
  className: PropTypes.string,
    /**
     * set button to disabled
     * @examples <Button disabled>
     */
  disabled: PropTypes.bool,
    /**
     * use outline styled button
     * @examples <Button outline>
     */
  outline: PropTypes.bool,
    /**
     * define button href if anchor
     * @examples '#', 'http://some-website.com/'
     */
  href: PropTypes.string,
    /**
     * set loading animation on button
     * @examples <Button loading>
     */
  loading: PropTypes.bool,
    /**
     * use primary style button (button is set to this by default)
     * @examples <Button primary>
     */
  primary: PropTypes.bool,
  type: PropTypes.string,
    /**
     * use secondary style button
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
