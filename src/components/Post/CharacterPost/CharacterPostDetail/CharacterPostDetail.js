import React, {Component} from 'react';
import axios from 'axios';
import {Grid, Image, Icon, Button} from 'semantic-ui-react';
import styles from './CharacterPostDetail.module.css';
import shuffle from 'shuffle-array';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import defaultImg from '../../../../assets/images/default.png';
class CharacterPostDetail extends Component {

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
            related: relatedData || null,
            updated: updatedAt
        })

        console.log("Character info: ", self.state);
      }
    ).catch(err => {
      console.log("no such character");
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
          related: relatedData || null,
          updated: updatedAt
      }).catch(err => {
        this.setState({noResult: true});
      })
      
      }
    )

    }
      
  }

  savePostToProfileHandler = () =>{


    //save
    if(this.state.saved === false){

        //Add new post to users table in content DB
        axios.get("http://83.227.100.168:42132/addpost/U_" + this.props.auth.uid + "/" + this.state.id + "/character/" + this.state.name + "/" + encodeURIComponent(this.state.imgUrl))
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

      {this.state.noResult ? (<div><h4>Sorry, there's no character named "{this.state.name}"...</h4>
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
            <h4>{info.house}</h4>
            <p><b>Age:</b> {info.age ? info.age.age : ""}</p>
            <p><b>Titles: </b> {info.titles && info.titles.map(title => title + ", " )}</p> 
            <p><b>Origin: </b> {info.origin && info.origin.map(ori => ori )}</p>
            <p> <b>Siblings: </b> {info.siblings && info.siblings.map(sibling => sibling )}</p>
            <p><b>Parents: </b>{info.father} {info.mother}</p>
            <p><b>Allegiances: </b>{info.allegiances && info.allegiances.map(alle => alle )} </p>
            <p> <b>Culture: </b>{info.culutre}</p>
            <b>Related characters:    {info.related && info.related.map(obj =>{
                return(    
                            <Link className={styles.relatedLink} key={obj._id} to={'/character/' + obj.name}>
                              {obj.name}
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


export default connect(mapStateToProps)(CharacterPostDetail);
