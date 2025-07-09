export const formatPrice = (price) => {
        const num = parseFloat(price);
        return num.toFixed(2).replace(".", ",")
    }