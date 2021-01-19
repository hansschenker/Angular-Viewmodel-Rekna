import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProductFilterComponent } from "./product-filter.component";
import { ProductListComponent } from "./product-list/product-list.component";

const routes: Routes = [
  {
    path: "",
    component: ProductFilterComponent,
    children: [{ path: "list", component: ProductListComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductFilterRoutingModule {}
