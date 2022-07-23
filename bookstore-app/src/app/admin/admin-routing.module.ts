import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { EditViewComponent } from './edit-view/edit-view.component';
import { DeleteBookComponent } from './delete-book/delete-book.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path:'',
    canActivateChild:[AuthGuard],
    children:[
      {
        path:'addBook',
        component:AddBookComponent,
        },
      {
        path:'editBook',
        component:EditBookComponent,
        children:[
              {
               path:'edit/:id',
               component:EditViewComponent
              },
              {
               path:'delete/:id',component:DeleteBookComponent
              }
           ]
      }
    ]
  }
   ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
