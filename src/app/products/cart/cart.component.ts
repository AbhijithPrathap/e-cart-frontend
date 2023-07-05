import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  proceedToPay:boolean=false;
  //from paypal
  public payPalConfig?: IPayPalConfig;

  constructor (private api:ApiService, private cartFB:FormBuilder){}
  paymentStatus:boolean=false;
  offerClick:boolean=false;
  discountStatus:boolean=false;
  //paypal
  showSuccess:boolean = false;
  username:any;
  housename:any;
  street:any;
  state:any;
  pincode:any;
  mobile:any;

  //address form validation
  cartForm=this.cartFB.group({
    name:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    house:['',[Validators.required,Validators.pattern('[0-9]*')]],
    street:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    state:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    pincode:['',[Validators.required,Validators.pattern('[0-9]*')]],
    mobile:['',[Validators.required,Validators.pattern('[0-9]*')]],

 })
  product:any=[];
  //to hold total price
  totalPrice:number=0;
 
  ngOnInit(): void {
   //paypal function call 
    this.initConfig();
    this.api.getCart().subscribe((result:any)=>{
      console.log(result);
      this.product=result
      //call cart total
      this.getCartTotal()
      
    },(result)=>{
      console.log(result.error);
      
    })
  }
  removeCartItem(id:any){
    this.api.removeCartItem(id).subscribe((result:any)=>{
      console.log(result);
      this.product=result
      this.api.cartCount()
      
    },(result:any)=>{
      console.log(result.error);
      
    })
  }
  //get cart total
  getCartTotal(){
    let total=0
    this.product.forEach((item:any)=>{
      total=total+item.grandTotal
      this.totalPrice=Math.ceil(total)
    })
  }
  //increment cart
  incrementCart(id:any){
    this.api.incrementCartCount(id).subscribe((result:any)=>{
      this.product.result
      this.getCartTotal()
    },(result:any)=>{
      alert(result.error);
    })
  }
  //decrement cart
  decrementCart(id:any){
    this.api.decrementCartCount(id).subscribe((result:any)=>{
      this.product.result
      this.getCartTotal()
    },(result:any)=>{
      alert(result.error);
    })
  }
  //address validation
  submitForm(){
    if(this.cartForm.valid){
      this.paymentStatus=true
      this.username=this.cartForm.value.name
      this.housename=this.cartForm.value.house
      this.street=this.cartForm.value.street
      this.state=this.cartForm.value.state
      this.pincode=this.cartForm.value.pincode
      this.mobile=this.cartForm.value.mobile


    }else{
      alert("please enter valid deails")
    }

  }
  offerClicked(){
    this.offerClick=true
  }
  discount(value:any){
    this.totalPrice=Math.ceil(this.totalPrice*(100-value)/100)
    this.offerClick=false
    this.discountStatus=true

  }
  //paypal function
  private initConfig(): void {
    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: '9.99',
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details:any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }
  makepay(){
this.proceedToPay=true
  }
  modalClose(){
    this.cartForm.reset()
    this.paymentStatus=false
    this.showSuccess=false
  }


}
