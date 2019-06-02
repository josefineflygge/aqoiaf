import React, {Component} from 'react';
import axios from 'axios';
import {Grid, Image, Icon, Button} from 'semantic-ui-react';
import styles from './HousePostDetail.module.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import defaultImg from '../../../../assets/images/fort.png';
import shuffle from 'shuffle-array';
import Loader from '../../../Loader/Loader';
import {Divider, Snackbar, IconButton} from '@material-ui/core';

class HousePostDetail extends Component {

  state = {
      saved: false,
      noResult: false,
      isLoading: true,
      open: false,
      snackbarMessage:""
  }


  componentDidMount(){

    this.fetchHouseInfo();

  }


  componentDidUpdate(){
   
    if(this.props.match.params.name !== this.state.name){

      this.fetchHouseInfo();

    }
      
  }

  fetchHouseInfo = () => {


    let self = this;
    self.setState({isLoading: true});
    let name = this.props.match.params.name;
    this.setState({name: name});
    
    const objectInSavedPosts = this.props.savedPosts.find( obj => obj.name === name );
    if(objectInSavedPosts){
    this.setState({saved: true})
    }else{
    this.setState({saved: false})
    }
    
    

    //fetch house details from external API
    axios.all([
    axios.get("https://api.got.show/api/show/houses/" + name),
    axios.get('https://api.got.show/api/show/characters/byHouse/' + name)
    ]).then(axios.spread(function (house, chars) {

      let houseData = house.data; 
      let charData = chars.data;

      /*console.log("house data", houseData)
      console.log("char data", houseData)*/

      let relatedChars = charData;
    
      //random characters from related list
      if(charData.length >= 4){
        charData = shuffle(charData);
        relatedChars = [
        charData[0], 
        charData[1],
        charData[2],
        charData[3]]
      }

      let updatedAt = houseData[0].updatedAt.substr(0, houseData[0].updatedAt.indexOf('T'));

      self.setState({
          noResult: false,
          id: houseData[0]._id,
          name: houseData[0].name,
          seat: houseData[0].seat || null,
          region: houseData[0].region || null, 
          religion: houseData[0].religion || null,
          imgUrl: houseData[0].logoURL || null,
          words: houseData[0].words || null,
          relatedChars: relatedChars,
          updated: updatedAt
      })

        self.setState({isLoading: false});
    })
    ).catch(err => {
    console.log("Error:", err);
    self.setState({noResult: true});
    self.setState({isLoading: false});
    })


  }

  savePostToProfileHandler = () =>{


    //save
    if(this.state.saved === false && this.props.auth.uid){

        let body = {
          userid: "U_"+this.props.auth.uid,
          postid: this.state.id,
          type: 'house',
          name: this.state.name,
          img: encodeURIComponent(this.state.imgUrl)
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
            <p><b>Words:</b>{info.words}</p>
            <p><b>Seat: </b> {this.textFormat(info.seat)}</p> 
            <p><b>Region: </b> {this.textFormat(info.region)}</p>
            <p> <b>Religion: </b>{this.textFormat(info.religion)}</p>
            <Divider style={{backgroundColor: 'white', marginBottom: '10px'}} />
            <b>Related characters:    {info.relatedChars && info.relatedChars.map((obj,idx) =>{
                return(    
                  <Link className={styles.relatedLink} key={obj._id} to={'/character/' + obj.name}>
                  {obj.name}{idx < info.relatedChars.length - 1 ? ', ' : ''}
                  </Link>
                  
                );
              })} </b> 
              <p className={styles.Date}> Last Updated: {info.updated}</p>
          </Grid.Column>
        </Grid.Row>
    </Grid>



    )
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

      {this.state.noResult ? (<div><h4>Oops. There's no house named "{this.state.name}"...</h4>
                              <Link to="/">
                                <Button  inverted color="grey" icon labelPosition='left'>
                                  Go Home
                                  <Icon name='left arrow' />
                                </Button>
                              </Link></div>) : content 
      }
          
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


export default connect(mapStateToProps)(HousePostDetail);
