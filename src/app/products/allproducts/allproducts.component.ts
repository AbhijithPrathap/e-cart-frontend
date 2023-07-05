import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.css']
})
export class AllproductsComponent implements OnInit {
   //to hold search term
   searchTerm:string="";

  allproducts:any[]=[]//array of 20
  constructor (private api:ApiService ){}
 ngOnInit(): void {
   this.api.getAllProducts().subscribe((result:any)=>{
    console.log(result);
    this.allproducts=result
    
   })
  //  this.searchTerm=this.api.searchTerm
  this.api.searchTerm.subscribe((result:any)=>{
    this.searchTerm=result
    console.log(this.searchTerm);
    
  })
 }

}
