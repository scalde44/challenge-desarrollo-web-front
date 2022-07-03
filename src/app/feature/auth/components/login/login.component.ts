import { Component, OnInit } from '@angular/core';
import { AuthUtil } from 'src/app/shared/utils/auth-util';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  login() {
    if (this.email == '') {
      this.messageService.alert(
        AuthUtil.WARNING_ICON,
        AuthUtil.TITLE,
        AuthUtil.EMAIL_BLANK
      );
      return;
    }

    if (this.password == '') {
      this.messageService.alert(
        AuthUtil.WARNING_ICON,
        AuthUtil.TITLE,
        AuthUtil.PASSWORD_BLANK
      );
      return;
    }

    this.authService.login(this.email, this.password);
  }

  loginWithGoogle() {
    this.authService.googleSignIn();
  }
}
