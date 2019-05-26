
import React from 'react';
import {Link} from 'react-router-dom';
import styles from './SavedPostsList.module.css';

import CharacterPost from '../../components/Post/CharacterPost/CharacterPost';
import HousePost from '../../components/Post/HousePost/HousePost';
import BattlePost from '../../components/Post/BattlePost/BattlePost';
import {Grid, Divider} from '@material-ui/core/';

import Aux from '../../hoc/Auxillary';



const savedPostsList = (props) => {

   
    return (

        <Aux>
        <h4>Characters</h4>
        <Divider  style={{backgroundColor: 'white'}} />
        <div className={styles.ListContainer}>
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
        >
     
    
      

            {props.posts && props.posts.map(post =>{

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

            </Grid>       
        </div>
        <h4>Houses</h4>
        <Divider  style={{backgroundColor: 'white'}} />
        <h4>Battles</h4> 
        <Divider  style={{backgroundColor: 'white'}} />
        </Aux>

    )

};





export default savedPostsList;