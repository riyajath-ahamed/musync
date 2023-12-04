export const actionType = {
    SET_USER : "SET_USER",
    SET_ALL_USERS : "SET_ALL_USERS",
    SET_ALL_ARTISTS : "SET_ALL_ARTISTS",
    SET_ALL_ALBUMS : "SET_ALL_ALBUMS",
    SET_ALL_SONGS : "SET_ALL_SONGS",
    SET_NEW_SONGS : "SET_NEW_SONGS",

    //filter types 
    SET_FILTER_TERM : "SET_FILTER_TERM",
    SET_ARTIST_FILTER : "SET_ARTIST_FILTER",
    SET_GENRE_FILTER : "SET_GENRE_FILTER",
    SET_MATRIXPOINT_FILTER : "SET_MATRIXPOINT_FILTER",
    SET_ALBUM_FILTER : "SET_ALBUM_FILTER",

    SET_PLAYLIST : "SET_PLAYLIST",

    SET_ALERT_TYPE : "SET_ALERT_TYPE",

    SET_ISSONG_PLAYING : "SET_ISSONG_PLAYING",
    SET_SONG_INDEX : "SET_SONG_INDEX",

    SET_SEARCH_TERM: "SET_SEARCH_TERM",
}

const reducer = (state, action) => {

    console.log(action);
    
    const { songId,name, songURL, imageURL, album, artist, genre } = action; 
    console.log("song id is ", songId);
    switch (action.type) {
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user,
            };

        case actionType.SET_ALL_USERS:
            return {
                ...state,
                allUsers: action.allUsers,
            };

        case actionType.SET_ALL_SONGS:
            return {
                ...state,
                allSongs: action.allSongs,
            };

        case actionType.SET_NEW_SONGS:
                return {
                    ...state,
                    newSongs: action.newSongs,
                }

        case actionType.SET_ALL_ALBUMS:
            return {
                ...state,
                allAlbums: action.allAlbums,
            };

        case actionType.SET_ALL_ARTISTS:
            return {
                ...state,
                allArtists: action.allArtists,
            };
            //filter cases
        case actionType.SET_FILTER_TERM:
            return {
                ...state,
                filterTerm: action.filterTerm,
            };

        case actionType.SET_ARTIST_FILTER:
            return {
                ...state,
                artistFilter: action.artistFilter,
            };

        case actionType.SET_GENRE_FILTER:

            return {
                ...state,
                genreFilter: action.genreFilter,
            };

        case actionType.SET_MATRIXPOINT_FILTER:
            return {
                ...state,
                matrixpointFilter: action.matrixpointFilter,
            };

        case actionType.SET_ALBUM_FILTER:
            return {
                ...state,
                albumFilter: action.albumFilter,
            };

        case actionType.SET_ALERT_TYPE:
            return {
                ...state,
                alertType: action.alertType,
            };

        case actionType.SET_ISSONG_PLAYING:
            return {
                ...state,
                    isSongPlaying: action.isSongPlaying,
            };

        case actionType.SET_SONG_INDEX:
            //const { csongId,cname, csongURL, cimageURL, calbum, cartist, cgenre } = action; // Assuming action contains all required properties
            const currentSong = {
                id: songId,
                songURL: songURL,
                name: name,
                imageURL: imageURL,
                album: album,
                artist: artist,
                genre: genre
            };
            console.log("current song is ", currentSong);
            return {
                ...state,
                songIndex: action.songIndex,
            };

        case actionType.SET_PLAYLIST:
            // Assuming action contains all required properties
            const newSong = {
                id: songId,
                songURL: songURL,
                name: name,
                imageURL: imageURL,
                album: album,
                artist: artist,
                genre: genre
            };
            return {
                ...state,
                playlist: [...state.playlist, newSong],
            };
            
        case actionType.SET_SEARCH_TERM:
            return {
                ...state,
                searchTerm: action.searchTerm,
            };

        case actionType.SET_FILTER_TERM:
                return {
                  ...state,
                  filterTerm: action.filterTerm,
                };
        

        default:
            return state;
    }


};

export default reducer;