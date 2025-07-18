import { Input } from '@heroui/input'

export default function NumberInputElement({label, value, onValueChange}) {
  return (
    <Input
                            type="number"
                            step={0.01}
                            pattern="^\d+([.,]\d+)?$"
                            isRequired
                            inputMode='decimal'
                            className="w-full"
                            max={999}
                            min={0}
                            labelPlacement="outside"
                            label={label}
                            value={value}
                            onValueChange={onValueChange}
                        />
  )
}
