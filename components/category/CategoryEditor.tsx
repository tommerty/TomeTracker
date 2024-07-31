"use client";
import React, { useState, useEffect } from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Category } from "@/types/Category";
import { Input } from "../ui/input";
import { Trash2 } from "lucide-react";

interface CategoryEditorProps {
    onCategoriesUpdated: () => void;
}

const CategoryEditor: React.FC<CategoryEditorProps> = ({
    onCategoriesUpdated,
}) => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const savedCategories = localStorage.getItem("timeTrackerCategories");
        if (savedCategories) {
            setCategories(JSON.parse(savedCategories));
        }
    }, []);

    const handleCategoryChange = (
        index: number,
        field: keyof Category,
        value: string
    ) => {
        const updatedCategories = [...categories];
        updatedCategories[index] = {
            ...updatedCategories[index],
            [field]: value,
        };
        setCategories(updatedCategories);
    };

    const handleCategoryDelete = (index: number) => {
        const updatedCategories = categories.filter((_, i) => i !== index);
        setCategories(updatedCategories);
    };

    const handleSaveCategories = () => {
        localStorage.setItem(
            "timeTrackerCategories",
            JSON.stringify(categories)
        );
        onCategoriesUpdated();
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button>Edit Categories</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Category Editor</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4">
                    {categories.map((category, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <Input
                                className="flex-grow"
                                value={category.name}
                                onChange={(e) =>
                                    handleCategoryChange(
                                        index,
                                        "name",
                                        e.target.value
                                    )
                                }
                            />
                            <Input
                                type="color"
                                className="h-full w-14 p-1"
                                value={category.color}
                                onChange={(e) =>
                                    handleCategoryChange(
                                        index,
                                        "color",
                                        e.target.value
                                    )
                                }
                            />
                            <Button
                                variant="destructive"
                                onClick={() => handleCategoryDelete(index)}
                            >
                                <Trash2 />
                            </Button>
                        </div>
                    ))}
                </div>
                <Button onClick={handleSaveCategories}>Save</Button>
            </SheetContent>
        </Sheet>
    );
};

export default CategoryEditor;
