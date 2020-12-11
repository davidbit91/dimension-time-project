import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { iTask } from '../interfaces/task';
import { iUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private afs: AngularFirestore) { }

  create(user: iUser){
    return this.afs.collection('users').doc(user.id).set(user);
  }

  createTask(task: iTask){
    console.log(task);

    return this.afs.collection<iTask>('tasks').doc(task.id).set(Object.assign({}, task));
  }

  getUserById$(id){
      return this.afs.collection<iUser>('users').doc(id).valueChanges();
  }

  generateTaskId(){
    return this.afs.createId();
  }
}
