import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductFilterRoutingModule } from './product-filter-routing.module';
import { ProductFilterComponent } from './product-filter.component';
import { ProductListComponent } from './product-list/product-list.component';


@NgModule({
  declarations: [ProductFilterComponent, ProductListComponent],
  imports: [
    CommonModule,
    ProductFilterRoutingModule
  ],
  exports: [ProductFilterComponent, ProductListComponent]
})
export class ProductFilterModule { }
