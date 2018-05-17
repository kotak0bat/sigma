import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';


@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

  product: any;
  WooCommerce: any;
  reviews: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

      this.product = this.navParams.get("product");
      console.log(this.product);

      this.WooCommerce = WC ({
        url: "https://www.sigmakomputindo.com/",
        consumerKey: "ck_2749d2d76fb6e94c0e4f1b120e040917fd041b18",
        consumerSecret: "cs_cdb813e65ccff58fb011d76509c637567b8ea6c3"
      });

      this.WooCommerce.getAsync('products/'+this.product.id + '/reviews').then((data)=> {

      this.reviews = JSON.parse(data.body).product_reviews;
      console.log(this.reviews);

      }, (err)=> {
        console.log(err);
      })
  }



}
