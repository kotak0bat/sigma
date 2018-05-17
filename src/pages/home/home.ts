import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController } from 'ionic-angular';
import { ProductDetailsPage } from '../product-details/product-details';

import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce: any;
  products: any[];
  moreProducts: any[];
  page: number;
  

  @ViewChild('productSlides') productSlides: Slides;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {

    this.page = 2;

    this.WooCommerce = WC ({
      url: "https://www.sigmakomputindo.com/",
      consumerKey: "ck_2749d2d76fb6e94c0e4f1b120e040917fd041b18",
      consumerSecret: "cs_cdb813e65ccff58fb011d76509c637567b8ea6c3"
    });

    this.loadMoreProducts(null);

    this.WooCommerce.getAsync("products").then((data) => {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body).products;
    }, (err) => {
      console.log(err)
    })

  }

  ionViewDidLoad(){
    setInterval(()=> {
      if(this.productSlides.getActiveIndex() == this.productSlides.length() -1)
      this.productSlides.slideTo(0);
      this.productSlides.slideNext();
    }, 3000)
  }

  loadMoreProducts(event){
console.log(event);
    if(event == null)
      {
        this.page = 2;
        this.moreProducts = [];
      }
      else this.page ++;
    this.WooCommerce.getAsync("products?page=" + this.page).then((data) => {
      console.log(JSON.parse(data.body));
      this.moreProducts = this.moreProducts.concat(JSON.parse(data.body).products);

      if(event != null)
      {
        event.complete();
      }

      if(JSON.parse(data.body).products.length < 1) {
        event.enable(false);
        this.toastCtrl.create({
          message: "No More Products!",
          duration: 5000
        }).present();
      }

    }, (err) => {
      console.log(err)
    })
  }

  openProductPage(product) {

    this.navCtrl.push(ProductDetailsPage, {"product": product});

  }

}
