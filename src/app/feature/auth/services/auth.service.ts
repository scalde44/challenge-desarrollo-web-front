import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat';
import { AuthUtil } from 'src/app/shared/utils/auth-util';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private messageService: MessageService
  ) {}

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        if (res.user?.emailVerified) {
          this.router.navigate(['cargame/home']);
        } else {
          this.messageService.alert(
            AuthUtil.INFO_ICON,
            AuthUtil.INFORMATION_TITLE,
            AuthUtil.UNVERIFIED_EMAIL
          );
        }
      },
      (err) => {
        this.messageService.alert(
          AuthUtil.ERROR_ICON,
          AuthUtil.TITLE,
          AuthUtil.WRONG_MESSAGE
        );
        this.router.navigate(['auth/login']);
      }
    );
  }

  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        this.router.navigate(['auth/login']);
        this.sendEmailForVerification(res.user);
      },
      (err) => {
        this.messageService.alert(
          AuthUtil.ERROR_ICON,
          AuthUtil.TITLE,
          err.message
        );
        this.router.navigate(['auth/register']);
      }
    );
  }

  sendEmailForVerification(user: firebase.User) {
    user.sendEmailVerification().then(
      () => {
        this.messageService.alert(
          AuthUtil.INFO_ICON,
          AuthUtil.INFORMATION_TITLE,
          AuthUtil.VERIFY_EMAIL
        );
      },
      (err) =>
        this.messageService.alert(
          AuthUtil.ERROR_ICON,
          AuthUtil.TITLE,
          AuthUtil.MESSAGE_NOT_SENT
        )
    );
  }

  logout() {
    this.fireauth.signOut().then(
      () => {
        this.router.navigate(['auth/login']);
      },
      (err) =>
        this.messageService.alert(
          AuthUtil.ERROR_ICON,
          AuthUtil.TITLE,
          err.message
        )
    );
  }

  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(
      () =>
        this.messageService.alert(
          AuthUtil.INFO_ICON,
          AuthUtil.INFORMATION_TITLE,
          AuthUtil.VERIFY_EMAIL
        ),
      (err) =>
        this.messageService.alert(
          AuthUtil.ERROR_ICON,
          AuthUtil.TITLE,
          AuthUtil.WRONG_MESSAGE
        )
    );
  }

  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider()).then(
      (res) => {
        this.router.navigate(['cargame/home']);
      },
      (err) => {
        this.messageService.alert(
          AuthUtil.ERROR_ICON,
          AuthUtil.TITLE,
          err.message
        );
        this.router.navigate(['auth/login']);
      }
    );
  }
}
