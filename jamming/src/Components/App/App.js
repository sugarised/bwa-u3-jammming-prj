import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [{
          name: 'Where\'s the love',
          artist: 'Hanson',
          album: 'Middle of nowhere'
        },
      {
        name: 'Everything Changes',
        artist: 'Take That',
        album: 'Everything Changes'
      }],
        playlistName: 'Playlist 1',
        playlistTracks: [{
            name: 'Twin Skeletons',
            artist: 'Fall Out Boy',
            album: 'American/Psycho'
          },
          {
            name: 'Victorious',
            artist: 'Panic! At the Disco',
            album: 'Death of a Bachelor'
          },
          {
            name: 'Still into You',
            artist: 'Paramore',
            album: 'Paramore'
          }
        ]
      }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }
  savePlaylist(){
    //Generates an array of uri values called trackURIs from the playlistTracks property.
    const trackUri = this.state.playlistTracks.map(track => track.uri);
    //In a later step, you will pass the trackURIs array and playlistName to a method that will save the user's playlist to their account.
    Spotify.savePlaylist(this.state.playlistName, trackUri).then(()=> {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    });
  }
  search(term){
    console.log(term);
    Spotify.search(term).then(searchResults =>{
      this.setState({searchResults: searchResults});
    });

  }
  addTrack(track){
    let tracks = this.state.playlistTracks;
    //Use the track's id property to check if the current song is in the playlistTracks state.
    tracks.push(track);
    //If the id is new, add the song to the end of the playlist.
    this.setState({playlistTracks: tracks});
    //Set the new state of the playlist
  }

  removeTrack(track){
    //Uses the track's id property to filter it out of playlistTracks
    let tracks = this.seate.playlistTracks
    //Sets the new state of the playlist
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playlistTracks: tracks});
    }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search()}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
                            onAdd={this.addTrack}/>
            <Playlist playlistTracks={this.state.playlistTracks}
            playlistName={this.state.playlistName}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
