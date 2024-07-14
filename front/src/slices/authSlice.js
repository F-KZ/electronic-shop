import { createSlice } from '@reduxjs/toolkit';

// État initial avec récupération des informations utilisateur depuis le localStorage
const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

// Création du slice auth avec createSlice
const authSlice = createSlice({
  name: 'auth', // Nom du slice
  initialState, // État initial
  reducers: {
    // Réducteur pour définir les informations d'authentification
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    // Réducteur pour gérer la déconnexion
    logout: (state) => {
      state.userInfo = null;
      // Nettoyage du localStorage pour supprimer les informations utilisateur et panier
      localStorage.clear();
    },
  },
});

// Exportation des actions et du réducteur
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
