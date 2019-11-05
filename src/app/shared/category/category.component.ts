import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ICategory } from '../../../../../types/src/models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Input() category?: ICategory;
  @Output() update = new EventEmitter<ICategory>();
  @Output() delete = new EventEmitter<string>();

  categoryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.categoryForm = fb.group({
      title: new FormControl(''),
      description: new FormControl('')
    });
  }

  ngOnInit() {
    if (this.category) {
      this.categoryForm.get('title').setValue(this.category.Title);
      this.categoryForm.get('description').setValue(this.category.Description);
      this.categoryForm.disable();
    }
  }

  updateCategory(event) {
    event.preventDefault();

    if (this.category === undefined) {
      this.category = {
        Id: '',
        Title: this.categoryForm.get('title').value,
        Description: this.categoryForm.get('description').value,
        Author: '',
        CreatedOn: 0
      };
    } else {
      this.category.Title = this.categoryForm.get('title').value;
      this.category.Description = this.categoryForm.get('description').value;
    }

    this.update.emit(this.category);
    this.categoryForm.disable();
  }

  cancelNewCategory() {
    this.update.emit(null);
  }

  deleteCategory() {
    this.delete.emit(this.category.Id);
  }
}
