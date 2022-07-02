import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { MessageService } from 'src/app/feature/auth/services/message.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { Constants } from '../class/constants';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

constructor(private fireauth : AngularFireAuth, private messageService : MessageService, private router : Router) {}

  canActivate(): Observable<boolean> {
    return this.fireauth.authState.pipe(map((user)=>{
      if(user) {
        return true;
      }
      this.messageService.alert(Constants.INFO_ICON, Constants.INFORMATION_TITLE, Constants.LOGIN_REQUIRED);
      this.router.navigate(['auth/login']);
      return false;
    }))
  }
  
}
