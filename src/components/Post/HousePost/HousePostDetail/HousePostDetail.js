import React, {Component} from 'react';
import axios from 'axios';
import {Grid, Image, Icon, Button} from 'semantic-ui-react';
import styles from './HousePostDetail.module.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import defaultImg from '../../../../assets/images/default.png';
import shuffle from 'shuffle-array';

class HousePostDetail extends Component {

  state = {
      saved: false,
      noResult: false,
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
    
    

    //fetch house details from external API
    axios.all([
    axios.get("https://api.got.show/api/show/houses/" + name),
    axios.get('https://api.got.show/api/show/characters/byHouse/' + name)
    ]).then(axios.spread(function (house, chars) {

      let houseData = house.data; 
      let charData = chars.data;

      console.log("house data", houseData)
      console.log("char data", charData)

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
        console.log("House info: ", self.state);
    })).catch(err => {
    console.log("error", err);
    self.setState({noResult: true});
    });

    
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
        
        
  
        //fetch house details from external API
        axios.all([
        axios.get("https://api.got.show/api/show/houses/" + name),
        axios.get('https://api.got.show/api/show/characters/byHouse/' + name)
        ]).then(axios.spread(function (house, chars) {

          let houseData = house.data; 
          let charData = chars.data;

          console.log("house data", houseData)
          console.log("char data", houseData)

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
            console.log("House info: ", self.state);
        })
        ).catch(err => {
        console.log("no such house");
        self.setState({noResult: true});
        })

    }
      
  }

  savePostToProfileHandler = () =>{


    //save
    if(this.state.saved === false){

        //Add new post to users table in content DB
        axios.get("http://83.227.100.168:42132/addpost/U_" + this.props.auth.uid + "/" + this.state.id + "/house/" + this.state.name + "/" + encodeURIComponent(this.state.imgUrl))
        .then(res => {
            console.log("[savePostToProfileHandler] : ", res)
            this.setState({saved: true})
            }
        )
    }

    //unsave
    else{

      //delete post from users table in content DB
      axios.get("http://83.227.100.168:42132/deletepost/U_" + this.props.auth.uid + "/" + this.state.id)
      .then(res => {
          console.log("[savePostToProfileHandler] : ", res)
          this.setState({saved: false})
          }
      )
  }

  }
  

  render(){


    let info = this.state;
    let saveIconColor = this.state.saved ? 'yellow' : 'grey';
    
    return (

      <div className={styles.Container}>

      {this.state.noResult ? (<div><h4>Shame, shame, shame. There's no house named "{this.state.name}"...</h4>
                              <Link to="/">
                                <Button  inverted color="grey" icon labelPosition='left'>
                                  Go Home
                                  <Icon name='left arrow' />
                                </Button>
                              </Link></div>) : 
      (
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
            <p><b>Words:</b> {info.words}</p>
            <p><b>Seat: </b> {info.seat && info.seat.map(seat => seat + ", " )}</p> 
            <p><b>Region: </b> {info.region && info.region.map(reg => reg )}</p>
            <p> <b>Religion: </b> {info.religion && info.religion.map(rel => rel )}</p>
            <b>Related characters:    {info.relatedChars && info.relatedChars.map(char =>{
                return(    
                            <Link className={styles.relatedLink} key={char.id} to={'/character/' + char.name}>
                              {char.name}
                            </Link>
                  
                );
              })} </b> 
              <p className={styles.Date}> Last Updated: {info.updated}</p>
          </Grid.Column>
        </Grid.Row>
    </Grid>)
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
