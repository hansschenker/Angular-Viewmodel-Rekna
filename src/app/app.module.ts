import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { HttpClientModule } from "@angular/common/http";
import { UsersModule } from "./users/users.module";
import { ProductsModule } from "./products/products.module";
import { ToastsModule } from "./toasts/toasts.module";
import { PaginationModule } from "./shared/pagination/pagination.module";
import { CountdownModule } from './countdown/countdown.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    UsersModule,
    ProductsModule,
    ToastsModule,
    PaginationModule,
    CountdownModule,
    SharedModule,
  ],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
