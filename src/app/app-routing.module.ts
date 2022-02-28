import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ChildComponentComponent } from './child-component/child-component.component';

const routes: Routes = [
  { path: 'first-component/:id', component: ChildComponentComponent },
  { path: '**', redirectTo:'first-component/1' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
