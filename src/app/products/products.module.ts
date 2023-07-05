import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { AllproductsComponent } from './allproducts/allproducts.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPayPalModule } from 'ngx-paypal';


@NgModule({
  declarations: [
    ProductsComponent,
    AllproductsComponent,
    ViewproductComponent,
    WishlistComponent,
    CartComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPayPalModule
  ]
})
export class ProductsModule { }
