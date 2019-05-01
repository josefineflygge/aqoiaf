
import React from 'react';

import { Card } from 'semantic-ui-react';
import CharacterPost from '../../components/Post/CharacterPost/CharacterPost';

const savedPostsList = (props) => {

    return (
    
        <div style={{ width: '50%'}}>
            <Card.Group doubling centered itemsPerRow={3}>

            {props.posts && props.posts.map(post =>{
                
                return(    
                    <CharacterPost post={post} key={post.id}/>
                );
              

            })}           
            </Card.Group>
        </div>

    )

};





export default savedPostsList;