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

  leeSemana() {
    return this.semanaCollection.get();
  }

  leeEntrenamientos() {
    return this.entrenamientosCollection.get();
  }

  actualizaEntrenamiento(id, data) {
    return this.entrenamientosCollection.doc(id).set(data);
  }

  leeCategoria() {
    return this.categoriasCollection.get();
  }

  getEntrenamientoPorDiaCategoria(dia, categoria) {
    return this.entrenamientosCollection.ref.where("dia", "==", dia).where("categoria", "==", categoria).get();
  }
}
