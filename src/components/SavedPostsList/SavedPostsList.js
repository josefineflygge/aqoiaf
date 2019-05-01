
import React from 'react';

import { Card } from 'semantic-ui-react';
import CharacterPost from '../../components/Post/CharacterPost/CharacterPost';
import styles from './SavedPostsList.module.css';

const savedPostsList = (props) => {

    return (
    
        <div className={styles.ListContainer}>
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