"use client"
import { useParams } from 'next/navigation'

export default function UrunPage() {
      const params = useParams()

    return (
        <div className="grid grid-cols-2 justify-center gap-4 max-w-md m-auto my-3">
            <p>{params.id}</p>
        </div>
    )
}