import Cryptr from 'cryptr';

const cryptr = new Cryptr(process.env.CRYPTR_KEY);

export function encryptCVC(cvc: string) {
    return cryptr.encrypt(cvc);
}
