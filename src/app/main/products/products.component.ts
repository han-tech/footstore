import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../../../types/src/models/user';
import { IProduct } from '../../../../../types/src/models/product';
import { Observable } from 'rxjs';
import { ProductsService, UserService } from 'src/app/services';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  user: Observable<IUser>;
  products: Observable<IProduct[]>;

  newProduct = false;

  constructor(
    private productsService: ProductsService,
    private userService: UserService
  ) {
    this.user = this.userService.user;
    this.products = this.productsService.product;
  }

  ngOnInit() {}

  updateProduct(product: IProduct) {
    this.productsService.updateProduct(product);
  }

  createProduct(product: IProduct, userId: string) {
    if (product === null) {
      this.newProduct = false;
    } else {
      product.Author = userId;
      this.productsService.addProduct(product);
      this.newProduct = false;
    }
  }

  deleteProduct(id: string) {
    this.productsService.deleteProduct(id);
  }

}
