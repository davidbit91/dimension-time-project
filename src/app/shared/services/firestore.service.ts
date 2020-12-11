import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { iUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private afs: AngularFirestore) { }

  create(user: iUser){
    console.log(user.id);

    return this.afs.collection('users').doc(user.id).set(user);
  }
}
