import { Component, OnInit } from '@angular/core';
import { info } from 'src/app/core/base-info';
import { Subject } from 'src/app/core/models/subject.model';
import { SubjectProviderService } from '../../../core/providers/subject/subject-provider.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AddSubjectModalComponent } from '../../components/modals/add/add-subject-modal/add-subject-modal.component';
import { IsSuperadminService } from '../../../core/services/is-superadmin/is-superadmin.service';
import { TokenService } from '../../../core/services/token/token.service';
import { CourseProviderService } from '../../../core/providers/course/course-provider.service';

@Component({
  selector: 'app-subjects-screen',
  templateUrl: './subjects-screen.component.html',
  styleUrls: ['./subjects-screen.component.css']
})
export class SubjectsScreenComponent implements OnInit {

  /* public dataInfo: any[]; */
  public infoSelect: any[];
  public textInput!: string;
  public textFilter!: string;
  public isLoad: boolean = false;
  public isAdmin: any = false;
  
  public subjectData: Subject[];
  public subjectAll: any[];
  public courseAll: any[];
  public subjectSelected: any[];

  constructor(
    private subjectProvider: SubjectProviderService,
    private modalService: NgbModal,
    private configModal: NgbModalConfig,
    private tokenService: TokenService,
    private courseProviderService: CourseProviderService
    ){
    this.infoSelect = [];
    this.subjectAll = [];
    this.courseAll = [];

    this.subjectData = []
    this.subjectSelected = []
  }

  async ngOnInit(): Promise<void> {
    if (JSON.parse(this.tokenService.getToken()).role === 'superadmin') {
      this.isAdmin = true          
    } else this.isAdmin = false;
    await this.getInfo();
    await this.getSubjects();
  }

  
  public async getInfo() {
    this.courseAll = await this.courseProviderService.getAllCourses().toPromise();
    
  }
  
  public async getSubjects() {
    this.isLoad = false;
    try {
      this.subjectData = await this.subjectProvider.getAllSubject().toPromise();
      this.subjectData.forEach(subject => {
        let cantCourse = 0;
        let cantTeacher = 0;
        this.courseAll.forEach(course => {
          for (let i = 0; i < course.subjects.length; i++) {
            if (course.subjects[i]._id === subject._id) {
              if (course.teacher) {
                cantTeacher++;
              }
              cantCourse++;
            }        
          }
        })
        const surveyCourse = {
          cantCourse: cantCourse,
          cantTeacher: cantTeacher,
          subjectInfo: subject
        };
        this.subjectAll.push(surveyCourse);
      })
      this.isLoad = true
    } catch (error) {
      console.log(error);      
    }
  }

  selectSubject(event:any) {
    this.infoSelect = [];
    this.courseAll.forEach(course => {      
      for (let i = 0; i < course.subjects.length; i++) {  
        let markStudent = [];
        let average = 0;
        let isMark = false;
        for (const student of course.students) {
          if (student.course._id === course._id) {
            if (student.evaluationsRecords) {
              const evaRecords:any = student.evaluationsRecords;
              for (const evaRecord of evaRecords) {
                markStudent.push(evaRecord.mark)
              }
              isMark = true;
            }            
          }
        }      
        if (markStudent) {
          for (const mark of markStudent) {
            average = average + mark;
          }
          average = Math.round(((average/markStudent.length)*100)/100);    
        }            
        if (course.subjects[i]._id === event.subjectInfo._id) {
          const surveyCourse = {
            courseName: course.name,
            courseTeacher: course.teacher? course.teacher.names : 'no tiene profesor',
            subjectInfo: event.subjectInfo,
            averageMark: average? average : 'N/E'
          };
          this.infoSelect.push(surveyCourse);
        }        
      }
    })
    
    
  }
  
  openAddSubjectModal(){
    
    const modalRef = this.modalService.open(AddSubjectModalComponent, { size: 'lg' });
    modalRef.result.then((result) => {
      if (result == 'refresh') {
        this.getSubjects();    
      }
    })    
  }
  
  public onValue(text :string) {
    this.textInput = text;
    this.textFilter = text;
  }

  public onEnter(text :string) {
    this.textFilter = text;
  }

  public searchButton() {
    this.textFilter = this.textInput;
  }
}
