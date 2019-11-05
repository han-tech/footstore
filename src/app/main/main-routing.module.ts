import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'categories',
        loadChildren: () =>
          import('./categories/categories.module').then(mod => mod.NotesModule)
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./products/products.module').then(mod => mod.ProductsModule)
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then(mod => mod.ProfileModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
