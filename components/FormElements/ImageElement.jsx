import Image from 'next/image';
import React from 'react'

export default function ImageElement({src, alt = ""}) {
      const HOSTNAME = process.env.NEXT_PUBLIC_BUNNY_STORAGE_PULL_HOSTNAME;

      //eger image yoksa durumunu yao
    return (
        <Image
            src={`https://${HOSTNAME}/${src}`}
            width={120}
            height={130}
            alt={alt}
            draggable={false}
            className="w-full h-full object-cover rounded"
        />
    )
}
