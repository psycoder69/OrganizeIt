// Function to generate a random alphanumeric string of a given length
const generateRandomString = (length: number) => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
        
        // Add a hyphen every 4 characters, but not after the last character
        if ((i + 1) % 4 === 0 && i + 1 !== length) {
            result += '-';
        }
    }

    return result;
};

// Function to generate a 16-character unique UUID
export const generateUniqueId = () => {
    return generateRandomString(16);
};