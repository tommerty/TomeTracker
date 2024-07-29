"use client";
import React, { useState, useEffect } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { SketchPicker } from "react-color";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Circle, Plus, Save } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Accordion } from "./ui/accordion";

type Category = {
    name: string;
    color: string;
};

interface CategoryManagerProps {
    onCategoryChange: (category: string) => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({
    onCategoryChange,
}) => {
    const [categories, setCategories] = useState<Category[]>(() => {
        if (typeof window !== "undefined") {
            const savedCategories = localStorage.getItem(
                "timeTrackerCategories"
            );
            return savedCategories ? JSON.parse(savedCategories) : [];
        }
        return [];
    });
    const [newCategoryInput, setNewCategoryInput] = useState("");
    const [newCategoryColor, setNewCategoryColor] = useState("#313447");

    useEffect(() => {
        localStorage.setItem(
            "timeTrackerCategories",
            JSON.stringify(categories)
        );
    }, [categories]);

    const addNewCategory = () => {
        if (
            newCategoryInput.trim() &&
            !categories.some((cat) => cat.name === newCategoryInput.trim())
        ) {
            setCategories([
                ...categories,
                { name: newCategoryInput.trim(), color: newCategoryColor },
            ]);
            setNewCategoryInput("");
            setNewCategoryColor("#000000");
        }
    };

    return (
        <div>
            <div className="mt-4">
                <Label htmlFor="category">Category</Label>
                <div className="flex gap-1">
                    <Select onValueChange={onCategoryChange}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem
                                    key={category.name}
                                    value={category.name}
                                >
                                    <div className="flex items-center">
                                        <div
                                            className="w-4 h-4 rounded-full mr-2"
                                            style={{
                                                backgroundColor: category.color,
                                            }}
                                        />
                                        {category.name}
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button>
                                <Plus />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-2">
                            <Label>Create a new category</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    type="text"
                                    id="newCategory"
                                    className="flex-grow bg-muted"
                                    value={newCategoryInput}
                                    onChange={(e) =>
                                        setNewCategoryInput(e.target.value)
                                    }
                                />
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            size={"icon"}
                                            className="rounded-full shrink-0 cursor-pointer"
                                            style={{
                                                background:
                                                    newCategoryColor ||
                                                    "#313447",
                                            }}
                                        />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <SketchPicker
                                            color={newCategoryColor}
                                            onChangeComplete={(color) =>
                                                setNewCategoryColor(color.hex)
                                            }
                                        />
                                    </PopoverContent>
                                </Popover>

                                <Button onClick={addNewCategory}>
                                    <Save size={16} />
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    );
};

export default CategoryManager;
