import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin.module';
import { TeacherScreenComponent } from './screens/teacher-screen/teacher-screen.component';
import { AdminComponent } from './admin.component';
import { AlumnsScreenComponent } from './screens/alumns-screen/alumns-screen.component';
import { CoursesScreenComponent } from './screens/courses-screen/courses-screen.component';
import { SubjectsScreenComponent } from './screens/subjects-screen/subjects-screen.component';
import { StatisticsScreenComponent } from './screens/statistics-screen/statistics-screen.component';
import { OptionsScreenComponent } from './screens/options-screen/options-screen.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { AdminGuard } from '../core/guards/admin/admin.guard';

const routes: Routes = [  
  { 
    path: 'login',
    component: LoginScreenComponent 
  },
  {
    path: '',
    canActivate: [AdminGuard],
    component: AdminComponent,
    children: [
      {
        path: '',        
        redirectTo: 'teachers',
        pathMatch: 'full'
      },
      { 
        path: 'teachers',
        component: TeacherScreenComponent 
      },
      { 
        path: 'alumns',
        component: AlumnsScreenComponent 
      },
      { 
        path: 'courses',
        component: CoursesScreenComponent 
      },
      { 
        path: 'subjects',
        component: SubjectsScreenComponent 
      },
      { 
        path: 'statistics',
        component: StatisticsScreenComponent 
      },
      { 
        path: 'options',
        component: OptionsScreenComponent
      },
      
    ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
