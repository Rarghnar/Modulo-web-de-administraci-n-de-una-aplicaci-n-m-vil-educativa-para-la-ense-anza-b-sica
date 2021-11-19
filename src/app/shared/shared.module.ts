import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { InfoTablesComponent } from './components/info-tables/info-tables.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from './modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchFilterPipe } from './pipes/search-filter/search-filter.pipe';
import { SidebarMobileComponent } from './components/sidebar-mobile/sidebar-mobile.component';
import { DeletedModalComponent } from './components/modals/deleted-modal/deleted-modal.component';
import { CapitalizePipe } from './pipes/capitalize/capitalize.pipe';
import { EditTeacherModalComponent } from './components/modals/edit-teacher-modal/edit-teacher-modal.component';
import { LoaderComponent } from './components/loader/loader.component';
import { EditCourseModalComponent } from './components/modals/edit-course-modal/edit-course-modal.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EditStudentModalComponent } from './components/modals/edit-student-modal/edit-student-modal.component';
import { EditSubjectModalComponent } from './components/modals/edit-subject-modal/edit-subject-modal.component';
import { DateComponent } from './components/date/date.component';
import { CapitalizeAllPipe } from './pipes/capitalize-all/capitalize-all.pipe';
import { ShowEvaluationModalComponent } from './components/modals/show-evaluation-modal/show-evaluation-modal.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ShowSubjectsModalComponent } from './components/modals/show-subjects-modal/show-subjects-modal.component';

const component =
  [
    SidebarComponent,
    InfoTablesComponent,
    NavbarComponent,
    SearchFilterPipe,
    SidebarMobileComponent,
    DeletedModalComponent, 
    CapitalizePipe, 
    CapitalizeAllPipe,
    EditTeacherModalComponent,
    LoaderComponent,
    EditCourseModalComponent,
    DateComponent,
    EditStudentModalComponent, 
    EditSubjectModalComponent,
    ShowEvaluationModalComponent
  ]

@NgModule({
  declarations: [...component, ShowSubjectsModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule,
    NgSelectModule
  ],
  exports:[
    ...component
  ]
})
export class SharedModule { }
