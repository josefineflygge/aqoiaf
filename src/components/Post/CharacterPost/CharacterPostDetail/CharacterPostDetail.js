import React, {Component} from 'react';
import axios from 'axios';
import {Grid, Image, Icon, Button} from 'semantic-ui-react';
import styles from './CharacterPostDetail.module.css';
import shuffle from 'shuffle-array';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import defaultImg from '../../../../assets/images/person.png';
import Loader from '../../../Loader/Loader';
import {Divider, Snackbar, IconButton} from '@material-ui/core';

class CharacterPostDetail extends Component {

  state = {
      saved: false,
      noResult: false,
      isLoading: true,
      open: false,
      snackbarMessage: ""
  }


  componentDidMount(){


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
    axios.get("https://api.got.show/api/show/characters/" + name)
    .then(res => {

        let charData = res.data; 
        let relatedData = charData.related;
        
        //random characters from related list
        if(charData.related.length >= 4){
          charData.related = shuffle(charData.related);
          relatedData = [
          charData.related[0], 
          charData.related[1],
          charData.related[2],
          charData.related[3]]
        }

        let updatedAt = charData.updatedAt.substr(0, charData.updatedAt.indexOf('T'));


        self.setState({
          noResult: false,
            id: charData.id,
            name: charData.name,
            age: charData.age || null,
            titles: charData.titles || null, 
            house: charData.house || null,
            imgUrl: charData.image || null,
            origin: charData.origin || null,
            siblings: charData.siblings || null,
            lovers: charData.lovers || null,
            mother: charData.mother|| null,
            father: charData.father|| null,
            allegiances: charData.allegiances|| null,
            culture: charData.culture || null,
            related: relatedData || null,
            updated: updatedAt
        })

        self.setState({isLoading: false});

      }
    ).catch(err => {
      console.log("Error: ", err);
      self.setState({noResult: true});
      self.setState({isLoading: false});
    })

    
  }


  componentDidUpdate(){

    if(this.props.match.params.name !== this.state.name){

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
    axios.get("https://api.got.show/api/show/characters/" + name)
    .then(res => {

  
        let charData = res.data;
        
        let relatedData = charData.related;
        
        //random characters from related list
        if(charData.related.length >= 4){
          charData.related = shuffle(charData.related);
          relatedData = [charData.related[0], 
          charData.related[1],
          charData.related[2],
          charData.related[3]]
        }

        let updatedAt = charData.updatedAt.substr(0, charData.updatedAt.indexOf('T'));

        self.setState({
            noResult: false,
            id: charData.id,
            name: charData.name,
            age: charData.age || null,
            titles: charData.titles || null, 
            house: charData.house || null,
            imgUrl: charData.image || null,
            origin: charData.origin || null,
            siblings: charData.siblings || null,
            lovers: charData.lovers || null,
            mother: charData.mother|| null,
            father: charData.father|| null,
            allegiances: charData.allegiances|| null,
            culture: charData.culture || null,
            related: relatedData || null,
            updated: updatedAt
        })

        self.setState({isLoading: false});

      }).catch(err => {
        console.log("Error", err)
        this.setState({noResult: true});
        self.setState({isLoading: false});
      }
    )

    }
      
  }

  savePostToProfileHandler = () =>{


    //save
    if(this.state.saved === false && this.props.auth.uid){

        //Add new post to users table in content DB
        axios.get("http://83.227.100.168:42132/addpost/U_" + this.props.auth.uid + "/" + this.state.id + "/character/" + this.state.name + "/" + encodeURIComponent(this.state.imgUrl))
        .then(res => {
            console.log(res)
            this.setState({saved: true, snackbarMessage: "Post saved to profile!" })
            this.handleOpen();
            }
        )
    }

    //unsave
    if(this.state.saved === true && this.props.auth.uid){

      //delete post from users table in content DB
      axios.get("http://83.227.100.168:42132/deletepost/U_" + this.props.auth.uid + "/" + this.state.id)
      .then(res => {
          console.log(res)
          this.setState({saved: false, snackbarMessage: "Post removed from profile!" })
          this.handleOpen();
          }
      )
  }

  if(!this.props.auth.uid){

    this.setState({saved: false, snackbarMessage: "Only logged in users can save posts." })
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

      content = (
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
              <h4><Link className={styles.relatedLink} to={'/house/' + info.house}>{info.house}</Link></h4>
              <p><b>Age:</b> {info.age ? info.age.age : ""}</p>
              <p><b>Titles: </b> {this.textFormat(info.titles)} </p>
              <p><b>Origin: </b> {this.textFormat(info.origin)}</p>
              <p> <b>Siblings: </b> {this.textFormat(info.siblings)}</p>
              <p> <b>Lovers: </b> {this.textFormat(info.lovers)}</p>
              <p><b>Parents: </b>{info.father} {info.mother}</p>
              <p><b>Allegiances: </b>{this.textFormat(info.allegiances)} </p>
              <p> <b>Culture: </b>{info.culture}</p>
              <Divider style={{backgroundColor: 'white', marginBottom: '10px'}} />
              <b>Related characters: {info.related && info.related.map((obj,idx) =>{
                  return(    
                              <Link className={styles.relatedLink} key={obj._id} to={'/character/' + obj.name}>
                                {obj.name}{idx < info.related.length - 1 ? ', ' : ''}
                              </Link>
                  );
                })} </b> 
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

      {this.state.noResult ? (<div><h4>Oops. There's no character named "{this.state.name}"...</h4>
                              <Link to="/">
                                <Button  inverted color="grey" icon labelPosition='left'>
                                  Go Home
                                  <Icon name='left arrow' />
                                </Button>
                              </Link></div>) : content}

      
          
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


export default connect(mapStateToProps)(CharacterPostDetail);
