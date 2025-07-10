import TopNavbar from "@/components/TopNavbar/TopNavbar.jsx";
import LoginForm from "./LoginForm";
import { controlParola } from "@/lib/database";
import { setAuthCookie } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Login({ searchParams }) {
    const params = await searchParams;
    const redirectTo = params?.redirect || '/yonetim';

    const handleLogin = async (formData) => {
        "use server"
        
        try {
            const parola = formData.get('parola');
            
            if (!parola) {
                return { error: 'Parola gerekli' };
            }

            // Parolayı kontrol et
            const result = await controlParola(parola);
            
            if (!result.isValid) {
                return { error: 'Parola yanlış' };
            }

            // Auth cookie'yi set et
            await setAuthCookie();
            
            
        } catch (error) {
            console.error('Login hatası:', error);
            return { error: 'Giriş yapılırken hata oluştu' };
        }
        redirect(redirectTo);
    };

    return (
        <>
            <TopNavbar title="Yönetim Girişi" />
            <LoginForm handleLogin={handleLogin} redirectTo={redirectTo} />
        </>
    );
}