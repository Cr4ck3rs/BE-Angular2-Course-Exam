import { Component, OnInit } from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';
import { Product, ProductService} from '../shared';
import { MdCard, MD_CARD_DIRECTIVES  } from '@angular2-material/card';
import { MdButton, MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MATERIAL_DIRECTIVES} from 'ng2-material';
import {OVERLAY_PROVIDERS} from '@angular2-material/core/overlay/overlay';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  providers:[ProductService,MdIconRegistry,OVERLAY_PROVIDERS],
  directives: [FORM_DIRECTIVES, MD_CARD_DIRECTIVES,MD_BUTTON_DIRECTIVES, MdIcon, MATERIAL_DIRECTIVES, MD_INPUT_DIRECTIVES]
})
export class HomeComponent implements OnInit {
  products:Product[];
  currentProduct: Product;
  errorMessage:string;
  constructor(
    private _productService:ProductService
  ) {}

  ngOnInit() {
    this._productService.getProducts()
    .subscribe(
      dataProducts=>this.products=dataProducts,
      error=>this.errorMessage = <any>error
    );
  }

  addOrUpdateProduct (saveEv: boolean) {
    if(saveEv) {
      if(this.currentProduct.id){
        this.updateProduct(this.currentProduct.id, this.currentProduct);
      } else {
        this.currentProduct.id = this.products.length;
        this.addProduct(this.currentProduct);
      }
    }
  }

  private addProduct (product: Product) {
    if (!product) { return; }
    this._productService.saveProduct(product)
                   .subscribe(
                     product  => this.products.push(product),
                     error =>  this.errorMessage = <any>error);
  }

  private updateProduct (productId: number, product: Product) {
    if(!product && productId <= 0) { return; }
    this._productService.updateProduct(productId, product)
                    .subscribe(
                      product => this.products.forEach((t, i) => {
                        if (t.id === product.id) {
                          this.products[i] = product;
                        }
                      }),
                      error => this.errorMessage = <any>error);
  }

  confirmDeleteProduct (deleteEv: boolean) {
    if(deleteEv){
      this.deleteProduct(this.currentProduct.id);
    }
  }

  private deleteProduct (productId: number) {
    if(productId <= 0) { return; }
    this._productService.deleteProduct(productId)
                    .subscribe(
                      product => this.products.forEach((t, i) => {
                        if (t.id === productId) {
                          this.products.splice(i, 1);
                        }
                      }),
                      error => this.errorMessage = <any>error)
  }

}
