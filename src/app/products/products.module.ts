import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
// shared
import { PaginationModule } from "../shared/pagination/pagination.module";

// products feature
import { ProductsRoutingModule } from "./products-routing.module";
import { ProductsComponent } from "./products.component";
import { ProductSearchComponent } from "./product-search/product-search.component";
import { ProductFormComponent } from "./product-form/product-form.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductListItemComponent } from "./product-list-item/product-list-item.component";

@NgModule({
  declarations: [
    ProductsComponent,
    ProductSearchComponent,
    ProductFormComponent,
    ProductDetailComponent,
    ProductListComponent,
    ProductListItemComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    PaginationModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [
    ProductsComponent,
    ProductSearchComponent,
    ProductFormComponent,
    ProductDetailComponent,
    ProductListComponent,
    ProductListItemComponent,
  ],
})
export class ProductsModule {}
