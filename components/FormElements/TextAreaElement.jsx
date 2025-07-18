import { Textarea } from "@heroui/input";

export default function TextAreaElement({ label, value, onValueChange }) {
    return (
        <Textarea
            className='mt-3'
            maxLength={160}
            fullWidth
            label={label}
            labelPlacement="outside"
            value={value}
            description="Açıklama zorunlu değildir."
            onValueChange={onValueChange}
        />
    )
}
