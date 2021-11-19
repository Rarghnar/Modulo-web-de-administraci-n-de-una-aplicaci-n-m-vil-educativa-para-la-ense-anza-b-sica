import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseProviderService } from 'src/app/core/providers/course/course-provider.service';
import { LessonProviderService } from 'src/app/core/providers/lesson/lesson-provider.service';
import { TeacherProviderService } from 'src/app/core/providers/teacher/teacher-provider.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { StudentProviderService } from '../../../../core/providers/student/student-provider.service';
import { SubjectProviderService } from '../../../../core/providers/subject/subject-provider.service';

@Component({
  selector: 'shared-deleted-modal',
  templateUrl: './deleted-modal.component.html',
  styleUrls: ['./deleted-modal.component.css']
})
export class DeletedModalComponent implements OnInit {

  public selectedHeader: any;
  public selected: any;
  public isLoadButton:boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private teacherProvider: TeacherProviderService,
    private courseProvider: CourseProviderService,
    private notificationService: NotificationService,
    private studentProvider: StudentProviderService,
    private lessonProvider: LessonProviderService,
    private subjectProvider: SubjectProviderService
    ) { }

  ngOnInit(): void {
    if (this.selectedHeader === 'teacher') {
      this.selected = this.selected.teacherData
    }
    if (this.selectedHeader === 'course2') { 
    }
  }

  public async deleteRow(){
    try {
      this.isLoadButton = true;
      switch (this.selectedHeader) {
        case 'teacher': {
          await this.teacherProvider.deleteTeacherCascade(this.selected._id).toPromise();
          break;
        };
        case 'course1': {         
          await this.courseProvider.deleteCourseCascade(this.selected._id).toPromise();  
          break;
        };
        case 'course2': {
          await this.lessonProvider.deleteEvaluationLesson(this.selected.idLesson, this.selected.evaluations)
          break;
        }
        case 'student1': {
          await this.studentProvider.deleteStudentCourse(this.selected._id).toPromise();
          break;
        }
        case 'subjects1': {
          this.activeModal.close('refresh') 
          break;
        }
      }      
      this.notificationService.success('Eliminado Correctamente');
      this.activeModal.close('refresh')
      this.isLoadButton = false;
    } catch (error) {
      this.isLoadButton = false;
      console.log(error);
      this.notificationService.error('Error al eliminar');
    }
  }
}
