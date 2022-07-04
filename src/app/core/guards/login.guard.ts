import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageService } from 'src/app/feature/auth/services/message.service';
import { AuthUtil } from '../../shared/utils/auth-util';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private fireauth: AngularFireAuth,
    private messageService: MessageService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.fireauth.authState.pipe(
      map((user) => {
        if (user) {
          return true;
        }
        this.messageService.alert(
          AuthUtil.INFO_ICON,
          AuthUtil.INFORMATION_TITLE,
          AuthUtil.LOGIN_REQUIRED
        );
        this.router.navigate(['auth/login']);
        return false;
      })
    );
  }
}
