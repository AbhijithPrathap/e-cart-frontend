import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor (private api:ApiService){}
  wishlist:any=[];
  ngOnInit(): void {
    this.api.getWishlist().subscribe((result:any)=>{
      console.log(result);
      this.wishlist=result
      
    })
  }
  deletetWishlist(id:any){
    this.api.deleteWishlist(id).subscribe((result:any)=>{
      this.wishlist=result
      alert("wishlist removed successfully")
    },(result:any)=>{
      alert(result.error)
    })
  }
  //api function to add to cart
  addToCart(product:any){
    
    //addd quantity to cart
    Object.assign(product,{quantity:1})
    console.log(product);
    //api call for add to cart
    this.api.addToCart(product).subscribe((result:any)=>{
      //call cart count
      this.api.cartCount()
      this.deletetWishlist(product.id)
      alert(result)
    },
    (result:any)=>{
       alert(result.error)
    })
    


  }

}
