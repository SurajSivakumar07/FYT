import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_FERNET_KEY;

export const decrypt = (encrypted) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (err) {
    console.error("Decryption error:", err);
    return null;
  }
};
