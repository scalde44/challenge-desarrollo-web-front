import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input()
  items: MenuItem[];
  @Input()
  title: MenuItem;
  @Output()
  logout: EventEmitter<boolean> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  exit() {
    this.logout.emit(true);
  }
}
