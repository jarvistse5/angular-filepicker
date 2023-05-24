import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './components/demo/demo.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/demo/demo.module').then(m => m.DemoModule)
    // component: DemoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
