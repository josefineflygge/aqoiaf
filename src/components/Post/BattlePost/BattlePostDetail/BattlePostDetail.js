import React, {Component} from 'react';
import axios from 'axios';
import {Grid, Image, Icon, Button} from 'semantic-ui-react';
import styles from './BattlePostDetail.module.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import defaultImg from '../../../../assets/images/battle.png';

class BattlePostDetail extends Component {

 
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
  
  //fetch character details from external API
  axios.get("https://api.got.show/api/show/battles/" + name)
  .then(res => {

      let battleData = res.data; 
      console.log("battledata: ", battleData )
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

      console.log("Battle info: ", self.state);
    }
  ).catch(err => {
    console.log("no such battle");
    this.setState({noResult: true});
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
    axios.get("https://api.got.show/api/show/battles/" + name)
    .then(res => {

        let battleData = res.data; 
        console.log("battledata: ", battleData )
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

        console.log("Battle info: ", self.state);
      }
    ).catch(err => {
      console.log("no such battle");
      this.setState({noResult: true});
    })


  }
    
}

savePostToProfileHandler = () =>{


  //save
  if(this.state.saved === false){

      //Add new post to users table in content DB
      axios.get("http://83.227.100.168:42132/addpost/U_" + this.props.auth.uid + "/" + this.state.id + "/battle/" + this.state.name + "/" + encodeURIComponent(this.state.imgUrl))
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

    {this.state.noResult ? (<div><h4>Sorry, there's no battle named "{this.state.name}"...</h4>
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
          <p><b>Conflict: </b>{info.conflict}</p>
          <p><b>Faction 1: </b>{info.factionsOne && info.factionsOne.map(one => one + ", " )}</p>
          <p><b>Commander: </b> {info.commandersOne && info.commandersOne.map(com => com + ", " )}</p> 
          <p><b>Forces: </b> {info.forcesOne && info.forcesOne.map(force => force + ", " )}</p> 
          < br/>

          <p><b>Faction 2: </b> {info.factionsTwo && info.factionsTwo.map(two => two + ", " )}</p> 
          <p><b>Commander: </b> {info.commandersTwo && info.commandersTwo.map(com_ => com_ + ", " )}</p> 
          <p><b>Forces: </b> {info.forcesTwo && info.forcesTwo.map(force_ => force_ + ", " )}</p> 
          < br/>

          <p><b>Casualties: </b> {info.casulaties && info.casulaties.map(cas => cas + "," )}</p>
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


export default connect(mapStateToProps)(BattlePostDetail);
