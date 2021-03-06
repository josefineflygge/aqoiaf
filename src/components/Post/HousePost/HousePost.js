import React from 'react';
import {Grid, Typography, Card, CardContent, CardMedia} from '@material-ui/core/';
import defaultImg from '../../../assets/images/fort.png';


const HousePost = (props) => {


        return (
            <Grid item>
                    <Card>
                        <CardMedia component="img" src={props.post.image === "null" ? defaultImg : props.post.image}>
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


export default HousePost;