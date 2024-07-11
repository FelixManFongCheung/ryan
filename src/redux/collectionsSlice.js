import { createSlice, current } from '@reduxjs/toolkit';


const initialState = {
  collections: {},
  selectedName: null,
  selectedImages: [],
  descriptionBoolean: false,
  description: null
};

const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    setCollections(state, action) {
      state.collections = action.payload;
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
  },
})

export const { setCollections, setSelectedName, clearState } = collectionsSlice.actions;
export default collectionsSlice.reducer;