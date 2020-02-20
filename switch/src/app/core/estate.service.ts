import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Estate } from '../shared/models/estate.model';
import { runInThisContext } from 'vm';

@Injectable({
  providedIn: 'root'
})
export class EstateService {
  error: string;
  estateDoc:  AngularFirestoreCollection<Estate>;
  estates$: Observable<any>;

  constructor(private afs: AngularFirestore) {
    this.estateDoc = this.afs.collection<Estate>('estate');
    this.estates$ =this.estateDoc.valueChanges();
   }

 async createEstate(estate) {
    try {
      await this.afs.doc(`estate/${estate.key}`).set(estate);
      console.log('succesfully added')
    } catch (error) {
      this.error = error.message;
    }
  }
}
