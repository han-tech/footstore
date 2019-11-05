import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ICategory } from '../../../../../types/src/models/category';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  categories: Observable<ICategory[]>;

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {
    this.categories = this.auth.user.pipe(
      switchMap(user =>
        !user
          ? null
          : this.db
              .collection<ICategory>('Categories', x =>
                x.where('Author', '==', user.uid)
              )
              .valueChanges()
      )
    );
  }

  addCategory(category: ICategory) {
    category.Id = this.db.createId();
    category.CreatedOn = Date.now();

    return this.db
      .collection('Categories')
      .doc(category.Id)
      .set(category);
  }

  getCategory(id: string) {
    return this.db
      .collection('Categories')
      .doc<ICategory>(id)
      .valueChanges();
  }

  updateCategory(category: ICategory) {
    return this.db
      .collection('Categories')
      .doc(category.Id)
      .set(category, { merge: true });
  }

  deleteCategory(id: string) {
    return this.db
      .collection('Categories')
      .doc(id)
      .delete();
  }
}
