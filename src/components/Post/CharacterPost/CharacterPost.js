import React from 'react';
import {Grid, Typography, Card, CardContent, CardMedia} from '@material-ui/core/';
import defaultImg from '../../../assets/images/person.png';


const CharacterPost = (props) => {


        return (
            <Grid item>
                    <Card>
                        <CardMedia component="img" src={props.post.image === "null" || !props.post.image ? defaultImg : props.post.image}>
                        </CardMedia>
                        <div >
                            <CardContent>
                            <Typography variant="subtitle1" color="textSecondary">
                            {props.post.name}
                            </Typography>
                            </CardContent>
                        </div>
                    </Card>
            </Grid>
        )
}


export default CharacterPost;