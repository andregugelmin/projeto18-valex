import Cryptr from 'cryptr';
import bcrypt from 'bcrypt';

const cryptr = new Cryptr(process.env.CRYPTR_KEY);

export function encryptCVC(cvc: string) {
    return cryptr.encrypt(cvc);
}

export function decryptCVC(encriptedCvc: string) {
    const decryptedCVC = cryptr.decrypt(encriptedCvc);
    return decryptedCVC;
}

export function encryptPassword(password: string) {
    const SALT = 10;
    const passwordHash = bcrypt.hashSync(password, SALT);
    return passwordHash;
}
