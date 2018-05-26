import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import * as WC from 'woocommerce-api';
import { ProductsByCategoryPage } from '../products-by-category/products-by-category';
import { SignupPage } from '../signup/signup';


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class Menu {

  homePage: any;
  WooCommerce: any;
  categories: any[];
  @ViewChild('content') childNavCtrl: NavController;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.homePage = HomePage
    this.categories = [];

    this.WooCommerce = WC ({
      url: "https://www.sigmakomputindo.com/",
      consumerKey: "ck_2749d2d76fb6e94c0e4f1b120e040917fd041b18",
      consumerSecret: "cs_cdb813e65ccff58fb011d76509c637567b8ea6c3"
    });

    this.WooCommerce.getAsync("products/categories").then((data) => {
      console.log(JSON.parse(data.body).product_categories);

      let temp: any[] = JSON.parse(data.body).product_categories;
      for(let i = 0;i < temp.length; i ++){
        if(temp[i].parent == 0){

            if(temp[i].slug == "acer"){
              temp[i].icon = "shirt";
            }

          this.categories.push(temp[i]);
        }
      }

    }, (err) => {
      console.log(err)
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Menu');
  }

  openCategoryPage(category) {
    this.childNavCtrl.setRoot(ProductsByCategoryPage, { "category": category});
  }

  openPage(pageName: string) {
    if (pageName=="signup") {
      this.navCtrl.push(SignupPage);
    }




  }

}
