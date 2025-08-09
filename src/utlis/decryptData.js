import CryptoJS from "crypto-js";
const BASE64_KEY = import.meta.env.VITE_BASE64_64;

const decryptAESData = (encryptedBase64) => {
  if (!encryptedBase64) return null; // prevent parsing null

  try {
    // Convert base64 key to WordArray
    const keyBytes = CryptoJS.enc.Base64.parse(BASE64_KEY);

    // Decode the encrypted data from base64
    const encryptedBytes = CryptoJS.enc.Base64.parse(encryptedBase64);

    // Extract IV (first 16 bytes) and ciphertext (rest)
    const iv = CryptoJS.lib.WordArray.create(encryptedBytes.words.slice(0, 4));
    const ciphertext = CryptoJS.lib.WordArray.create(
      encryptedBytes.words.slice(4)
    );

    // Decrypt
    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: ciphertext },
      keyBytes,
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
};

export default decryptAESData;
