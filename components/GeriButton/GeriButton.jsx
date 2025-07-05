"use client"
import { Button } from "@heroui/button";
import { GeriIcon } from "@/public/icon.jsx"

export default function GeriButton() {
    const handleBackPress = () => {
        window.history.back()
    }
    return (
        <Button 
            isIconOnly 
            onPress={handleBackPress}
            className="size-10 ml-2" 
            aria-label="geri" 
            variant="light" 
            color="primary"
        >
            <GeriIcon />
        </Button>
    )
}