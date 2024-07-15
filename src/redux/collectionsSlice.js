import { createSlice, current } from '@reduxjs/toolkit';


const initialState = {
  collections: {},
  selectedName: null,
  selectedImages: [],
  descriptionBoolean: false,
  description: null,
  about: [],
  homeIMG: []
};

const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    setCollections(state, action) {
      state.collections = action.payload;
    },
    setAbout(state, action) {
      state.about = action.payload;
    },
    setSelectedName(state, action) {
      const selectedCollection = current(state).collections[action.payload];
      state.selectedName = action.payload;
      state.selectedImages = selectedCollection ? selectedCollection.images : [];
      state.descriptionBoolean = selectedCollection.description ?? false;
      state.description = selectedCollection.description;
    },
    clearState(state) {
      state.collections = initialState.collections;
      state.selectedName = initialState.selectedName;
      state.selectedImages = initialState.selectedImages;
      state.descriptionBoolean = initialState.descriptionBoolean;
      state.description = initialState.description;
    },
    clearImages: (state) => {
      state.selectedImages = [];
    },
    setHomeIMG: (state, action) => {
      state.homeIMG = action.payload;
    },
  },
})

export const { setCollections, setSelectedName, setAbout, clearState, clearImages, setHomeIMG } = collectionsSlice.actions;
export default collectionsSlice.reducer;