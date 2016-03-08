import React, { Component } from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'

export default class ButtonGroups extends Component {
static displayName = "ButtonGroups";
  static styleguide = {
    index: '1.2',
    category: 'Buttons',
    title: 'Button groups',
    description: 'Group a series of buttons together on a single line with the button group.',
    example: `
<ButtonGroup>
    <Button>Left</Button>
    <Button>Middle</Button>
    <Button>Right</Button>
</ButtonGroup>`
  }

  render () {
    return (
      <ButtonGroup>
        <Button>Left</Button>
        <Button>Middle</Button>
        <Button>Right</Button>
      </ButtonGroup>
    )
  }
}
