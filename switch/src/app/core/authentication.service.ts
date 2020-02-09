import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../shared/models/user.model';
import { format } from 'url';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user$: Observable<User>

  constructor(public afAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
  async signIn(email, password) {
    await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    return this.router.navigate['/dashboard']
  }

  async signUpEmail(email, password, userName) {
    const resp = await this.afAuth.auth.createUserWithEmailAndPassword( email, password);
    await resp.user.updateProfile({ displayName: userName});
    let uid = resp.user.uid;
    await this.afs.collection("users").add({email, password, userName, uid});
    return this.router.navigate['/dashboard']
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate['/'];
  }
}
