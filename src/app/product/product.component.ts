import { Component, OnInit } from '@angular/core';
import { Product, ProductService} from '../shared';
import { FORM_DIRECTIVES } from '@angular/common';
import { MdCard, MD_CARD_DIRECTIVES  } from '@angular2-material/card';
import { MdButton, MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {OVERLAY_PROVIDERS} from '@angular2-material/core/overlay/overlay';
import { ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-product',
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.css'],
  providers: [ProductService, MdIconRegistry, OVERLAY_PROVIDERS],
  directives: [FORM_DIRECTIVES, MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES, MdIcon, MD_INPUT_DIRECTIVES]
})
export class ProductComponent implements OnInit {

  currentProduct: { };
  productId: number;
  errorMessage: string;
  private sub: any;

  constructor(private _productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
        this.productId = +params['id']; // (+) converts string 'id' to a number

        if (!!!this.productId) { return; }
          this.getProduct(this.productId);
    });
  }

  private getProduct (productId: number) {
    if (productId <= 0) { return; }
    this._productService.getProduct(productId)
                    .subscribe(
                      product => this.currentProduct = product,
                      error => this.errorMessage = <any>error);
  }

}
