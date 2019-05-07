import React from 'react';

import { Card, Image } from 'semantic-ui-react';
import winterfellImg from '../../../assets/images/winterfell.jpg';


const BattlePost = (props) => {

        return (

        <Card>
            <Image src={winterfellImg} />
            <Card.Content>
            <Card.Header>{props.post.name}</Card.Header>
            <Card.Meta>{props.post.type}</Card.Meta>
            </Card.Content>
        </Card>

        )
}




export default BattlePost;