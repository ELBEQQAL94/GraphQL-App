import React from 'react';
import { Button } from 'semantic-ui-react';

const SubmitButton = ({title, style}) => (
    <Button type='submit' primary style={style ? style :  null} >
        {title}
    </Button>
);

export default SubmitButton;