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

## In this Step: Router

Firstly we need to create a routing module for the application.

```sh
ng g m appRouting --flat=true --module=app
```

This generates a app-routing module in the root folder and also adds it directly in the app module.

Now we need to add the following before @NgModule:

```ts
import { Routes } from '@angular/router';

const routes: Routes = [];
```

and add the following to the imports:

```ts
imports: [..., RouterModule.forRoot(routes)]
```

and export

```ts
exports: [RouterModule];
```

Now the magic needs to happen. We need to add a overview route and a route which redirects all not known route to our overview. Add the following to the routes const:

```ts
const routes: Routes = [
  {
    path: 'overview',
    component: UserGridComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'overview'
  }
];
```

We need to tell angular where to render the routes to. in AppComponent add:

```html
<router-outlet></router-outlet>
```

The previous code we've written in the app.component.ts can be moved to the user-grid.component.ts, as we don't need the binding anymore:

```ts
public dataSource: User[];
  public readonly displayedColumns = ['id', 'fullName', 'email', 'dob'];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.dataSource = this.userService.getAll();
  }
```

Now we want to be able to navigate to a detail page when we click a row.

Create a new component:

```sh
ng g c userDetail
```

In the user-detail.component.html file add the following html:

```html
<mat-card class="mat-elevation-z8">
  <mat-card-header>
    <h1>User detail <small>{{ user.id }}</small></h1>
  </mat-card-header>
  <mat-card-content>
    <form #userForm="ngForm">
      <mat-form-field class="full-width">
        <mat-label>First name</mat-label>
        <input
          matInput
          placeholder="First name"
          [(ngModel)]="user.firstName"
          name="firsName"
        />
      </mat-form-field>
      <mat-form-field class="full-width">
        <mat-label>Last name</mat-label>
        <input
          matInput
          placeholder="Last name"
          [(ngModel)]="user.name"
          name="name"
        />
      </mat-form-field>
      <mat-form-field class="full-width">
        <mat-label>Email</mat-label>
        <input
          matInput
          placeholder="Email"
          type="email"
          [(ngModel)]="user.email"
          name="email"
        />
      </mat-form-field>
      <mat-form-field class="full-width">
        <mat-label>DOB</mat-label>
        <input
          matInput
          placeholder="DOB"
          [(ngModel)]="user.dateOfBirth"
          name="dateOfBirth"
        />
      </mat-form-field>
    </form>
  </mat-card-content>
</mat-card>
```

And add some styling to make it look nice:

```scss
.full-width {
  width: 100%;
  display: block;
}
```

Note the [(ngModel)], we call it a Banana in a Box. It is basicly a two way binding.
We can have a input using the [] and the () is a output. Basicly when a event (an output) occures, it will assign the output from that event to the property you've assigned. We'll take a deeper look later on.

We need to let Angular now about FormsModule and the material form module. Add the following to app.module.ts's imports:

```ts
imports:[..., MatFormFieldModule, MatInputModule, FormsModule]
```

Next thing we need to do is to define a route:

```ts
{
  path:'details/:id',
  component: UserDetailComponent
}
```

:id is a param we can access later on.
We will create a Resolver, which will read that :id param and fetch the model from the service. Sadly there is no Generate command... So create a new file in the root of the app 'detail.resolver.ts':

```ts
@Injectable({ providedIn: 'root' })
export class DetailResolver implements Resolve<User> {
  constructor(private userService: UserService, private router: Router) {}
  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): User {
    const id = +route.params['id'];
    if (isNaN(id)) {
      this.router.navigate(['/']);
      return undefined;
    }
    return this.userService.getById(id);
  }
}
```

Now we need to define that this resolver has to be used for this route. Add the following to our route:

```ts
  {
    path: 'details/:id',
    component: UserDetailComponent,
    resolve: {
      model: DetailResolver
    }
  }
```

and in our detais.component.ts needs:

```ts
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.user = this.activatedRoute.snapshot.data['model'];
  }
```

Now add the following to our grid row:

```html
<tr
  mat-row
  *matRowDef="let row; columns: displayedColumns"
  class="navigatable-row"
  (click)="navigate(row)"
></tr>
```

and in the typescript code:

```ts
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
```

oh and dont we like all some hover effect?

```scss
.navigatable-row:hover {
  outline: 1px solid salmon;
  cursor: pointer;
}
```

We also would like to return. Add the following to the bottom of the detail html:

```html
<a mat-button [routerLink]="['/']">
  <mat-icon>back</mat-icon> Back to overview
</a>
```

Don't forget to include the MatIconModule, MatButtonModule module in our imports!
