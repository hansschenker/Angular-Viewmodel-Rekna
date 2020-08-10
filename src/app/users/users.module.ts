import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
// user feature
import { UsersComponent } from "./users.component";
import { UserFormComponent } from "./user-form/user-form.component";
import { UserListComponent } from "./user-list/user-list.component";
import { UserDetailComponent } from "./user-detail/user-detail.component";
import { UserListItemComponent } from "./user-list-item/user-list-item.component";

@NgModule({
  declarations: [
    UsersComponent,
    UserFormComponent,
    UserListComponent,
    UserDetailComponent,
    UserListItemComponent,
  ],
  exports: [
    UsersComponent,
    UserFormComponent,
    UserListComponent,
    UserDetailComponent,
    UserListItemComponent,
  ],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
})
export class UsersModule {}
