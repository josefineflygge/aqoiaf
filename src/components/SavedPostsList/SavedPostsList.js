
import React from 'react';
import {Link} from 'react-router-dom';
import styles from './SavedPostsList.module.css';

import CharacterPost from '../../components/Post/CharacterPost/CharacterPost';
import HousePost from '../../components/Post/HousePost/HousePost';
import BattlePost from '../../components/Post/BattlePost/BattlePost';
import {Grid, Divider} from '@material-ui/core/';
import {Icon} from 'semantic-ui-react';
import Aux from '../../hoc/Auxillary';



const savedPostsList = (props) => {

   
    return (

        <Aux>
        <div className={styles.ListContainer}>

        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
        >

            <Grid item xs={12} sm={12} lg={12}>
                <div className={styles.HeaderContainer}>
                    <h4>
                        <Icon name='chess knight' /> Characters
                    </h4>
                    <Divider style={{backgroundColor: 'white'}} />
                </div>
            </Grid> 
            {props.posts && props.posts
            .filter(post => post.type === "character")
            .map((post) => { return(<div key={post.id} className={styles.cardContainer}>
                                    <Link to={'/character/' + post.name}>
                                        <CharacterPost post={post} key={post.id} />
                                    </Link>
                            </div>) }
            )}

            <Grid item xs={12} sm={12} lg={12}>
                <div className={styles.HeaderContainer}>
                    <h4>
                        <Icon name='chess rook' /> Houses
                    </h4>
                    <Divider  style={{backgroundColor: 'white'}} />
                </div>
            </Grid> 
            {props.posts && props.posts
            .filter(post => post.type === "house")
            .map((post) => { return(<div key={post.id} className={styles.cardContainer}>
                                    <Link to={'/house/' + post.name}><HousePost post={post} key={post.id} /></Link>
                                </div>); }
            )}

            <Grid item xs={12} sm={12} lg={12}>  
                <div className={styles.HeaderContainer}> 
                        <h4>
                            <Icon name='shield alternate' /> Battles
                        </h4>
                        <Divider style={{backgroundColor: 'white'}} />
                </div>
            </Grid>      
            {props.posts && props.posts
            .filter(post => post.type === "battle")
            .map((post) => { return(<div key={post.id} className={styles.cardContainer}>
                                    <Link to={'/battle/' + post.name}><BattlePost post={post} key={post.id} /></Link>
                                </div>); }
            )}

        </Grid>       
        </div>
        </Aux>

    )

};





export default savedPostsList;