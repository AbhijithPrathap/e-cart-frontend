import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { AllproductsComponent } from './allproducts/allproducts.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  { path: '', component: AllproductsComponent },
  {
    path:'viewproduct/:productId',component:ViewproductComponent
  },
  {
    path:'cart',component:CartComponent
  },
  {
    path:'wishlist',component:WishlistComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
