import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {IProduct} from './../../../../../types/src/models/product';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  product:Observable<IProduct[]>;
  constructor(
    private auth:AngularFireAuth,
    private db:AngularFirestore
  ) { 
    this.product = this.auth.user.pipe(
      switchMap(user=>!user
        ?null
        :this.db
        .collection<IProduct>('Products',x=>x.where('Author','==',user.uid))
        .valueChanges()
      )
    );
  }
  addProduct(product: IProduct) {
    product.Id = this.db.createId();
    product.CreatedOn = Date.now();

    return this.db
      .collection('Products')
      .doc(product.Id)
      .set(product);
  }

  getProduct(id: string) {
    return this.db
      .collection('Products')
      .doc<IProduct>(id)
      .valueChanges();
  }

  updateProduct(product: IProduct) {
    return this.db
      .collection('Products')
      .doc(product.Id)
      .set(product, { merge: true });
  }

  deleteProduct(id: string) {
    return this.db
      .collection('Products')
      .doc(id)
      .delete();
  }}
