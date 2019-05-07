
import React from 'react';
import {Link} from 'react-router-dom';

import { Card } from 'semantic-ui-react';
import styles from './SavedPostsList.module.css';

import CharacterPost from '../../components/Post/CharacterPost/CharacterPost';
import HousePost from '../../components/Post/HousePost/HousePost';
import BattlePost from '../../components/Post/BattlePost/BattlePost';



const savedPostsList = (props) => {


    return (
    
        <div className={styles.ListContainer}>
            <Card.Group doubling centered itemsPerRow={3}>

            {props.posts && props.posts.map(post =>{


                //let linkUrl = "/${post.type}/${post.id}";
                let postComp;

                switch(post.type){
                    case 'character':
                        postComp = <CharacterPost post={post} key={post.id} />
                        break;

                    case 'house':
                        postComp = <HousePost  post={post} key={post.id} />
                        break;

                    case 'battle':
                        postComp = <BattlePost post={post} key={post.id} />
                        break;
                    
                    default:
                    console.log("post type not defined"); 
                    break;
                } 
                
                return(    
                    <div key={post.id} className={styles.cardContainer}>
                        <Link to={'/' + post.type + '/' + post.name}>{postComp}</Link>
                    </div>
                );
              

            })}           
            </Card.Group>
        </div>

    )

};





export default savedPostsList;