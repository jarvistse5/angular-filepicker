import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilePickerComponent } from 'src/app/widgets/file-picker/file-picker.component';
import { FilePickerModule } from 'src/app/widgets/file-picker/file-picker.module';
import { DemoComponent } from './demo.component';

const routes: Routes = [
    {
      path: '',
      component: DemoComponent,
    }
  ];

@NgModule({
  declarations: [DemoComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    FilePickerModule,
  ]
})
export class DemoModule { }
