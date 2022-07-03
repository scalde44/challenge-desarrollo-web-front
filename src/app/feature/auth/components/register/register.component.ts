import { Component, OnInit } from '@angular/core';
import { AuthUtil } from 'src/app/shared/utils/auth-util';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  register() {
    if (this.email == '') {
      this.messageService.alert(
        AuthUtil.WARNING_ICON,
        AuthUtil.TITLE,
        AuthUtil.EMAIL_BLANK
      );
      return;
    }

    if (!this.isEmail(this.email)) {
      this.messageService.alert(
        AuthUtil.ERROR_ICON,
        AuthUtil.TITLE,
        AuthUtil.EMAIL_WRONG
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

    this.authService.register(this.email, this.password);
  }

  isEmail(email: string): boolean {
    const regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return regexp.test(email);
  }
}
