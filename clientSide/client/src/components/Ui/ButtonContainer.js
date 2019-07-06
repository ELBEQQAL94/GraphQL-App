import React from 'react';
import { Icon, Button, Label } from "semantic-ui-react";

const ButtonContainer = ({
    name, 
    func, 
    label, 
    color, 
    positionButton, 
    positionLabel,
    as,
    to={to}
    }) => (
    <Button 
        as='div' 
        labelPosition={positionButton} 
        onClick={func}
        as={as}
        to={ to ? to : null}
    >
      <Button color='red' basic>
        <Icon name={name} />
      </Button>

      <Label as='a' basic color={color} pointing={positionLabel}>
        {label}
      </Label>
      
    </Button>
);

export default ButtonContainer;
