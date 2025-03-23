import { NgModule } from "@angular/core";

import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatListModule,
        MatDividerModule,
        MatFormFieldModule, 
        MatInputModule, 
        MatDatepickerModule, 
        MatNativeDateModule,
        MatIconModule,
        MatSelectModule,
        MatButtonModule,
        MatTableModule,
        MatToolbarModule,
        MatSidenavModule,
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        MatListModule,
        MatIconModule,
        MatDividerModule,
        MatFormFieldModule, 
        MatInputModule,
        MatDatepickerModule, 
        MatNativeDateModule,
        MatSelectModule,
        MatButtonModule,
        MatTableModule,
        MatToolbarModule,
        MatSidenavModule,
    ],
})
export class AngularMaterialModule { }