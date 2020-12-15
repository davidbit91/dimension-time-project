import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { iTask } from '../interfaces/task';
import { iUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private afs: AngularFirestore) {}

  create(user: iUser) {
    return this.afs.collection('users').doc(user.id).set(user);
  }

  createTask(task: iTask) {
    return this.afs
      .collection<iTask>('tasks')
      .doc(task.id)
      .set(Object.assign({}, task));
  }

  getUserById$(id): Observable<iUser> {
    return this.afs.collection<iUser>('users').doc(id).valueChanges();
  }

  generateTaskId() {
    return this.afs.createId();
  }

  updateUser(user) {
    return this.afs
      .collection<iUser>('users')
      .doc(user.id)
      .update(Object.assign({}, user));
  }
  updateTask(task) {
    return this.afs
      .collection<iTask>('tasks')
      .doc(task.id)
      .update(Object.assign({}, task));
  }
}
