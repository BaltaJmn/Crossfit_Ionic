import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from 'src/environments/environment';
import { firestore } from 'firebase';
import { EncryptServiceService } from './encrypt-service.service';

@Injectable({
  providedIn: 'root'
})
export class SemanaservicioService {

  semanaCollection: any;
  entrenamientosCollection: any;
  categoriasCollection: any;

  firebaseDes: any;

  constructor(
    private fireStore: AngularFirestore,
    private encrypter: EncryptServiceService
  ) {

    this.firebaseDes = this.encrypter.decryptData(environment.firebaseConfigEncrip);

    this.semanaCollection = fireStore.collection<any>(this.firebaseDes.semanaColeccion);
    this.entrenamientosCollection = fireStore.collection<any>(this.firebaseDes.entrenamientosColeccion);
    this.categoriasCollection = fireStore.collection<any>(this.firebaseDes.categoriasColeccion);

  }

  /**
   * Consulta que devuelve la colección de días de la semana
   */
  leeSemana() {
    return this.semanaCollection.get();
  }

  /**
   * Consulta que devuelve la colección de entrenamientos
   */
  leeEntrenamientos() {
    return this.entrenamientosCollection.get();
  }

  /**
   * Consulta que actualiza la colección de entrenamientos
   * @param id ID del entrenamiento
   * @param data Datos del entrenamiento
   */
  actualizaEntrenamiento(id, data) {
    return this.entrenamientosCollection.doc(id).set(data);
  }

  /**
   * Consulta que devuelve la colección de categorías
   */
  leeCategoria() {
    return this.categoriasCollection.get();
  }

  /**
   * Consulta que devuelve la colección de entrenamientos de un día y una categoría en concreto
   * @param dia Dia de la consulta
   * @param categoria Categoria de la consulta
   */
  getEntrenamientoPorDiaCategoria(dia, categoria) {
    return this.entrenamientosCollection.ref.where("dia", "==", dia).where("categoria", "==", categoria).get();
  }
}
