"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { setAllStates } from "@/store/slices/state/state.slice";
import { getAllStatesService } from "@/service/state/state.service";
import { getALlCitiesService } from "@/service/citiy/city.slice";
import { setAllCities } from "@/store/slices/city/city.slice";
import { addNewDarkStorePackagingCenter, updateDarkStorePackagingCenter } from "@/service/darkStore-packagingCenter/darkStore-packagingCenter.service";
import { addDarkStorePackagingCenter } from "@/store/slices/darkStore-packagingCenter/darkStore-packagingCenter.slice";
import { addDarkStore } from "@/store/slices/dark-store/dark-store.slice";

export default function StoreForm({ editId, type }) {
    const router = useRouter();
    const dispatch = useDispatch();

    const allStates = useSelector((state) => state.stateSlice.allStates);
    const allCities = useSelector((state) => state.citySlice.allCities);

    const allDarkStores = useSelector((state) => state.darkStoreSlice.darkStores);


    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        store_name: "",
        store_code: "",
        city_id: "",
        state_id: "",
        address: "",
        store_pincode: "",
        latitude: "",
        longitude: ""
    });

    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        const fetchStates = async () => {
            if (!allStates?.data?.length) {
                const data = await getAllStatesService();
                dispatch(setAllStates(data));
            }
        };
        fetchStates();
    }, [dispatch]);

    useEffect(() => {
        const fetchCities = async () => {
            if (!allCities?.data?.length) {
                const data = await getALlCitiesService();
                dispatch(setAllCities(data));
            }
        };
        fetchCities();
    }, [dispatch]);

    useEffect(() => {
        if (
            editId &&
            allDarkStores?.length &&
            allStates?.data?.length &&
            allCities?.data?.length
        ) {
            const store = allDarkStores.find((s) => s.id === parseInt(editId));

            if (store) {
                setFormData({
                    store_name: store.store_name || "",
                    store_code: store.store_code || "",
                    city_id: store.city_id?.toString() || "",
                    state_id: store.state_id?.toString() || "",
                    address: store.address || "",
                    store_pincode: store.store_pincode?.toString() || "",
                    latitude: store.latitude || "",
                    longitude: store.longitude || ""
                });
                setIsDataLoaded(true);
            }
        } else if (!editId) {
            setIsDataLoaded(true);
        }
    }, [editId, allDarkStores, allStates, allCities]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const payload = { ...formData, type };
        const res = await addNewDarkStorePackagingCenter(payload);

        if (res?.status === 200) {
            dispatch(addDarkStore(res.data));
            router.push(`/stores/new?id=${res.data.id}`, undefined, { shallow: true });
        }
        setLoading(false);
    };

    const handleUpdate = async (editId, data, e) => {

        e.preventDefault();
        const payload = { ...formData, type };
        const res = await updateDarkStorePackagingCenter(editId, payload)
    };

    const filteredCities = allCities?.data || [];


    if (!isDataLoaded) return <p className="text-center">Loading form...</p>;

    return (
        <form className="grid gap-4 min-w-[350px]" >
            <div>
                <Label className="pb-1">Store Name</Label>
                <Input name="store_name" value={formData.store_name} onChange={handleChange} required />
            </div>
            <div>
                <Label className="pb-1">Store Code</Label>
                <Input name="store_code" value={formData.store_code} onChange={handleChange} required />
            </div>
            <div>
                <Label className="pb-1">State</Label>
                <Select
                    value={formData.state_id}
                    onValueChange={(value) => {
                        setFormData((prev) => ({
                            ...prev,
                            state_id: value,
                            city_id: ""
                        }));
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a state" />
                    </SelectTrigger>
                    <SelectContent>
                        {allStates?.data?.map((state) => (
                            <SelectItem key={state.id} value={state.id.toString()}>
                                {state.state_name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label className="pb-1">City</Label>
                <Select
                    value={formData.city_id}
                    onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, city_id: value }))
                    }

                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                    <SelectContent>
                        {filteredCities?.length > 0 ? (
                            filteredCities.map((city) => (
                                <SelectItem key={city.id} value={city.id.toString()}>
                                    {city.city_name}
                                </SelectItem>
                            ))
                        ) : (
                            <p className="text-center text-sm px-2 py-1">No cities available</p>
                        )}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label className="pb-1">Address</Label>
                <Textarea name="address" value={formData.address} onChange={handleChange} />
            </div>
            <div>
                <Label className="pb-1">Store Pincode</Label>
                <Input name="store_pincode" value={formData.store_pincode} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label className="pb-1">Latitude</Label>
                    <Input name="latitude" value={formData.latitude} onChange={handleChange} />
                </div>
                <div>
                    <Label className="pb-1">Longitude</Label>
                    <Input name="longitude" value={formData.longitude} onChange={handleChange} />
                </div>
            </div>
            <div className="flex justify-center gap-4 mt-4">
                <Button type="button" variant="outline" onClick={() => router.push("/stores")}>
                    Back to list
                </Button>
                {editId ? <Button type="button" onClick={(e) => handleUpdate(editId, formData, e)}>
                    {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                    Update
                </Button> : <Button type="button" onClick={handleSubmit}>
                    {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                    Save
                </Button>
                }
            </div>
        </form>
    );
}
