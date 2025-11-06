"use client";

import { useState, useEffect, Fragment, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { MultiSelect } from "@/components/shadcn/MultiSelect";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon, MinusIcon, ImageIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setCategoriesData } from "@/store/slices/category/category.slice";
import { getAllCategoriesService } from "@/service/category/category.service";
import { getAllHSNCodeService } from "@/service/hsn-code/hsn-code.service";
import { setHsnCodes } from "@/store/slices/hsn-code/hsn-code.slice";
import {
    addNewItemService,
    allCollectionsService,
    getitemById,
    updateItemService,
} from "@/service/items/items.service";
import { toast } from "sonner";
import Link from "next/link";
import { getAllUnitsService } from "@/service/unit/unit.service";
import { clearAllItemsData } from "@/store/slices/items/items.slice";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    addNewTagService,
    fetchAlltagsService,
} from "@/service/store-order/tags.service";
import { addNewTag, setTags } from "@/store/slices/tags/tags.slice";

export default function ItemForm({ editItemId }) {
    const router = useRouter();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [units, setUnits] = useState([]);
    const [opentagsModal, setOopentagsModal] = useState(false);
    const [searchtag, setSearchTag] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [tagLoading, setTagLoading] = useState(false);

    const fileInputRef = useRef(null);

    const alltagsData = useSelector((state) => state.tagsSlice.alltagsData);

    useEffect(() => {
        if (alltagsData?.length === 0) {
            const fetchData = async () => {
                try {
                    const res = await fetchAlltagsService();

                    if (res?.status == 200) {
                        dispatch(setTags(res?.data));
                    }
                } catch (err) {
                    toast.error("Failed to fetch tags");
                }
            };

            fetchData();
        }
    }, []);


    const filteredTags = alltagsData.filter((tag) =>
        tag.tag_name.toLowerCase().includes(searchtag.toLowerCase())
    );

    const exactMatch = alltagsData.some(
        (tag) => tag.tag_name.toLowerCase() === searchtag.toLowerCase()
    );

    const productTags = alltagsData.filter(tag =>
        selectedTags.some(selected => selected.tag_id === tag.id)
    );


    const handleTagSelect = (tagId) => {
        setSelectedTags((prev) => {
            const isSelected = prev.some((t) => t.tag_id === tagId);
            if (isSelected) {
                return prev.filter((t) => t.tag_id !== tagId);
            } else {
                return [...prev, { tag_id: tagId }];
            }
        });
    };


    const handleAddNewTag = async () => {
        try {
            setTagLoading(true);
            const res = await addNewTagService(searchtag);


            if (res?.status == 200 || res?.status == 201) {
                dispatch(addNewTag(res?.data));
                toast.success("Tag added successfully");
                setSearchTag("");
            }
        } catch (err) {
            toast.error("Failed to add new tag");
        }
        finally {
            setTagLoading(false);
        }
    };

    // ------------------------------------ ItemForm state ------------------------------------

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        unit_id: null,
        quantity: "",
        pieces: "",
        serve_person: "",
        suitable_for: "",
        sku: "",
        price: "",
        compare_price: "",
        charge_tax: false,
        sell_out_of_stock: "",
        show_badge: false,
        fresh: false,
        chemical_free: false,
        natural: false,
        no_antibiotic: false,
        seo_title: "",
        seo_description: "",
        display_quantity: "",
        ingredients: "",
        self_life: ""
    });

    const [images, setImages] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedCollections, setSelectedCollections] = useState([]);

    const [productDisplayImageFile, setProductDisplayImageFile] = useState(null);
    const [productDisplayImagePreview, setProductDisplayImagePreview] =
        useState("");
    const [allCollections, setAllCollections] = useState([]);

    useEffect(() => {
        if (units.length === 0) {
            const fetchUnitsData = async () => {
                try {
                    const res = await getAllUnitsService();

                    setUnits(res?.data || []);
                } catch (error) {
                    toast.error("Failed to fetch units");
                }
            };

            fetchUnitsData();
        }
    }, []);

    useEffect(() => {
        const fetchCollections = async () => {
            if (allCollections.length === 0) {
                try {
                    const res = await allCollectionsService();
                    setAllCollections(res?.data?.data || []);
                } catch (error) {
                    toast.error("Failed to fetch collections");
                }
            }
        };

        fetchCollections();
    }, [allCollections]);
    const allCategoriesData = useSelector(
        (state) => state.categoeySlice.allCategories
    );

    const dynamicCategoriesList = allCategoriesData.map((category) => ({
        value: category.category_id.toString(),
        label: category.category_name,
    }));

    useEffect(() => {
        if (!allCategoriesData || allCategoriesData.length === 0) {
            const fetchCategories = async () => {
                try {
                    const res = await getAllCategoriesService();
                    if (res?.data) {
                        dispatch(setCategoriesData(res.data));
                    }
                } catch (error) {
                    toast.error("Failed to fetch categories");
                }
            };

            fetchCategories();
        }
    }, [allCategoriesData, dispatch]);

    const allHsnCodes = useSelector((state) => state.hsnCodeSlice.allHsnCodes);

    useEffect(() => {
        const fetchHsnCode = async () => {
            try {
                const res = await getAllHSNCodeService();
                if (res?.status === 200) dispatch(setHsnCodes(res?.data));
            } catch (err) {
                toast.error("Failed to fetch HSN codes");
            }
        };
        if (!allHsnCodes || allHsnCodes.length === 0) {
            fetchHsnCode();
        }
    }, [allHsnCodes, dispatch]);

    const handleProductDisplayImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const blobUrl = URL.createObjectURL(file);
            setProductDisplayImageFile(file);
            setProductDisplayImagePreview(blobUrl);
        }
    };

    const handleRemoveProductDisplayImage = () => {
        setProductDisplayImageFile(null);
        setProductDisplayImagePreview("");

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // Handle basic input change for ItemForm fields
    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;

        const regex = /^\d*(-\d*)?$/;
        if ((name == 'serve_person' || name == 'pieces') && !!value && !!!regex.test(value)) return;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Handle category multi-select change
    const handleCategoriesChange = (values) => {
        setSelectedCategories(values);
        setFormData((prev) => ({ ...prev, Categories: values }));
    };

    // Handle collections multi-select change
    const handleCollectionsChange = (values) => {
        setSelectedCollections(values);
        setFormData((prev) => ({ ...prev, Collections: values }));
    };

    const handleItemImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const preview = URL.createObjectURL(file);
            setImages((prev) => [...prev, { file, preview }]);
        }
        e.target.value = "";
    };

    const handleRemoveImage = (index) => {
        setImages((prev) => {
            const updated = [...prev];
            URL.revokeObjectURL(updated[index].preview);
            updated.splice(index, 1);
            return updated;
        });
    };

    // ------------------------------------ BenefitForm handlers ------------------------------------

    const [benefits, setBenefits] = useState([
        { title: "", description: "", image: "", Id: Date.now() },
    ]);

    const handleBenefitChange = (index, field, value) => {
        const updated = [...benefits];
        updated[index][field] = value;
        setBenefits(updated);
    };

    const handleBenefitImageChange = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            const preview = URL.createObjectURL(file);
            setBenefits((prev) => {
                const updated = [...prev];
                updated[index] = {
                    ...updated[index],
                    image: { file, preview },
                };
                return updated;
            });
        }
    };

    const addNewBenefit = () => {
        setBenefits([
            ...benefits,
            { title: "", description: "", image: "", Id: Date.now() },
        ]);
    };

    const removeBenefit = (id) => {
        setBenefits((prev) => prev.filter((b) => b.Id !== id));
    };

    // ------------------------------------ NutritionalForm handlers ------------------------------------

    const [nutrients, setNutrients] = useState([
        { label: "", value: "", nutritional_type_id: 1, id: Date.now() },
    ]);

    const [vitamins, setVitamins] = useState([
        { label: "", value: "", nutritional_type_id: 2, id: Date.now() },
    ]);
    const [minerals, setMinerals] = useState([
        { label: "", value: "", nutritional_type_id: 3, id: Date.now() },
    ]);

    // Nutrients
    const handleNutrientChange = (index, field, value) => {
        const updated = [...nutrients];
        updated[index][field] = value;
        setNutrients(updated);
    };
    const addNewNutrient = () =>
        setNutrients((prev) => [
            ...prev,
            { label: "", value: "", nutritional_type_id: 1, id: Date.now() },
        ]);

    const removeNutrient = (id) =>
        setNutrients((prev) => prev.filter((n) => n.id !== id));

    // Vitamins
    const handleVitaminChange = (index, field, value) => {
        const updated = [...vitamins];
        updated[index][field] = value;
        setVitamins(updated);
    };
    const addNewVitamin = () =>
        setVitamins([
            ...vitamins,
            { label: "", value: "", nutritional_type_id: 2, id: Date.now() },
        ]);
    const removeVitamin = (id) =>
        setVitamins((prev) => prev.filter((v) => v.id !== id));

    // Minerals
    const handleMineralChange = (index, field, value) => {
        const updated = [...minerals];
        updated[index][field] = value;
        setMinerals(updated);
    };
    const addNewMineral = () =>
        setMinerals([
            ...minerals,
            { label: "", value: "", nutritional_type_id: 3, Id: Date.now() },
        ]);

    const removeMineral = (id) =>
        setMinerals((prev) => prev.filter((m) => m.id !== id));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!formData.title?.trim()) {
                toast.error("Title is required");
                return setLoading(false);
            }

            if (!formData.description?.trim()) {
                toast.error("Description is required");
                return setLoading(false);
            }

            if (!formData.unit_id || Number(formData.unit_id) <= 0) {
                toast.error("Unit is required");
                return setLoading(false);
            }

            if (!selectedCategories || selectedCategories.length === 0) {
                toast.error("Please select at least one category");
                return setLoading(false);
            }

            if (!formData.quantity || Number(formData.quantity) <= 0) {
                toast.error("Quantity is required");
                return setLoading(false);
            }

            if (!formData?.display_quantity || Number(formData.display_quantity) <= 0) {
                toast.error("Display quantity is required");
                return setLoading(false);
            }

            if (!formData.price || Number(formData.price) <= 0) {
                toast.error("Price is required");
                return setLoading(false);
            }

            if (!formData.compare_price || Number(formData.compare_price) <= 0) {
                toast.error("Compare price is required");
                return setLoading(false);
            }

            if (!productDisplayImageFile) {
                toast.error("Product display image is required");
                return setLoading(false);
            }

            if (!images || images.length === 0) {
                toast.error("At least one product image is required");
                return setLoading(false);
            }



            const categoriesPayload = selectedCategories.map((cat) => ({
                category_id: Number(cat.value ?? cat),
            }));

            const collectionsPayload = selectedCollections.map((col) => ({
                collection_id: Number(col.value ?? col),
            }));

            const nutritionalFactsPayload = [...nutrients, ...vitamins, ...minerals]
                .filter(
                    ({ label, value }) => label.trim() !== "" && value.trim() !== ""
                )
                .map(({ label, value, nutritional_type_id }) => ({
                    nutritional_type_id,
                    label,
                    value,
                }));

            // const benefitsPayload = benefits.map((b) => ({
            //     benefit_id: b.Id || null,
            //     title: b.title,
            //     description: b.description,
            //     image: b.image?.file ? b.image.file.name : "",
            // }));

            const benefitsPayload = benefits
                .filter((b) => b.title.trim() || b.description.trim() || b.image)
                .map((b) => ({
                    benefit_id: b.Id || null,
                    title: b.title,
                    description: b.description,
                    image: b.image?.file ? b.image.file.name : "",
                }));


            const tagsPayload = selectedTags.map((tag) => ({
                tag_id: Number(tag.tag_id),
            }));

            const payload = {
                product: {
                    title: formData.title,
                    description: formData.description,
                    unit_id: Number(formData.unit_id),
                    quantity: Number(formData.quantity),
                    pieces: formData.pieces,
                    serve_person: formData.serve_person,
                    suitable_for: formData.suitable_for,
                    sku: formData.sku,
                    price: Number(formData.price),
                    compare_price: Number(formData.compare_price),
                    charge_tax: Boolean(formData.charge_tax),
                    hsn_id: Number(formData.hsn_id),
                    sell_out_of_stock: Boolean(formData.sell_out_of_stock),
                    show_badge: Boolean(formData.show_badge),
                    fresh: Boolean(formData.fresh),
                    chemical_free: Boolean(formData.chemical_free),
                    natural: Boolean(formData.natural),
                    no_antibiotic: Boolean(formData.no_antibiotic),
                    product_display_image: productDisplayImageFile
                        ? productDisplayImageFile.name
                        : "",
                    seo_title: formData.seo_title,
                    seo_description: formData.seo_description,
                    display_quantity: formData.display_quantity,
                    ingredients: formData.ingredients,
                    self_life: formData.self_life,
                },
                categories: categoriesPayload,
                collections: collectionsPayload,
                images: [], // keep as empty array like in your Postman payload
                benefits: benefitsPayload,
                nutritionalFacts: nutritionalFactsPayload,
                tags: tagsPayload,
            };

            // ------------------------------------
            // Build FormData
            // ------------------------------------
            const formDataToSend = new FormData();
            formDataToSend.append("productData", JSON.stringify(payload));

            // product_display_image
            if (productDisplayImageFile) {
                formDataToSend.append("product_display_image", productDisplayImageFile);
            }

            // product_images
            images.forEach((img) => {
                if (img.file) {
                    formDataToSend.append("product_images", img.file);
                }
            });

            // benefits_images
            benefits.forEach((b) => {
                if (b.image?.file) {
                    formDataToSend.append("benefits_images", b.image.file);
                }
            });

            const res = await addNewItemService(formDataToSend);
            if (res?.status == 201 || res?.data?.status == 200) {
                dispatch(clearAllItemsData());
                toast.success("Item added successfully");
                router.push("/items");
            } else {
                toast.error(res?.response?.data?.message || "Failed to add item");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message ?? "Something went wrong! Failed to add item");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!editItemId) return;

        const fetchData = async () => {
            try {
                const editData = await getitemById(editItemId);

                setFormData({
                    title: editData.title || "",
                    description: editData.description || "",
                    unit_id: editData.unit_id || null,
                    quantity: editData.quantity || "",
                    pieces: editData.pieces || "",
                    serve_person: editData.serve_person || "",
                    suitable_for: editData.suitable_for || "",
                    sku: editData.sku || "",
                    price: editData.price || "",
                    compare_price: editData.compare_price || "",
                    charge_tax: editData.charge_tax || false,
                    sell_out_of_stock: editData.sell_out_of_stock || false,
                    show_badge: editData.show_badge || false,
                    fresh: editData.fresh || false,
                    chemical_free: editData.chemical_free || false,
                    natural: editData.natural || false,
                    no_antibiotic: editData.no_antibiotic || false,
                    hsn_id: editData.hsn_id || null,
                    seo_title: editData.seo_title || "",
                    seo_description: editData.seo_description || "",
                    display_quantity: editData.display_quantity || "",
                    ingredients: editData.ingredients || "",
                    self_life: editData.self_life || "",
                });

                if (editData.categories) {
                    setSelectedCategories(
                        editData.categories.map((c) => c.category_id.toString())
                    );
                }

                if (editData.collections) {
                    setSelectedCollections(
                        editData.collections.map((col) => col.collection_id.toString())
                    );
                }

                if (editData.tags && editData.tags.length > 0) {
                    setSelectedTags(
                        editData.tags.map((t) => ({
                            id: t.id,
                            product_id: t.product_id,
                            tag_id: t.tag_id
                        }))
                    );
                } else {
                    setSelectedTags([]);
                }

                // Product display image
                if (editData.thumbnail_image) {
                    setProductDisplayImagePreview(editData.thumbnail_image);
                }

                // Images array
                if (editData.images) {
                    setImages(
                        editData.images.map((img) => ({ file: null, preview: img.image }))
                    );
                }

                // Benefits
                if (editData.benefits) {
                    setBenefits(
                        editData.benefits.map((b) => ({
                            Id: b.benefit_id,
                            title: b.title,
                            description: b.description,
                            image: b.image,
                        }))
                    );
                }

                // Nutritional facts
                if (editData.nutritional_facts) {
                    const nutrients =
                        editData.nutritional_facts.find(
                            (nf) => nf.nutritional_type_id === 1
                        )?.facts || [{ label: "", value: "", nutritional_type_id: 1, id: Date.now() }];
                    const vitamins =
                        editData.nutritional_facts.find(
                            (nf) => nf.nutritional_type_id === 2
                        )?.facts || [{ label: "", value: "", nutritional_type_id: 2, id: Date.now() }];
                    const minerals =
                        editData.nutritional_facts.find(
                            (nf) => nf.nutritional_type_id === 3
                        )?.facts || [{ label: "", value: "", nutritional_type_id: 3, id: Date.now() }];

                    setNutrients(
                        nutrients.map((n) => ({
                            ...n,
                            nutritional_type_id: 1,
                            id: n.nutritional_id,
                        }))
                    );
                    setVitamins(
                        vitamins.map((v) => ({
                            ...v,
                            nutritional_type_id: 2,
                            id: v.nutritional_id,
                        }))
                    );
                    setMinerals(
                        minerals.map((m) => ({
                            ...m,
                            nutritional_type_id: 3,
                            id: m.nutritional_id,
                        }))
                    );
                }
            } catch (err) {
                toast.error("Failed to fetch item");
            }
        };

        fetchData();
    }, [editItemId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!formData.title?.trim()) {
                toast.error("Title is required");
                return setLoading(false);
            }

            if (!formData.description?.trim()) {
                toast.error("Description is required");
                return setLoading(false);
            }

            if (!formData.unit_id || Number(formData.unit_id) <= 0) {
                toast.error("Unit is required");
                return setLoading(false);
            }

            if (!selectedCategories || selectedCategories.length === 0) {
                toast.error("Please select at least one category");
                return setLoading(false);
            }

            if (!formData.quantity || Number(formData.quantity) <= 0) {
                toast.error("Quantity is required");
                return setLoading(false);
            }

            if (!formData?.display_quantity || Number(formData.display_quantity) <= 0) {
                toast.error("Display quantity is required");
                return setLoading(false);
            }

            if (!formData.price || Number(formData.price) <= 0) {
                toast.error("Price is required");
                return setLoading(false);
            }

            if (!formData.compare_price || Number(formData.compare_price) <= 0) {
                toast.error("Compare price is required");
                return setLoading(false);
            }

            if (!productDisplayImageFile && !productDisplayImagePreview) {
                toast.error("Product display image is required");
                return setLoading(false);
            }

            if (!images || images.length === 0) {
                toast.error("At least one product image is required");
                return setLoading(false);
            }

            const categoriesPayload = selectedCategories.map((cat) => ({
                category_id: Number(cat.value ?? cat),
            }));

            const collectionsPayload = selectedCollections.map((col) => ({
                collection_id: Number(col.value ?? col),
            }));

            const nutritionalFactsPayload = [...nutrients, ...vitamins, ...minerals]
                .filter(
                    ({ label, value }) => label.trim() !== "" && value.trim() !== ""
                )
                .map(({ label, value, nutritional_type_id }) => ({
                    nutritional_type_id,
                    label,
                    value,
                }));

            // const benefitsPayload = benefits.map((b) => {
            //     let imageName = "";

            //     if (b.image?.file) {
            //         imageName = b.image.file.name;
            //     } else if (typeof b.image === "string") {
            //         imageName = b.image.substring(b.image.lastIndexOf("/") + 1);
            //     }

            //     return {
            //         benefit_id:
            //             typeof b.Id === "number" && b.Id > 0 && b.Id < 2147483647
            //                 ? b.Id
            //                 : null,
            //         title: b.title,
            //         description: b.description,
            //         image: imageName || "",
            //     };
            // });

            const benefitsPayload = benefits
                .filter(
                    (b) =>
                        b.title.trim() !== "" ||
                        b.description.trim() !== "" ||
                        (b.image && (typeof b.image === "string" || b.image?.file))
                )
                .map((b) => {
                    let imageName = "";

                    if (b.image?.file) {
                        imageName = b.image.file.name;
                    } else if (typeof b.image === "string") {
                        imageName = b.image.substring(b.image.lastIndexOf("/") + 1);
                    }

                    return {
                        benefit_id:
                            typeof b.Id === "number" && b.Id > 0 && b.Id < 2147483647
                                ? b.Id
                                : null,
                        title: b.title,
                        description: b.description,
                        image: imageName || "",
                    };
                });


            const imagesPayload = images
                .filter((img) => !img.file && img.preview)
                .map((img) => ({
                    image: img.preview.split("/").pop(),
                }));

            const tagsPayload = selectedTags.map((tag) => ({
                tag_id: Number(tag.tag_id),
            }));

            const payload = {
                product: {
                    product_id: editItemId,
                    title: formData.title,
                    description: formData.description,
                    unit_id: Number(formData.unit_id),
                    quantity: Number(formData.quantity),
                    pieces: formData.pieces,
                    serve_person: formData.serve_person,
                    suitable_for: formData.suitable_for,
                    sku: formData.sku,
                    price: Number(formData.price),
                    compare_price: Number(formData.compare_price),
                    charge_tax: Boolean(formData.charge_tax),
                    hsn_id: Number(formData.hsn_id),
                    sell_out_of_stock: Boolean(formData.sell_out_of_stock),
                    show_badge: Boolean(formData.show_badge),
                    fresh: Boolean(formData.fresh),
                    chemical_free: Boolean(formData.chemical_free),
                    natural: Boolean(formData.natural),
                    no_antibiotic: Boolean(formData.no_antibiotic),
                    product_display_image: productDisplayImageFile
                        ? productDisplayImageFile.name
                        : productDisplayImagePreview?.split("/").pop() || "",
                    seo_title: formData.seo_title,
                    seo_description: formData.seo_description,
                    display_quantity: formData.display_quantity,
                    ingredients: formData.ingredients,
                    self_life: formData.self_life,
                },
                categories: categoriesPayload,
                collections: collectionsPayload,
                images: imagesPayload,
                benefits: benefitsPayload,
                nutritionalFacts: nutritionalFactsPayload,
                tags: tagsPayload,
            };

            const formDataToSend = new FormData();
            formDataToSend.append("productData", JSON.stringify(payload));

            // product_display_image (only if updated)
            if (productDisplayImageFile) {
                formDataToSend.append("product_display_image", productDisplayImageFile);
            }

            // product_images (new uploads only)
            images.forEach((img) => {
                if (img.file) {
                    formDataToSend.append("product_images", img.file);
                }
            });

            // benefits_images (new uploads only)
            benefits.forEach((b) => {
                if (b.image?.file) {
                    formDataToSend.append("benefits_images", b.image.file);
                }
            });

            const res = await updateItemService(editItemId, formDataToSend);

            if (res?.status === 200 || res?.data?.status === 200) {
                dispatch(clearAllItemsData());
                toast.success("Item updated successfully");
                router.push("/items");
            } else {
                toast.error(res?.response?.data?.message || "Failed to update item");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message ?? "Something went wrong! Failed to update item");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="grid gap-6">
            {/* ---------- ITEM FORM ---------- */}
            <div className="flex gap-3">
                <div className="flex-1">
                    <Label className="pb-1">Title <span className="text-red-500 ">*</span>
                    </Label>
                    <Input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Rohu"
                        required
                    />

                    <div className="pt-4">
                        <Label className="pb-1">Categories <span className="text-red-500 ">*</span>
                        </Label>
                        <MultiSelect
                            options={dynamicCategoriesList}
                            onValueChange={handleCategoriesChange}
                            defaultValue={selectedCategories}
                            placeholder="Select Category"
                            variant="secondary"
                            animation={0}
                            modalPopover={true}
                            maxCount={3}
                        />
                    </div>
                </div>

                <div className="flex-1">
                    <Label className="pb-1">Description <span className="text-red-500 ">*</span>
                    </Label>
                    <Textarea
                        name="description"
                        className="min-h-[110px]"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="flex gap-3">
                <div className="flex-1">
                    <Label className="pb-1">Unit <span className="text-red-500 ">*</span>
                    </Label>
                    <Select
                        value={formData.unit_id?.toString() || ""}
                        onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, unit_id: parseInt(value) }))
                        }
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a Unit" />
                        </SelectTrigger>

                        <SelectContent>
                            {units.map((unit) => (
                                <SelectItem key={unit.unit_id} value={unit.unit_id.toString()}>
                                    {unit.unit}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex gap-2">
                    <div>

                        <Label className="pb-1">Quantity <span className="text-red-500 ">*</span>
                        </Label>
                        <Input
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            placeholder="300"
                            type="number"
                            required
                        />
                    </div>
                    <div>

                        <Label className="pb-1">Display Quantity <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            name="display_quantity"
                            value={formData.display_quantity}
                            onChange={handleChange}
                            placeholder="1"
                            type="text"
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-3">
                <div className="flex-1">
                    <Label className="pb-1">Pieces</Label>
                    <Input
                        name="pieces"
                        value={formData.pieces}
                        onChange={handleChange}
                        placeholder="3-4"
                        required
                        type={"text"}
                    />
                </div>

                <div className="flex-1">
                    <Label className="pb-1">Serve Person</Label>
                    <Input
                        name="serve_person"
                        value={formData.serve_person}
                        onChange={handleChange}
                        placeholder="1-2"
                        required
                        type={"text"}
                    />
                </div>
            </div>

            <div className="flex gap-3">
                <div className="flex-1">
                    <Label className="pb-1">Suitable For</Label>
                    <Input
                        name="suitable_for"
                        value={formData.suitable_for}
                        onChange={handleChange}
                        placeholder="Suitable for fish curry"
                        required
                    />
                </div>

                <div className="flex-1">
                    <Label className="pb-1">SKU</Label>
                    <Input
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                        placeholder="RF-KG-23"
                        required
                    />
                </div>
            </div>

            <div className="flex gap-3">
                <div className="flex-1">
                    <Label className="pb-1">Pricing <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="₹ 350"
                        required
                        type={"number"}
                        onKeyDown={(e) => {
                            if (e.key === "-" || e.key === "e" || e.key === "E") {
                                e.preventDefault();
                            }
                        }}
                        min={0}
                    />
                </div>

                <div className="flex-1">
                    <Label className="pb-1">Compare at price <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        name="compare_price"
                        value={formData.compare_price}
                        onChange={handleChange}
                        placeholder="₹ 0.00"
                        required
                        type={"number"}
                        onKeyDown={(e) => {
                            if (e.key === "-" || e.key === "e" || e.key === "E") {
                                e.preventDefault();
                            }
                        }}
                        min={0}
                    />
                </div>
            </div>

            <div className="flex gap-3">
                <div className="flex-1">
                    <Label className="pb-1">Seo Title</Label>
                    <Input
                        name="seo_title"
                        value={formData.seo_title}
                        onChange={handleChange}
                        placeholder="Enter SEO Title"
                        required
                    />

                    <div className="mt-4">
                        <div className="flex gap-4 items-center ">

                            <Label className="pb-1">Tags</Label>

                            <Button onClick={() => setOopentagsModal(true)} className="!h-7" size={"sm"}>
                                Add Tags
                            </Button>


                            <Dialog open={opentagsModal} onOpenChange={setOopentagsModal}>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle className="text-center">
                                            Select or Add Tag
                                        </DialogTitle>
                                    </DialogHeader>

                                    <div className="space-y-4">
                                        <Input
                                            placeholder="Search for a tag..."
                                            value={searchtag}
                                            onChange={(e) => setSearchTag(e.target.value)}
                                        />

                                        <div className="max-h-60 overflow-y-auto border rounded-md p-2 space-y-2">
                                            {filteredTags.length > 0 && (
                                                <>
                                                    {filteredTags.map((tag) => (
                                                        <div
                                                            key={tag.id}
                                                            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedTags.some((t) => t.tag_id === tag.id)}
                                                                onChange={() => handleTagSelect(tag.id)}
                                                                className="w-4 h-4 accent-blue-600 cursor-pointer"
                                                            />
                                                            <span>{tag.tag_name}</span>
                                                        </div>
                                                    ))}


                                                    {!exactMatch && searchtag && (
                                                        <div className="p-2 text-sm text-center border-t pt-2">
                                                            <Button
                                                                variant="link"
                                                                className="text-blue-600"
                                                                onClick={handleAddNewTag}
                                                                disabled={tagLoading}
                                                            >
                                                                Add new tag: "{searchtag}"
                                                            </Button>
                                                        </div>
                                                    )}
                                                </>
                                            )}

                                            {/* 4️⃣ If no partial matches at all */}
                                            {filteredTags.length === 0 && searchtag && (
                                                <div className="p-2 text-sm text-center">
                                                    No tags found.
                                                    <Button
                                                        variant="link"
                                                        className="text-blue-600"
                                                        onClick={handleAddNewTag}
                                                        disabled={tagLoading}
                                                    >
                                                        Add new tag: "{searchtag}"
                                                    </Button>
                                                </div>
                                            )}
                                        </div>


                                    </div>

                                    <DialogFooter>
                                        <Button
                                            variant="outline"
                                            onClick={() => setOopentagsModal(false)}
                                        >
                                            Close
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setOopentagsModal(false);
                                            }}
                                        >
                                            Save
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="mt-2">
                            <Textarea
                                name="seo_description"
                                className="min-h-[110px]"
                                value={productTags.map(tag => tag.tag_name).join(", ")}
                                readOnly
                            />
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <Label className="pb-1">Seo Description</Label>
                    <Textarea
                        name="seo_description"
                        className="min-h-[110px]"
                        value={formData.seo_description}
                        onChange={handleChange}
                        required
                        placeholder="Enter SEO Description"
                    />
                </div>
            </div>

            {/* <label className="flex items-center space-x-2 mt-1">
                <input
                    type="checkbox"
                    name="charge_tax"
                    className="form-checkbox text-blue-600"
                    checked={formData.charge_tax || false}
                    onChange={handleChange}
                />
                <span>Charge tax on this product</span>
            </label> */}

            <div className="flex flex-col gap-3">
                <div className="flex-1">
                    <Label className="pb-1">Collections</Label>
                    <MultiSelect
                        options={allCollections?.map((item) => ({
                            label: item.title,
                            value: item.collection_id.toString(),
                        }))}
                        onValueChange={handleCollectionsChange}
                        defaultValue={selectedCollections}
                        placeholder="Select Collection"
                        variant="secondary"
                        animation={0}
                        modalPopover={true}
                        maxCount={3}
                        className="w-[50%]"
                    />
                </div>
            </div>

            <div>
                <Label>HSN</Label>
                <Select
                    value={formData.hsn_id ? formData.hsn_id.toString() : ""}
                    onValueChange={(val) =>
                        setFormData((prev) => ({ ...prev, hsn_id: val }))
                    }
                    className="w-full"
                >
                    <SelectTrigger className="w-[50%]">
                        <SelectValue placeholder="Select HSN code" />
                    </SelectTrigger>
                    <SelectContent>

                        {(allHsnCodes || []).map((vendor, index) => {
                            const val = vendor?.hsn_id ?? vendor?._id ?? index;
                            return (
                                <SelectItem key={index} value={val.toString()}>
                                    {vendor?.hsn_code} - {vendor?.gst_percentage}% -{" "}
                                    {vendor?.hsn_no}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
                {formData.hsn_id && (
                    <button
                        type="button"
                        onClick={() =>
                            setFormData((prev) => ({ ...prev, hsn_id: "" }))
                        }
                        className="text-sm text-red-500 hover:underline"
                    >
                        Remove HSN Code
                    </button>
                )}
            </div>

            <label className="flex items-center space-x-2 mt-1">
                <input
                    type="checkbox"
                    name="sell_out_of_stock"
                    checked={formData.sell_out_of_stock}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            sell_out_of_stock: e.target.checked,
                        }))
                    }
                    className="form-checkbox text-blue-600"
                />
                <span>Continue selling when out of stock</span>
            </label>

            <div>
                <Label className="pb-1">Product Display Image <span className="text-red-500">*</span>
                </Label>
                <Input
                    type="file"
                    accept="image/*"
                    onChange={handleProductDisplayImageChange}
                    ref={fileInputRef}
                />
                {productDisplayImagePreview && (
                    <div className="mt-2 relative inline-block">
                        <Image
                            src={productDisplayImagePreview}
                            alt="Product Display"
                            width={200}
                            height={140}
                            className="rounded-lg"
                        />
                        <button
                            onClick={handleRemoveProductDisplayImage}
                            className="absolute top-1 right-1 bg-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow hover:bg-gray-200"
                        >
                            X
                        </button>
                    </div>
                )}
            </div>

            <div>
                <Label className="pb-1">Images <span className="text-red-500">*</span>
                </Label>
                <div className="border rounded-lg p-3 flex flex-wrap items-center gap-5 mt-2">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className="relative p-1 rounded-lg w-[200px] h-[140px] bg-secondary"
                        >
                            <Image
                                src={img.preview}
                                alt={`Uploaded ${index}`}
                                width={200}
                                height={140}
                                className="rounded-lg w-full h-full object-cover"
                            />
                            <button
                                onClick={() => handleRemoveImage(index)}
                                type="button"
                                className="absolute top-1 right-1 bg-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow hover:bg-gray-200"
                            >
                                X
                            </button>
                        </div>
                    ))}

                    <label htmlFor="item_images">
                        <Input
                            id="item_images"
                            className="hidden"
                            type="file"
                            accept="image/*"
                            onChange={handleItemImageChange}
                        />
                        <div className="border rounded-lg h-[140px] w-[200px] flex justify-center items-center bg-secondary cursor-pointer">
                            <PlusIcon className="size-8 text-secondary-foreground" />
                        </div>
                    </label>
                </div>
            </div>

            <div className="flex flex-wrap justify-between gap-2">
                {[
                    { id: "show_badge", label: "Show Badge?" },
                    { id: "fresh", label: "Fresh?" },
                    { id: "chemical_free", label: "Chemicals Free?" },
                    { id: "natural", label: "Natural?" },
                    { id: "no_antibiotic", label: "No Antibiotic?" },
                ].map(({ id, label }) => (
                    <div key={id}>
                        <Label className="pb-1">{label}</Label>
                        <div className="flex items-center justify-center gap-2">
                            <Switch
                                checked={formData[id] || false}
                                onCheckedChange={(checked) =>
                                    setFormData((prev) => ({ ...prev, [id]: checked }))
                                }
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* ---------- BENEFIT FORM ---------- */}

            <h2 className="text-2xl font-bold my-2">Benefits</h2>
            <div className="flex flex-wrap items-center gap-5">
                {benefits.map((benefit, index) => (
                    <div
                        key={benefit.Id}
                        className="border rounded-lg p-3 relative w-[260px]"
                    >
                        <div className="grid gap-3">
                            <Input
                                name="title"
                                value={benefit.title}
                                onChange={(e) =>
                                    handleBenefitChange(index, e.target.name, e.target.value)
                                }
                                placeholder="Title"
                                required
                            />
                            <Input
                                name="description"
                                value={benefit.description}
                                onChange={(e) =>
                                    handleBenefitChange(index, e.target.name, e.target.value)
                                }
                                placeholder="Description"
                                required
                            />

                            {benefit.image ? (
                                <div className="flex justify-center">
                                    <Image
                                        src={benefit.image.preview || benefit.image}
                                        alt="Benefit"
                                        width={150}
                                        height={150}
                                        className="rounded"
                                    />
                                </div>
                            ) : (
                                <label aria-label="benefit_image">
                                    <Input
                                        id={`benefit_image_${benefit.Id}`}
                                        className="hidden"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleBenefitImageChange(index, e)}
                                    />
                                    <div className="border rounded-lg h-24 w-24 flex justify-center items-center bg-secondary cursor-pointer">
                                        <ImageIcon className="size-18 text-secondary-foreground" />
                                    </div>
                                </label>
                            )}

                            {benefit.image && (
                                <label aria-label="change_benefit_image">
                                    <Input
                                        id={`benefit_image_change_${benefit.Id}`}
                                        className="hidden"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleBenefitImageChange(index, e)}
                                    />
                                </label>
                            )}
                        </div>

                        <PlusIcon
                            className="size-4 text-secondary-foreground cursor-pointer absolute bottom-3 right-3 rotate-45"
                            onClick={() => removeBenefit(benefit.Id)}
                            aria-label="Remove benefit"
                        />
                    </div>
                ))}

                <div
                    className="border rounded-lg h-24 w-24 flex justify-center items-center bg-secondary cursor-pointer"
                    onClick={addNewBenefit}
                    aria-label="Add new benefit"
                >
                    <PlusIcon className="size-18 text-secondary-foreground" />
                </div>
            </div>

            {/* ---------- NUTRITIONAL FORM ---------- */}

            <h2 className="text-2xl font-bold my-2">Nutritional Facts </h2>

            <div className="flex flex-wrap items-center gap-5">
                {/* Nutrients */}
                <div className="border rounded-lg p-3 flex flex-col gap-3">
                    <Label className="text-lg pb-1">Nutrients</Label>
                    {nutrients.map((nutrient, index) => (
                        <Fragment key={nutrient.id}>
                            <div className="flex items-end gap-3">
                                <Input
                                    name="label"
                                    value={nutrient.label}
                                    onChange={(e) =>
                                        handleNutrientChange(index, e.target.name, e.target.value)
                                    }
                                    placeholder="Label"
                                    required
                                />
                                <Input
                                    className="max-w-36"
                                    name="value"
                                    value={nutrient.value}
                                    onChange={(e) =>
                                        handleNutrientChange(index, e.target.name, e.target.value)
                                    }
                                    placeholder="Value"
                                    required
                                />

                                {index === 0 ? (
                                    <button
                                        type="button"
                                        onClick={addNewNutrient}
                                        className="rounded-lg size-9 flex justify-center items-center bg-secondary cursor-pointer"
                                        aria-label="Add nutrient"
                                    >
                                        <PlusIcon className="text-secondary-foreground" />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => removeNutrient(nutrient.id)}
                                        className="rounded-lg size-9 min-w-[36px] flex justify-center items-center bg-secondary cursor-pointer"
                                        aria-label="Remove nutrient"
                                    >
                                        <MinusIcon className="text-secondary-foreground" />
                                    </button>
                                )}
                            </div>
                        </Fragment>
                    ))}
                </div>

                {/* Vitamins */}
                <div className="border rounded-lg p-3 flex flex-col gap-3">
                    <Label className="text-lg pb-1">Vitamins</Label>
                    {vitamins.map((vitamin, index) => (
                        <Fragment key={vitamin.id}>
                            <div className="flex items-end gap-3">
                                <Input
                                    name="label"
                                    value={vitamin.label}
                                    onChange={(e) =>
                                        handleVitaminChange(index, e.target.name, e.target.value)
                                    }
                                    placeholder="Label"
                                    required
                                />
                                <Input
                                    className="max-w-36"
                                    name="value"
                                    value={vitamin.value}
                                    onChange={(e) =>
                                        handleVitaminChange(index, e.target.name, e.target.value)
                                    }
                                    placeholder="Value"
                                    required
                                />

                                {index === 0 ? (
                                    <button
                                        type="button"
                                        onClick={addNewVitamin}
                                        className="rounded-lg size-9 flex justify-center items-center bg-secondary cursor-pointer"
                                        aria-label="Add vitamin"
                                    >
                                        <PlusIcon className="text-secondary-foreground" />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => removeVitamin(vitamin.id)}
                                        className="rounded-lg size-9 min-w-[36px] flex justify-center items-center bg-secondary cursor-pointer"
                                        aria-label="Remove vitamin"
                                    >
                                        <MinusIcon className="text-secondary-foreground" />
                                    </button>
                                )}
                            </div>
                        </Fragment>
                    ))}
                </div>

                {/* Minerals */}
                <div className="border rounded-lg p-3 flex flex-col gap-3">
                    <Label className="text-lg pb-1">Minerals</Label>
                    {minerals.map((mineral, index) => (
                        <Fragment key={index}>
                            <div className="flex items-end gap-3">
                                <Input
                                    name="label"
                                    value={mineral.label}
                                    onChange={(e) =>
                                        handleMineralChange(index, e.target.name, e.target.value)
                                    }
                                    placeholder="Label"
                                    required
                                />
                                <Input
                                    className="max-w-36"
                                    name="value"
                                    value={mineral.value}
                                    onChange={(e) =>
                                        handleMineralChange(index, e.target.name, e.target.value)
                                    }
                                    placeholder="Value"
                                    required
                                />

                                {index === 0 ? (
                                    <button
                                        type="button"
                                        onClick={addNewMineral}
                                        className="rounded-lg size-9 flex justify-center items-center bg-secondary cursor-pointer"
                                        aria-label="Add mineral"
                                    >
                                        <PlusIcon className="text-secondary-foreground" />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => removeMineral(mineral.id)}
                                        className="rounded-lg size-9 min-w-[36px] flex justify-center items-center bg-secondary cursor-pointer"
                                        aria-label="Remove mineral"
                                    >
                                        <MinusIcon className="text-secondary-foreground" />
                                    </button>
                                )}
                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>

            <div className="flex gap-3">
                <div className="flex-1">
                    <Label className="pb-1">Ingredients</Label>
                    <Textarea
                        name="ingredients"
                        value={formData.ingredients}
                        className="min-h-[110px]"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-1">
                    <Label className="pb-1">Shelf Life </Label>
                    <Textarea
                        name="self_life"
                        className="min-h-[110px]"
                        value={formData.self_life}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="flex justify-center gap-4">
                <Link href={"/items"}>
                    <Button type="button" variant="outline">
                        Back to list
                    </Button>
                </Link>
                {!editItemId ? (
                    <Button type="submit" disabled={loading} onClick={handleSubmit}>
                        {loading ? "Saving..." : "Save"}
                    </Button>
                ) : (
                    <Button type="submit" disabled={loading} onClick={handleUpdate}>
                        {loading ? "Updating..." : "Update"}
                    </Button>
                )}
            </div>
        </form>
    );
}
