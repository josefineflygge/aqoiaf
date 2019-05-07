import React from 'react';

import { Card, Image } from 'semantic-ui-react';
import lannisterImg from '../../../assets/images/lannister.jpg';


const HousePost = (props) => {

        return (

        <Card>
            <Image src={lannisterImg} />
            <Card.Content>
            <Card.Header>{props.post.name}</Card.Header>
            <Card.Meta>{props.post.type}</Card.Meta>
            </Card.Content>
        </Card>

        )
}




export default HousePost;