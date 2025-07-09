import bcrypt from "bcryptjs";

//Parola şifreleme fonksiyonu
export async function parolaEncrypt(password) {
    try {
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Parola şifrelenirken hata:', error);
        throw new Error('Parola şifreleme hatası');
    }
}

export async function parolaDogrula(password, hashedPassword) {
    try {
        const isValid = await bcrypt.compare(password, hashedPassword);
        return isValid;
    } catch (error) {
        console.error('Parola doğrulanırken hata:', error);
        return false;
    }
}


export const formatPrice = (price) => {
        const num = parseFloat(price);
        return num.toFixed(2).replace(".", ",")
    }