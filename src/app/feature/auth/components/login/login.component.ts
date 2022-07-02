import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';
import { Constants } from 'src/app/shared/class/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email : string = '';
  password : string = '';

  constructor(private authService : AuthService, private messageService : MessageService) { }

  ngOnInit(): void {
  }

  login() {
    if(this.email == ''){
      
      this.messageService.alert(Constants.WARNING_ICON, Constants.TITLE, Constants.EMAIL_BLANK);
      return;
    }

    if(this.password == ''){
      this.messageService.alert(Constants.WARNING_ICON, Constants.TITLE, Constants.PASSWORD_BLANK);
      return;
    }

    this.authService.login(this.email, this.password);      
  }

  loginWithGoogle() {
    this.authService.googleSignIn();    
  }

}
