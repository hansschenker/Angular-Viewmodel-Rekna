import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductFilterRoutingModule } from './product-filter-routing.module';
import { ProductFilterComponent } from './product-filter.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductEditComponent } from './product-edit/product-edit.component';


@NgModule({
  declarations: [ProductFilterComponent, ProductListComponent, ProductFormComponent, ProductEditComponent],
  imports: [
    CommonModule,
    ProductFilterRoutingModule
  ],
  exports: [ProductFilterComponent, ProductListComponent, ProductFormComponent, ProductEditComponent]
})
export class ProductFilterModule { }
