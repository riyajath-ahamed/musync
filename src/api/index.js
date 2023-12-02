import axios from "axios";

const baseURL = process.env.REACT_APP_API_BACKEND;

export const validateUser= async (token) => {
try {
    const res = await axios.get(`${baseURL}/api/users/login`, {
        headers:{
            Authorization: "Bearer " + token,
        }
    }) 
    return res.data;
    
} catch (error) {
    
}

};

export const saveFavoriteSong = async (songId, userId) => {
    try {
        const res = await axios.put(`${baseURL}/api/users/updateFavorite/${userId}`, {data : {songId : songId, userId : userId}});
        return res.data;
    } catch (error) {
        return null;
    }
};

export const removeFavoriteSong = async (songId, userId) => {
    try {
        const res = await axios.put(`${baseURL}/api/users/removeFavorite/${userId}`, {data : {songId : songId, userId : userId}});
        return res.data;
    } catch (error) {
        return null;
    }
}

export const getAllUsers = async () =>{
   try {
    const res = await axios.get(`${baseURL}/api/users/getUsers`);
    return res.data;
    
   } catch (error) {
    return null;
   } 
};

export const getAllArtist = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/artist/getAll`);
      return res.data;

    } catch (error) {
      return null;
    }
  };

  export const getAllSongs = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/songs/getAll`);
      return res.data;

    } catch (error) {
      return null;
    }
  };

  export const getAllNewSongs = async () => {
    // New Songs sort count limited to 6 from backend
    try {
      const res = await axios.get(`${baseURL}/api/songs/getNew`);
      return res.data;

    } catch (error) {
      return null;
    }
  };

  export const getAllAlbums = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/albums/getAll`);
      return res.data;
    } catch (error) {
      return null;
    }
  };

  export const changingUserRole = async (userId, role) => {

    try {

      const res = await axios.put(`${baseURL}/api/users/updateRole/${userId}`, {data : {role : role}});
      return res.data;
    } catch (error) {

      return null;
      
    }
  }

  export const generatePlaylist = async (emotion) => {
    try {
      const res = await axios.post(`${baseURL}/api/generateplaylist/generate`, {data : {emotion : emotion}});
      return res.data;
    } catch (error) {
      return null;
    }

  }

  export const removeUser = async (userId) =>{

    try {
      const res = axios.delete(`${baseURL}/api/users/deleteUser/${userId}`);
      return res;
      
    } catch (error) {
      return null;
    }
  }

  export const saveNewSongs = async (data) => {

    try {

    const res = axios.post(`${baseURL}/api/songs/save`, { ...data });
    return (await res).data.savedSong;
      
    } catch (error) {

      return null;
      
    }
  }

  export const saveNewArtist = async (data) => {
    try {

    const res = axios.post(`${baseURL}/api/artist/save`, { ...data });
    return (await res).data.savedArtist;
      
    } catch (error) {
      return null;
    }
  }

  export const saveNewAlbum = async (data) => {
    try {

    const res = axios.post(`${baseURL}/api/albums/save`, { ...data });
    return (await res).data.savedAlbum;
      
    } catch (error) {
      
    }
  }

  export const deleteSongById = async (id) => {
    
    try {
      const res = await axios.delete(`${baseURL}/api/songs/delete/${id}`);
      return res;
    } catch (error) {
      return null;
    }

  }

  export const deleteAlbumById = async (id) => {
    
    try {
      const res = await axios.delete(`${baseURL}/api/albums/delete/${id}`);
      return res;
    } catch (error) {
      return null;
    }

  }

  export const deleteArtistById = async (id) => {
    
    try {
      const res = await axios.delete(`${baseURL}/api/artist/delete/${id}`);
      return res;
    } catch (error) {
      return null;
    }

  }

  export const getArtistById = async (id) => {

    try {
      const res = await axios.get(`${baseURL}/api/artist/getOne/${id}`);
      return res.data;
    } catch (error) {
      return null;
    }
  }

  export const getSongsByArtistName = async (name) => {
    try {
      const res = await axios.get(`${baseURL}/api/songs/getOneName/${name}`);
      return res.data;
    } catch (error) {
      return null;
    }
  }

  

