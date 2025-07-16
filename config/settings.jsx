import { Roboto } from "next/font/google";

export const fontRoboto = Roboto({
  subsets: ["latin"],
  variable: "--font-sans"
})


export const settings = {
  title: "Kahve Diyarı",
  description: "Kahve Diyarı'nın menüsüne hoş geldiniz. Burada lezzetli kahveler, tatlılar ve atıştırmalıklar bulabilirsiniz.",
  imageUpload: {
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    maxSize: 10 * 1024 * 1024, // 10 MB
  }
}