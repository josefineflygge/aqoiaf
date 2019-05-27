import React from 'react';
import {Grid, Typography, Card, CardContent, CardMedia} from '@material-ui/core/';
import defaultImg from '../../../assets/images/battle.png';


const BattlePost = (props) => {


        return (
            <Grid item>
                    <Card>
                        <CardMedia component="img" src={defaultImg}>
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


export default BattlePost;