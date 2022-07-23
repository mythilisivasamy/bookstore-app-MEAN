import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
   {
    path:'home',
    component:HomeComponent
  },
  {
    path: 'booklist',
    loadChildren: () => import('./books/books.module').then(m => m.BooksModule)
  },
  {
    path:'admin',
    loadChildren:()=> import('./admin/admin.module').then(m=>m.AdminModule)
  },
  {
    path:'contact',
    component:ContactComponent,
    outlet:'popup'
  },
  {
    path:'',
    redirectTo:'home',
    pathMatch: 'full'
  },
  {
    path:'**',
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
