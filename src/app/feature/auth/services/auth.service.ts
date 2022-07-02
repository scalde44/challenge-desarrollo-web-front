import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat';
import { Constants } from 'src/app/shared/class/constants';
import { MessageService } from './message.service';
import { GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router : Router, private messageService : MessageService ) {    
  }

  login(email : string, password :string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(res=> {
      if(res.user?.emailVerified) {
        this.router.navigate(['cargame/home']);
      }
      else {
        this.messageService.alert(Constants.INFO_ICON, Constants.INFORMATION_TITLE, Constants.UNVERIFIED_EMAIL);
      } 
    }, err => {
      this.messageService.alert(Constants.ERROR_ICON, Constants.TITLE, Constants.WRONG_MESSAGE);
      this.router.navigate(['auth/login']);
    })
  }

  register(email : string, password :string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res=> {
      this.router.navigate(['auth/login']);
      this.sendEmailForVerification(res.user);
    }, err => {
      this.messageService.alert(Constants.ERROR_ICON, Constants.TITLE, err.message);
      this.router.navigate(['auth/register']);
    })
  }

  sendEmailForVerification(user: firebase.User) {
    user.sendEmailVerification().then(()=>{
      this.messageService.alert(Constants.INFO_ICON, Constants.INFORMATION_TITLE, Constants.VERIFY_EMAIL);
    }, 
    err => this.messageService.alert(Constants.ERROR_ICON, Constants.TITLE, Constants.MESSAGE_NOT_SENT))
  }

  logout() {
    this.fireauth.signOut().then(() => {
      this.router.navigate(['auth/login']);
    },
    err => this.messageService.alert(Constants.ERROR_ICON, Constants.TITLE, err.message))
  }

  forgotPassword(email : string) {
    this.fireauth.sendPasswordResetEmail(email).then(()=> 
      this.messageService.alert(Constants.INFO_ICON, Constants.INFORMATION_TITLE, Constants.VERIFY_EMAIL)
    ,
    err => this.messageService.alert(Constants.ERROR_ICON, Constants.TITLE, Constants.WRONG_MESSAGE))
  }

  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res=> {
      this.router.navigate(['cargame/home']);
    },
    err => {
      this.messageService.alert(Constants.ERROR_ICON, Constants.TITLE, err.message);
      this.router.navigate(['auth/login']);
    });
  } 
}
