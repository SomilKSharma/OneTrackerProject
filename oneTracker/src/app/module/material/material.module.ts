import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

const materialComponents = [
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatSelectModule,
  MatOptionModule
]

@NgModule({
  imports: [materialComponents],
  exports: [materialComponents]
})
export class MaterialModule { }
