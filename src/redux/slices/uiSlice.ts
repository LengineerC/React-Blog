import { createSlice } from '@reduxjs/toolkit';
import { SITE_DEFAULT_THEME_MODE } from '../../utils/constants';

interface UIState {
  navState: boolean;
  darkMode: boolean;
}

const initialState: UIState = {
  navState: true,
  darkMode: SITE_DEFAULT_THEME_MODE,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showNav: state => {
      state.navState = true;
    },
    hideNav: state => {
      state.navState = false;
    },
    setDarkModeON: state => {
      state.darkMode = true;
    },
    setDarkModeOFF: state => {
      state.darkMode = false;
    },
  },
});

export const { showNav, hideNav, setDarkModeON, setDarkModeOFF } = uiSlice.actions;
export default uiSlice.reducer;
