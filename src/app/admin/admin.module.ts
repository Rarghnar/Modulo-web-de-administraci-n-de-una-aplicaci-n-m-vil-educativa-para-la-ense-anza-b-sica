import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { TeacherScreenComponent } from './screens/teacher-screen/teacher-screen.component';
import { SharedModule } from '../shared/shared.module';
import { AlumnsScreenComponent } from './screens/alumns-screen/alumns-screen.component';
import { CoursesScreenComponent } from './screens/courses-screen/courses-screen.component';
import { SubjectsScreenComponent } from './screens/subjects-screen/subjects-screen.component';
import { StatisticsScreenComponent } from './screens/statistics-screen/statistics-screen.component';
import { OptionsScreenComponent } from './screens/options-screen/options-screen.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { TeacherProviderService } from '../core/providers/teacher/teacher-provider.service';
import { StatisticsChartComponent } from './components/statistics-chart/statistics-chart.component';
import { AddTeacherModalComponent } from './components/modals/add/add-teacher-modal/add-teacher-modal.component';
import { AddCourseModalComponent } from './components/modals/add/add-course-modal/add-course-modal.component';
import { AddEvaluationModalComponent } from './components/modals/add/add-evaluation-modal/add-evaluation-modal.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AddStudentModalComponent } from './components/modals/add/add-student-modal/add-student-modal.component';
import { AddSubjectModalComponent } from './components/modals/add/add-subject-modal/add-subject-modal.component';
import { ChartsModule } from 'ng2-charts';
import { CapitalizePipe } from '../shared/pipes/capitalize/capitalize.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    TeacherScreenComponent,
    AlumnsScreenComponent,
    CoursesScreenComponent,
    SubjectsScreenComponent,
    StatisticsScreenComponent,
    OptionsScreenComponent,
    LoginScreenComponent,
    AddTeacherModalComponent,
    StatisticsChartComponent,
    AddCourseModalComponent,
    AddEvaluationModalComponent,
    AddStudentModalComponent,
    AddSubjectModalComponent
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    CoreModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    NgxPaginationModule,
    NgSelectModule
  ],
  providers: [
    TeacherProviderService,
    CapitalizePipe
  ]
})
export class AdminModule { }
