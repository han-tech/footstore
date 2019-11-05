import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../../../../types/src/models/category';
import { IUser } from '../../../../../types/src/models/user';
import { Observable } from 'rxjs';
import { CategoriesService, UserService } from 'src/app/services';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  user: Observable<IUser>;
  categories: Observable<ICategory[]>;

  newCategory = false;

  constructor(
    private categoriesService: CategoriesService,
    private userService: UserService
  ) {
    this.user = this.userService.user;
    this.categories = this.categoriesService.categories;
  }

  ngOnInit() {}

  updateCategory(category: ICategory) {
    this.categoriesService.updateCategory(category);
  }

  createCategory(category: ICategory, userId: string) {
    if (category === null) {
      this.newCategory = false;
    } else {
      category.Author = userId;
      this.categoriesService.addCategory(category);
      this.newCategory = false;
    }
  }

  deleteCategory(id: string) {
    this.categoriesService.deleteCategory(id);
  }
}
