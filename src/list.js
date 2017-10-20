import React from 'react';
import fetch from 'node-fetch';

const API_KEY = `86MLL630E3X98X0D`;

class List extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            track: null,
            isPlaying: false
        }
    }

    fetchTracks(id) {
        fetch(`http://freemusicarchive.org/services/track/single/${id}.json?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(track => this.setState({track}))
    }
    
    render() {
        const {tracks} = this.props;

        return(
            <div>
            <h2> Tracks: #{tracks.length}</h2>
            <ul>
                {tracks.map(track => {
                    const lastSquareBracket = track.indexOf(']'),
                        lastRoundBracket = track.lastIndexOf('(');

                    return {
                        artist: track.slice(1, lastSquareBracket),
                        id: track.slice(lastRoundBracket + 1, -1),
                        name: track.slice(lastSquareBracket + 1, lastRoundBracket)
                    }
                }).map((track, index) => {
                    const {artist, name, id} = track;

                    return (
                        <li key={index}
                        onClick={this.fetchTracks.bind(this, id)}>
                            Artist name:
                            <strong>
                                {artist}
                            </strong>
                            <br/>
                            Track name:
                            <i>
                                {name}
                            </i>
                        </li>
                    )
                })}
            </ul>
            <audio controls
                src={this.state.track && this.state.track.track_listen_url}>
            </audio>
            </div>
        )
    }
}

export default List;