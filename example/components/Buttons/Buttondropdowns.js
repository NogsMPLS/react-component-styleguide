import React, { Component, PropTypes } from 'react'
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap'


const BUTTONS = ['Default', 'Primary', 'Success', 'Info', 'Warning', 'Danger', 'Link'];

class ButtonDropdowns extends Component {
  static displayName = 'ButtonDropdowns';
  static styleguide = {
    index: '1.3',
    category: 'Buttons',
    title: 'Button dropdowns',
    description: 'Use `<DropdownButton />` or `<SplitButton />` components to display a button with a dropdown menu.',
    example: `
    <ButtonDropdowns>
        <ButtonToolbar>
            <DropdownButton bsStyle='primary' title='primary' id='dropdown-basic-2'>
                <MenuItem eventKey='1'>Action</MenuItem>
                <MenuItem eventKey='2'>Another action</MenuItem>
                <MenuItem eventKey='3' active={true}>Active Item</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey='4'>Separated link</MenuItem>
            </DropdownButton>
        </ButtonToolbar>
    </ButtonDropdowns>`
  };

  render () {
    return (
      <ButtonToolbar>
        {BUTTONS.map((title, i) => (
            <DropdownButton bsStyle={title.toLowerCase()} title={title} key={i} id={`dropdown-basic-${i}`}>
                <MenuItem eventKey='1'>Action</MenuItem>
                <MenuItem eventKey='2'>Another action</MenuItem>
                <MenuItem eventKey='3' active={true}>Active Item</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey='4'>Separated link</MenuItem>
            </DropdownButton>
        ))}
      </ButtonToolbar>
    )
  }
}

ButtonDropdowns.propTypes = {
	/**
     * Anything that can be in a button. Usually text, but could also be icons/glyphs.
     * @examples 'Save', 'Cancel'
     */
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

ButtonDropdowns.defaultProps = {
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

export default ButtonDropdowns;