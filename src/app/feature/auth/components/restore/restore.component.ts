import { Component, OnInit } from '@angular/core';
import { AuthUtil } from 'src/app/shared/utils/auth-util';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-restore',
  templateUrl: './restore.component.html',
  styleUrls: ['./restore.component.scss'],
})
export class RestoreComponent implements OnInit {
  email: string = '';

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  sendLinkEmail() {
    if (this.email == '') {
      this.messageService.alert(
        AuthUtil.WARNING_ICON,
        AuthUtil.TITLE,
        AuthUtil.EMAIL_BLANK
      );
      return;
    }
    this.authService.forgotPassword(this.email);
  }
}
