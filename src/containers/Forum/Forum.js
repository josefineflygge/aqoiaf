import io from 'socket.io-client';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Button, Form, Segment, TextArea} from 'semantic-ui-react';
import styles from './Forum.module.css';
import {Card, CardHeader, CardContent, Avatar, Typography, Grid} from '@material-ui/core';
import {Redirect} from 'react-router-dom';


const socketUrl = "http://83.227.100.168:42132";

class Forum extends Component {


   
    state = {
        socket: null,
        msgList: []
    }

   

    componentDidMount(){
  
        const socket = io.connect(socketUrl);
        this.setState({socket: socket});

        socket.on('connect', function() {
           
           socket.emit('create_socket', connect);
       
        });

        socket.on('fetch msgs', function(msgData) {

            this.setState({msgList: msgData})

        }.bind(this)); 


        socket.on('message from server', function(msgData) {


            console.log("msg data: ", msgData)

            this.setState({
                msgList: [...this.state.msgList, msgData]
            })
              
            
        }.bind(this));
 
    }


    sendMessage = () =>{
       

        //e.preventDefault(); //don't refresh on submit
        let day = new Date().getDate();
        let month = new Date().getMonth();
        let year = new Date().getFullYear();
        let hours = new Date().getHours();
        let mins = new Date().getMinutes();
        let prettyDate = year + '/' + month + '/' + day + ' ' + hours + ':' + mins;

        let msg = {
          name: this.props.profile.firstName + " " + this.props.profile.lastName,
          date: prettyDate,
          content: this.state.content
        }

        let socket = this.state.socket;
        socket.emit('incoming message',  msg);
    }

    handleChange = (e) => {
    
        this.setState({
            content: e.target.value
        })


    }

    handleSubmit = (e) => {
       
        e.preventDefault();
        this.sendMessage();
        this.setState({message: ""})
    }

   

    render () {

        if(!this.props.auth.uid) {
            return <Redirect to="/"></Redirect>
        } 


        return (
        <div className={styles.Container}>
            <h3>Discussion Forum</h3>


        <div className={styles.Grid}>
           <Grid container spacing={10}  justify="center" >
                <Grid item xs={12} sm={6} lg={6} style={{ borderRight: '0.03em solid white', padding: '0.5em' }}>
                <h4>Post a comment below</h4>
                <Form size='large' onSubmit={this.handleSubmit} className={styles.Form}>
                <Segment stacked>
                <Form.Field control={TextArea} value={this.state.message} label='Commment' placeholder='I think the latest epsidoe was...' onChange={this.handleChange} />
                  <Button type='submit' color='grey' fluid size='large'>
                    Post
                  </Button>
                </Segment>
               
              </Form>
                </Grid>
                <Grid item xs={12} sm={6} lg={6} className={styles.Feed}>
                        {this.state.msgList && this.state.msgList.slice(0).reverse().map((comment) => { return(
                        
                                <Card key={comment.id} className={styles.Comment}>
                                <CardHeader
                                        avatar={
                                        <Avatar>
                                            {comment.name[0]}
                                        </Avatar>
                                        }
                                title={comment.name}
                                subheader={comment.date}
                                />
                                <CardContent >
                                    <Typography className={styles.Content}>
                                {comment.content}
                                </Typography>
                                </CardContent>
                            </Card>
                        
                            );}
                            )}
                </Grid>
            </Grid>
            </div>
           </div>
        )
    }
}

//To acess the redux store's state in this component
const mapStateToProps = (state) => {

    return{
      profile: state.firebase.profile,
      auth: state.firebase.auth,
    }

}

export default connect(mapStateToProps)(Forum);