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
import vendorMasterReducer from "./slices/vendor-master/vendor-master.slice"
import itemsReducer from "./slices/items/items.slice"
import categoryReducer from "./slices/category/category.slice"
import hsnCodeReducer from "./slices/hsn-code/hsn-code.slice"
import collectionsReducer from "./slices/collections/collections.slice"
import inwardMaterialReducer from "./slices/inward-material/inward-material.slice"
import rawItemRedcuer from "./slices/raw-ittem/raw-item.store"
import workflowReducer from "./slices/work-flow/workflow.slice"
import slicerReducer from "./slices/slider/slider.slice"
import discountReducer from "./slices/discount/discount.slice"
import orderRequestReducer from "./slices/order-request/order-request.slice"
import customerOrderReducer from "./slices/cutomer-order/cutomer-order.slice"
import storeOrderReducer from "./slices/store-order/store-order.slice"
import feedbackReducer from "./slices/feedback/feedback.slice"
import inventoriesReducer from "./slices/inventories/inventories.slice"
import customerReducer from "./slices/customer/customer.slice"

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
                pincodeWiseSlotSlice: pincodeWiseSlotReducer,
                vendorMasterSlice: vendorMasterReducer,
                allItemsSlice: itemsReducer,
                categoeySlice: categoryReducer,
                hsnCodeSlice: hsnCodeReducer,
                collectionsSlice: collectionsReducer,
                inwardMaterialSlice: inwardMaterialReducer,
                rawItemSlice: rawItemRedcuer,
                workflowSlice: workflowReducer,
                sliderSlice: slicerReducer,
                discountSlice: discountReducer,
                orderRequestSlice: orderRequestReducer,
                customerOrderSlice: customerOrderReducer,
                storeOrderSlice: storeOrderReducer,
                feedbackSlice: feedbackReducer,
                inventoriesSlice: inventoriesReducer,
                customerSlice: customerReducer
        },
});
