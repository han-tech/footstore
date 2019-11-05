import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IProduct } from '../../../../../types/src/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product?: IProduct;
  @Output() update = new EventEmitter<IProduct>();
  @Output() delete = new EventEmitter<string>();

  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = fb.group({
      name: new FormControl(''),
      description: new FormControl('')
    });
  }

  ngOnInit() {
    if (this.product) {
      this.productForm.get('name').setValue(this.product.Name);
      this.productForm.get('description').setValue(this.product.Description);
      this.productForm.disable();
    }
  }

  updateProduct(event) {
    event.preventDefault();

    if (this.product === undefined) {
      this.product = {
        Id: '',
        Name: this.productForm.get('name').value,
        Description: this.productForm.get('description').value,
        Author: '',
        Category:'',
        Size:30,
        Tags:'',
        Color:'Red',
        Sex:'Unisex',
        CreatedOn: 0
      };
    } else {
      this.product.Name = this.productForm.get('name').value;
      this.product.Description = this.productForm.get('description').value;
    }

    this.update.emit(this.product);
    this.productForm.disable();
  }

  cancelNewProduct() {
    this.update.emit(null);
  }

  deleteProduct() {
    this.delete.emit(this.product.Id);
  }
}
