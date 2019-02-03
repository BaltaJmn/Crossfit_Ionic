import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from 'src/environments/environment';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class SemanaservicioService {

  semanaCollection: any;
  entrenamientosCollection: any;
  categoriasCollection: any;

  constructor(private fireStore: AngularFirestore) {

    this.semanaCollection = fireStore.collection<any>(environment.firebaseConfig.semanaColeccion);
    this.entrenamientosCollection = fireStore.collection<any>(environment.firebaseConfig.entrenamientosColeccion);
    this.categoriasCollection = fireStore.collection<any>(environment.firebaseConfig.categoriasColeccion);

  }

  /* Consulta que devuelve la colección de días de la semana */
  leeSemana() {
    return this.semanaCollection.get();
  }

  /* Consulta que devuelve la colección de entrenamientos */
  leeEntrenamientos() {
    return this.entrenamientosCollection.get();
  }

  /* Consulta que actualiza la colección de entrenamientos */
  actualizaEntrenamiento(id, data) {
    return this.entrenamientosCollection.doc(id).set(data);
  }

  /* Consulta que devuelve la colección de categorías */
  leeCategoria() {
    return this.categoriasCollection.get();
  }

  /* Consulta que devuelve la colección de entrenamientos de un día y una categoría en concreto */
  getEntrenamientoPorDiaCategoria(dia, categoria) {
    return this.entrenamientosCollection.ref.where("dia", "==", dia).where("categoria", "==", categoria).get();
  }
}
