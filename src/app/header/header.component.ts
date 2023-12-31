import { Component, OnInit } from '@angular/core';
import { ApiService } from '../products/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //to hold search term
  searchTerm:string="";
  //to hold cart item count
  cartItemCount:number=0
 constructor (private api:ApiService){
  
    
  
 }
 ngOnInit(): void {
  this.api.getCartItemCount.subscribe((data:any)=>{
    console.log(data);//length of the cart array
    this.cartItemCount=data; })
   
 }
  search(event:any){
   console.log(event.target.value);//search value
   //to assign new value to behavior subject to use next() method
   
    this.api.searchTerm.next(event.target.value)//add search term to behavior subject 
  }

}
