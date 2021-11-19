import { Component, OnInit } from '@angular/core';
import { TeacherProviderService } from '../../../core/providers/teacher/teacher-provider.service';
import { Teacher } from '../../../core/models/teacher.model';
import { Observable } from 'rxjs';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AddTeacherModalComponent } from '../../components/modals/add/add-teacher-modal/add-teacher-modal.component'
import { IsSuperadminService } from '../../../core/services/is-superadmin/is-superadmin.service';
import { TokenService } from '../../../core/services/token/token.service';

@Component({
  selector: 'app-teacher-screen',
  templateUrl: './teacher-screen.component.html',
  styleUrls: ['./teacher-screen.component.css']
})
export class TeacherScreenComponent implements OnInit {

  public dataInfo!: any[];
  public textInput!: string;
  public textFilter!: string;
  public isLoad: boolean = false;
  public isAdmin:any = false;

  /* public teachers$: Observable<Teacher[]>; */
  public teacherData: Teacher[];
  public teacherPost: Teacher[];

  constructor(
    private teacherProvider:TeacherProviderService, 
    private modalService: NgbModal,
    private configModal: NgbModalConfig,
    private isSuperAdmin: IsSuperadminService,
    private tokenService: TokenService
    ){
      this.configModal.backdrop = 'static';
      this.teacherData = [];
      this.teacherPost = [];
  }
  
  async ngOnInit(): Promise<void> {
    if (JSON.parse(this.tokenService.getToken()).role === 'superadmin') {
      this.isAdmin = true          
    } else this.isAdmin = false;
    this.getTeachers();
  }
  
  public async getTeachers() {
    this.teacherPost = [];
    try {
      this.isLoad = false;
      this.teacherData = await this.teacherProvider.getAllTeachers().toPromise();     
      for (const teacher of this.teacherData) {
        let cantStudent = 0;
        let courses:any = teacher.courses;
        for (const course of courses) {
          if (course.students.length > 0 || course.student) {
            let students:any = course.students;
            for (const student of students) {
              cantStudent++;
            }
          }
        }
        
        const teacherDataInfo:any = {
          teacherData: teacher,
          cantStudents: cantStudent
        }
        this.teacherPost.push(teacherDataInfo)
        this.isLoad = true;  
      }
      
      /* console.log(this.teacherData); */
    } catch (error) {
      console.log(error);      
    }
  }

  public openAddModal() {
    const modalRef = this.modalService.open(AddTeacherModalComponent, { size: 'lg' });
    modalRef.result.then((result) => {
      if (result == 'refresh') {
        this.getTeachers();    
      }
    })    
  }

  public onValue(text :string) {
    /* this.textInput = text; */
    this.textFilter = text;
    
  }

  public onEnter(text :string) {
    this.textFilter = text;
  }

  public searchButton() {
    this.textFilter = this.textFilter;        
  }

  public async refreshTable(isRefresh: any) {
    if(isRefresh) {
      this.getTeachers();
    }
  }
}
