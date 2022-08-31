import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// products
import { ProductsComponent } from "../products/products.component";
import { PaginationModule } from "../shared/pagination/pagination.module";

const routes: Routes = [{ path: "", component: ProductsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), PaginationModule],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
