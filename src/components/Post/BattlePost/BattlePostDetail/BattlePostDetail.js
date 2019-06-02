import React, {Component} from 'react';
import axios from 'axios';
import {Grid, Image, Icon, Button} from 'semantic-ui-react';
import styles from './BattlePostDetail.module.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import defaultImg from '../../../../assets/images/battle.png';
import Loader from '../../../Loader/Loader';
import {Divider, Snackbar, IconButton} from '@material-ui/core';

class BattlePostDetail extends Component {

 
  state = {
    saved: false,
    noResult: false,
    isLoading: true,
    open: false,
    snackbarMessage: ""
  }


  componentDidMount(){

    this.fetchBattleInfo();

}


componentDidUpdate(){

  if(this.props.match.params.name !== this.state.name){
    
     this.fetchBattleInfo();

  }
    
}

fetchBattleInfo = () => {

  let self = this;
  let name = this.props.match.params.name;
  this.setState({name: name});


  const objectInSavedPosts = this.props.savedPosts.find( obj => obj.name === name );
  if(objectInSavedPosts){
    this.setState({saved: true})
  }else{
    this.setState({saved: false})
  }

  //fetch character details from external API
  axios.get("https://api.got.show/api/show/battles/" + name)
  .then(res => {

      let battleData = res.data; 
      let updatedAt = battleData[0].updatedAt.substr(0, battleData[0].updatedAt.indexOf('T'));

    self.setState({
        noResult: false,
        id: battleData[0]._id,
        name: battleData[0].name,
        place: battleData[0].place || null,
        facionsOne: battleData[0].factionsOne || null, 
        factionsTwo: battleData[0].factionsTwo || null,
        commandersOne: battleData[0].commandersOne || null,
        commandersTwo: battleData[0].commandersTwo || null,
        conflict: battleData[0].conflict || null,
        forcesOne: battleData[0].forcesOne || null,
        forcesTwo: battleData[0].forcesTwo|| null,
        casualties: battleData[0].casualties|| null,
        updated: updatedAt
    })

      self.setState({isLoading: false});

    }
  ).catch(err => {

    console.log("Error: ", err);
    this.setState({noResult: true});
    self.setState({isLoading: false});

  })




}

savePostToProfileHandler = () =>{


  //save
  if(this.state.saved === false && this.props.auth.uid){

      let body = {
        userid: "U_"+this.props.auth.uid,
        postid: this.state.id,
        type: 'battle',
        name: this.state.name,
        img: null
      };


      axios.post('http://83.227.100.168:42132/addpost', body)
      .then(res => {
        console.log(res)
        this.setState({saved: true, snackbarMessage: "Post saved to profile!"})
        this.handleOpen();
      })
  }



  //unsave
  if(this.state.saved === true && this.props.auth.uid){

    let body = {
      userid: "U_"+this.props.auth.uid,
      postid: this.state.id,
    };


    axios.delete('http://83.227.100.168:42132/deletepost', {data: body})
    .then(res => {
      console.log(res)
        this.setState({saved: false, snackbarMessage: "Post removed from profile!" })
        this.handleOpen();
    })
  }

  
  if(!this.props.auth.uid){

    this.setState({snackbarMessage: " Only logged in users can save posts."})
    this.handleOpen();

  }

}


handleOpen = () => this.setState({ open: true })

handleClose = () => this.setState({ open: false })

textFormat(list){

  let formatted = "";

  if(list){
    
  formatted = list.map((obj,idx) =>
  <span key={idx}>{obj}{idx < list.length - 1 ? ', ' : ''}</span> )
  }


  return formatted;

}


render(){

  let info = this.state;
  let saveIconColor = this.state.saved ? 'yellow' : 'grey';

  
  let content = null;

  if(this.state.isLoading){
    content = <Loader />
  }
  else{
    content =    (
      <Grid stackable centered verticalAlign="top"> {/* inverted divided="horizontally"  */}
          <Grid.Row>
            <Grid.Column width={4}>
              <Image
                label={{ as: 'a', color: saveIconColor, corner: 'right', icon: 'star', onClick:this.savePostToProfileHandler }}
                src={this.state.imgUrl || defaultImg}>
              </Image>
            </Grid.Column>
            <Grid.Column width={5}>
    
              <h2>{info.name}</h2>
              <p><b>Conflict: </b>{info.conflict}</p>
              <p><b>Faction 1: </b>{this.textFormat(info.facionsOne)}</p>
              <p><b>Commander: </b> {this.textFormat(info.commandersOne)}</p> 
              <p><b>Forces: </b> {this.textFormat(info.forcesOne)}</p> 
    

              <Divider style={{backgroundColor: 'white', marginBottom: '10px'}} />
    
              <p><b>Faction 2: </b> {this.textFormat(info.factionsTwo)}</p> 
              <p><b>Commander: </b> {this.textFormat(info.commandersTwo)}</p> 
              <p><b>Forces: </b> {this.textFormat(info.forcesTwo)}</p> 
             
              <Divider style={{backgroundColor: 'white', marginBottom: '10px'}} />
    
              <p><b>Casualties: </b> {this.textFormat(info.casualties)}</p>
                <p className={styles.Date}> Last Updated: {info.updated}</p>
            </Grid.Column>
          </Grid.Row>
      </Grid>);
  }
  
  return (

    <div className={styles.Container}>
      <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          autoHideDuration={2000}
          open={this.state.open}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.snackbarMessage}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <Icon size="small" name="close" />
            </IconButton>,
            ]}
      /> 
      {this.state.noResult ? (<div><h4>Oops. There's no battle named "{this.state.name}"...</h4>
                              <Link to="/">
                                <Button  inverted color="grey" icon labelPosition='left'>
                                  Go Home
                                  <Icon name='left arrow' />
                                </Button>
                              </Link></div>) : content }
    </div>
  )
}

  
}

const mapStateToProps = (state) => {

  return{
    savedPosts: state.savedPosts.posts,
    auth: state.firebase.auth
  }

}


export default connect(mapStateToProps)(BattlePostDetail);
