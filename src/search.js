import React from 'react';

class Search extends React.Component {
    render() {
        const {source, handler, startSearch} = this.props;

        return(
            <div>
                <input type="text"
                value={source}
                onChange={handler}/>
                <button onClick={startSearch}>
                    SEARCH
                    {source && ':'}
                    
                    {source.toUpperCase()}
                </button>
            </div>
        )
    }
}

export default Search;