import { Component, OnInit } from '@angular/core';

import { User } from './models/user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public userList: User[];
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userList = this.userService.getAll();
  }
}
