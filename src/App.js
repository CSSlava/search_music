import React from 'react';
import fetch from 'node-fetch';

import Search from './search';
import List from './list';


class App extends React.Component {
    constructor() {
        super();
        
        this.state = {
            search: 'Nirvana',
            tracks: []
        }
    }
    
    searchHandler = e => {
        const {value} = e.target;
        
        this.setState({
            search: value
        });
    };

    onSearch = () => {
        fetch(`https://freemusicarchive.org/api/trackSearch?q=${this.state.search}&limit=20`)
            .then(response => response.json())
            .then(tracks => this.setState({
                tracks: tracks.aRows
            }))
    }

    componentDidMount() {
        this.onSearch();
    }
    
    render() {
        return(
            <section>
                <Search source={this.state.search}
                handler={this.searchHandler}
                startSearch={this.onSearch}/>
                <List tracks={this.state.tracks}/>
            </section>
        )
    }
}


export default App;
