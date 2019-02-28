import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.scss']
})
export class UserGridComponent implements OnInit {
  public dataSource: User[];
  public readonly displayedColumns = ['id', 'fullName', 'email', 'dob'];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.dataSource = this.userService.getAll();
  }

  public navigate(row: User) {
    this.router.navigate(['/', 'details', row.id]);
  }
}
