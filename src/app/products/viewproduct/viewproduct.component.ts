import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {
  constructor( private viewRoute:ActivatedRoute,private api:ApiService){}
  productId:any='';
  product:any=[];
  ngOnInit(): void {
   
    //to fetch parameter details
    this.viewRoute.params.subscribe((result:any)=>{
      console.log(result.productId);
      this.productId=result.productId
      //to fetch particular product details
      this.api.viewProduct(this.productId).subscribe((result:any)=>{
        console.log(result);
        this.product=result//product details
      },(result:any)=>{
        console.log(result.error);//error message
        
        
      })
    })
  }
  // api function to add to wishlist
  addToWishlist(){
    //data destructuring
    const {id,title,price,image}=this.product

    //api function
    this.api.addToWishlist(id,title,price,image).subscribe((result:any)=>{
      alert(result)
     
      
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
    
      alert(result)
    },
    (result:any)=>{
       alert(result.error)
    })
    


  }
}
