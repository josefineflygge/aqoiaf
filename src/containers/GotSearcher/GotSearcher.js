import React, { Component } from 'react';

import { Button, Select, Input } from 'semantic-ui-react';
import styles from './GotSearcher.module.css';

import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';

    const dummysearchoptions = [
        {
        name: 'Arya',
        house: 'House Stark'
        },
        {
        name: 'Dany',
        house: 'House Targaryen'
        },
        {
            name: 'Jon',
            house: 'House Stark'
        },
        {
            name: 'Jorah',
            house: 'House Mormont'
        },
    ];

    // Teach Autosuggest how to calculate suggestions for any given input value.
    const getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
    
        return inputLength === 0 ? [] : dummysearchoptions.filter(lang =>
        lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    const renderSuggestion = (suggestion, {query}) => {
        
        const suggestionText = `${suggestion.name}`;
        const matches = AutosuggestHighlightMatch(suggestionText, query);
        const parts = AutosuggestHighlightParse(suggestionText, matches);
      
        return (
            <span>{suggestion.name}</span>
        );
    };

    const getSuggestionValue = suggestion => suggestion.name;


class GotSearcher extends Component {

    state = {

        value: '',
        suggestions: []
    }

    onChange = (event, { newValue }) => {
        this.setState({
          value: newValue
        });
      };

      onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
          suggestions: getSuggestions(value)
        });
      };
    
      // Autosuggest will call this function every time you need to clear suggestions.
      onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
      };




    render () {

        const searchCategoryOptions = [
            { key: 'chars', text: 'Characters', value: 'characters' },
            { key: 'houses', text: 'Houses', value: 'houses' },
            { key: 'battles', text: 'Battles', value: 'battles' },
        ];

        const { value, suggestions } = this.state;

        const inputProps = {
            placeholder: 'Search for a character',
            value,
            onChange: this.onChange
          };

          
        return (

        


            <div className={styles.SearchContainer}>
               {/* <Input size='mini' fluid type='text' placeholder='Select a category and search...' action>
                    <input />
                    <Select compact options={searchCategoryOptions} defaultValue='characters' />
                    <Button type='submit'>Search</Button>
                    </Input> */}

                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                    highlightFirstSuggestion={true}
                    theme={styles}
                />
            </div>
        )
    }
}




export default GotSearcher;