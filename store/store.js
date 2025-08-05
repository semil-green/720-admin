import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './slices/user-slice/user.slice';
import roleMasterReducer from "./slices/role-slice/role.slice"
import stateReducer from "./slices/state/state.slice"
import cityReducer from "./slices/city/city.slice"
import darkStore_packagingCenter_sliceReducer from "./slices/darkStore-packagingCenter/darkStore-packagingCenter.slice"
import pinCodeReducer from "./slices/pincode/pincode.slice"
import darkStoreReducer from "./slices/dark-store/dark-store.slice"
import packagingCenterReducer from "./slices/packaging-center/packaging-center.slice"
import pincodeWiseSlotReducer from "./slices/picode-wise-slot/picode-wise-slot.service"

export const store = configureStore({
    reducer: {
        userSlice: userSliceReducer,
        roleMasterSlice: roleMasterReducer,
        stateSlice: stateReducer,
        citySlice: cityReducer,
        darkStorePackagingCenterSlice: darkStore_packagingCenter_sliceReducer,
        pincodeSlice: pinCodeReducer,
        darkStoreSlice: darkStoreReducer,
        packagingStoreSlice: packagingCenterReducer,
        pincodeWiseSlotSlice: pincodeWiseSlotReducer
    },
});
