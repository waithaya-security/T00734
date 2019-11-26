import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './component/search/search.component';
import { AddEditComponent } from './component/add-edit/add-edit.component';


const routes: Routes = [{
  path: '',
  component: SearchComponent
}, {
  path: 'add',
  component: AddEditComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
