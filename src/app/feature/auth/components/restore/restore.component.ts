import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Constants } from 'src/app/shared/class/constants';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-restore',
  templateUrl: './restore.component.html',
  styleUrls: ['./restore.component.scss']
})
export class RestoreComponent implements OnInit {

  email : string = '';

  constructor(private authService : AuthService, private messageService : MessageService) { }

  ngOnInit(): void {
  }

  sendLinkEmail() {
    if(this.email == ''){
      this.messageService.alert(Constants.WARNING_ICON, Constants.TITLE, Constants.EMAIL_BLANK);
      return;
    }
    this.authService.forgotPassword(this.email);
  }

}
