import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { ProductsModule } from "./products/products.module";
import { PaginationModule } from "./shared/pagination/pagination.module";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ProductsModule,
    PaginationModule,
    SharedModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
