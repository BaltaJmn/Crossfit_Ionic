import { Injectable } from '@angular/core';

//Encriptar
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptServiceService {

  //Encrypt
  encryptSecretKey: any = "secretKey";

  constructor() { }

  /**
   * Encripta los datos 
   * @param data Datos a encriptar
   */
  encryptData(data) {

    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
    } catch (e) {
      console.log(e);
    }

  }

  /**
   * Desencripta los datos
   * @param data Datos a desencriptar
   */
  decryptData(data:any) {

    try {
      const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
