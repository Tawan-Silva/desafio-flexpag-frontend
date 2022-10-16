import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QueoteListComponent } from './components/queote-list/queote-list.component';


const routes: Routes = [
  { path: '', component: QueoteListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
