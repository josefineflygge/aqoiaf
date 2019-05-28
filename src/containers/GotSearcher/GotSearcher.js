import React, { Component } from 'react';

import styles from './GotSearcher.module.css';
import {Input} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';

import {setOptions} from '../../store/actions/searchActions';
import {connect} from 'react-redux';

import Autosuggest from 'react-autosuggest';

import axios from 'axios';


class GotSearcher extends Component {

    state = {
        value: '',
        suggestions: [],
        //optionList: [],
        focusedOption: '',
        redirect: null
    }


    //Fetch the possible searchoptions
    componentDidMount = () => {

        //this is something else within axios req
        let self = this;

        axios.all([
            axios.get('https://api.got.show/api/show/characters'),
            axios.get('https://api.got.show/api/show/houses'),
            axios.get('https://api.got.show/api/show/battles')
          ])
          .then(axios.spread(function (characters, houses, battles) {

            let charList = characters.data.map((character) => {
                      return  {name: character.name, type: 'character'}
                });


            let houseList = houses.data.map((house) => {
                return  {name: house.name, type: 'house'}
          });
            
            let battleList =  battles.data.map((battle) => {
                return  {name: battle.name, type: 'battle'}
          });

      
          self.props.setOptions(charList, battleList, houseList);


          }))
          .catch(error => console.log(error));

    };

     // Teach Autosuggest how to calculate suggestions for any given input value.
    getSuggestions = (value) => {


        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        if (inputLength === 0) {
            return [];
          }
    
        let suggestList = Object.assign([], this.props.optionList);

        return suggestList.map(section => {
                return {
                    title: section.title,
                    options: section.options.filter(option => option.name.toLowerCase().slice(0, inputLength) === inputValue)
                };
            })
            .filter(section => section.options.length > 0); 

            
    };

    getSuggestionValue(suggestion) {
        this.setState({focusedOption: suggestion});
        return suggestion.name;
    }
      
      renderSuggestion(suggestion) {
        return (
          React.createElement("span", null, suggestion.name));
      
      }
      
      renderSectionTitle(section) {
        return (
          React.createElement("strong", null, section.title));
      
      }

      renderInputComponent = inputProps => (

                 <Input {...inputProps} size='mini' fluid type='text' action={{ 
                    icon: "search",
                    onClick: () => {this.handleSearch()}
                  }} />
      );
      
      getSectionSuggestions(section) {
        return section.options;
      }
      

    onChange = (event, { newValue, method }) => {
        this.setState({
          value: newValue
        });
      };

      onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
          suggestions: this.getSuggestions(value)
        });
      };
    
      // Autosuggest will call this function every time you need to clear suggestions.
      onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
      };

      //User pressed search button or enter when character selected
      handleSearch = () => {
        this.setState({redirect: this.state.focusedOption});

      }

    render () {

        const { value, suggestions } = this.state;

        const inputProps = {
            placeholder: 'Search for a character, house or battle',
            value,
            onChange: this.onChange
          };

         let redirectLink = null;
         
         if(this.state.redirect){

          switch(this.state.redirect.type){

            case 'character':
              redirectLink = <Redirect to={"/character/" + this.state.redirect.name}></Redirect>
              break;

            case 'house':
              redirectLink = <Redirect to={"/house/" + this.state.redirect.name}></Redirect>
              break;

            case 'battle':
              redirectLink = <Redirect to={"/battle/" + this.state.redirect.name}></Redirect>
              break;
            
            default:
              redirectLink = null;
              break;

          }

          return redirectLink;
         }

          
        return (


            <div className={styles.SearchContainer}>

                <Autosuggest
                    multiSection={true}
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue.bind(this)}
                    renderInputComponent={this.renderInputComponent}
                    renderSuggestion={this.renderSuggestion}
                    renderSectionTitle={this.renderSectionTitle}
                    getSectionSuggestions={this.getSectionSuggestions}
                    inputProps={inputProps}
                    highlightFirstSuggestion={true}
                    theme={styles}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {

  return{
   optionList: state.search.optionList,
  }

}

const mapDispatchToProps = (dispatch) => {

  return {
    setOptions: (chars, battles, houses) => dispatch(setOptions(chars, battles, houses))
  }

}




export default connect(mapStateToProps, mapDispatchToProps)(GotSearcher);