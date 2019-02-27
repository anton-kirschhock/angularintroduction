# Angular - Just another Introduction (2019)

Yes, It is that time of the year! Another Angular Introduction.
In this repository you can find all source code related to the session "Angular - Just another Introduction".

## How this repository works.

Each live demo is linked to a certain branch. You can see the branch name in the top right corner of the slide. Each branch is the finalized product of that slide.

The branchnames are:

- **starter**: The starting template to begin with.
- **first_steps**: Introduction to Angular CLI, serving the app, creating a new component, pass data through One and Twoway binding. We also create a grid to display a list of users, using a service
- **router**: Introduces routes, navigation, resolving data from a service for a Detail page, Template driven forms.
- **rxjs**: introduces HTTP client and Handling and using Observables.
- **master**: The final product!

## In this Step: First steps

1. Generate the component files using Angular CLI:

```sh
ng generate component userGrid
```

1. Create a interface to define the model

```sh
ng generate interface models/user --type=model --skiptest=true
```

Add the following content:

```ts
export interface User {
  id: number;
  name: string;
  firstName: string;
  email: string;
  dateOfBirth: string;
}
```

3. Create user.service.ts service

```sh
ng g service user
```

```ts
@Injectable({ providedIn: 'root' })
export class UserService {
  public getAll(): User[] {
    return this.getUserList();
  }

  private getUserList(): User[] {
    return [...];
  }
}
```

4. Add @Input() to user-grid.component.ts

```ts
  @Input() dataSource: User[];
```

5. Add the property userList to app.component and inject the service

```ts
export class AppComponent implements OnInit {
  public userList: User[];
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userList = this.userService.getAll();
  }
}
```

6. Add the component to the app.component.html and one way binding:

```html
<app-user-grid [dataSource]="userList"></app-user-grid>
```

7. add the Card and table module to the app module imports:

```ts
import { MatTableModule, MatCardModule } from '@angular/material';

@NgModule({
  declarations: [...],
  imports: [...
    MatTableModule,
    MatCardModule
  ],
  providers: [...],
  bootstrap: [...]
})
export class AppModule { }

```

8. Add the HTML to the user-grid html:

```html
<mat-card class="mat-elevation-z8">
  <mat-card-header> <h1>Users</h1> </mat-card-header>
  <mat-card-content>
    <table mat-table [dataSource]="dataSource" class="full-width">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef>#</th>
        <td mat-cell *matCellDef="let element">{{ element.id }}</td>
      </ng-container>

      <ng-container matColumnDef="fullName">
        <th mat-header-cell *matHeaderCellDef>Full name</th>
        <td mat-cell *matCellDef="let element">
          {{ element.firstName }} {{ element.name }}
        </td>
      </ng-container>

      <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef>Email</th>
        <td mat-cell *matCellDef="let element">{{ element.email }}</td>
      </ng-container>

      <ng-container matColumnDef="dob">
        <th mat-header-cell *matHeaderCellDef>Date of birth</th>
        <td mat-cell *matCellDef="let element">{{ element.dateOfBirth }}</td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>
  </mat-card-content>
</mat-card>
```

... and add the following to the TS code:

```ts
  public readonly displayedColumns = ['id', 'fullName', 'email', 'dob'];
```
