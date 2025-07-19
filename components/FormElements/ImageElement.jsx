import Image from 'next/image';
import React from 'react'

export default function ImageElement({ src, alt = "", width = 120, height = 130 }) {
    const HOSTNAME = process.env.NEXT_PUBLIC_BUNNY_STORAGE_PULL_HOSTNAME;

    //eger image yoksa durumunu yao
    return (
        <Image
            src={`https://${HOSTNAME}/${src}`}
            width={width}
            height={height}
            alt={alt}
            draggable={false}
            priority={true}
            className="w-full h-full object-cover rounded"
        />
    )
}
