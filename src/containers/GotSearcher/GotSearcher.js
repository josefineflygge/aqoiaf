import React, { Component } from 'react';

import { Button, Select, Input } from 'semantic-ui-react';
import styles from './GotSearcher.module.css';


class GotSearcher extends Component {


    render () {

        const searchCategoryOptions = [
            { key: 'chars', text: 'Characters', value: 'characters' },
            { key: 'houses', text: 'Houses', value: 'houses' },
            { key: 'battles', text: 'Battles', value: 'battles' },
        ];

        return (

            <div className={styles.SearchContainer}>
                <Input size='mini' fluid type='text' placeholder='Select a category and search...' action>
                    <input />
                    <Select compact options={searchCategoryOptions} defaultValue='characters' />
                    <Button type='submit'>Search</Button>
                </Input>
            </div>
        )
    }
}




export default GotSearcher;