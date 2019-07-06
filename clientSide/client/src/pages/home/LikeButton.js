import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon , Label } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { AuthContext } from '../../components/context_auth';
import { LIKE_POST } from '../../components/Ui/gql';

function LikeButton({ id, likeCount, likes }){

    const { user } = useContext(AuthContext);

    const [liked, setLiked] = useState(false);

    const [likePost] = useMutation(LIKE_POST, {
        variables: { postId: id }
    });

    useEffect(() => {
        if(user && likes.find(like => like.username === user.username)){
            setLiked(true);
        }else setLiked(false);
    }, [user,likes]);

    const likeButton = user ? (
        liked ? (
            <Button color='teal'>
                <Icon name="heart" />
            </Button>
        ): (
            <Button color='teal' basic>
                <Icon name="heart" />
            </Button>
        ) 
    ): (
        <Button as={Link} to="/login" color='teal'>
            <Icon name="heart" />
        </Button>
    );

return (
    <Button labelPosition="right" onClick={likePost}>
        {likeButton}
        <Label basic color="teal" pointing='left'>
          {likeCount}
        </Label>
    </Button>
)
    
};

export default LikeButton;