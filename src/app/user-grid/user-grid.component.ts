import { Component, Input, OnInit } from '@angular/core';

import { User } from '../models/user.model';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.scss']
})
export class UserGridComponent implements OnInit {
  @Input() dataSource: User[];
  public readonly displayedColumns = ['id', 'fullName', 'email', 'dob'];

  ngOnInit() {}
}
