import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { headerTable } from '../../../core/header-table'
import { DeletedModalComponent } from '../modals/deleted-modal/deleted-modal.component'
import { EditCourseModalComponent } from '../modals/edit-course-modal/edit-course-modal.component';
import { EditTeacherModalComponent } from '../modals/edit-teacher-modal/edit-teacher-modal.component'
import { EditStudentModalComponent } from '../modals/edit-student-modal/edit-student-modal.component';
import { EditSubjectModalComponent } from '../modals/edit-subject-modal/edit-subject-modal.component';
import { ShowEvaluationModalComponent } from '../modals/show-evaluation-modal/show-evaluation-modal.component';
import { ShowSubjectsModalComponent } from '../modals/show-subjects-modal/show-subjects-modal.component';

@Component({
  selector: 'shared-info-tables',
  templateUrl: './info-tables.component.html',
  styleUrls: ['./info-tables.component.css']
})
export class InfoTablesComponent implements OnInit {

  @Input() selectHeader: any;
  @Input() dataInfo: any[];
  @Input() dataSelected: any;
  @Input() infoSelected: any;
  @Input() position: any;
  @Input() searchText: any;
  @Input() isLoad: boolean;
  @Input() isLoad2: boolean;
  @Input() isAdmin: boolean | null = false;
  @Output() infoBack: EventEmitter<any[]> = new EventEmitter;
  @Output() isFirst: EventEmitter<boolean> = new EventEmitter;
  @Output() refreshTable: EventEmitter<any> = new EventEmitter;


  public rowActive: any = 0;
  public headerTables: any[] = [];
  public select: any;
  public selection: SelectionModel<any>;
  public isRefresh:boolean = false;
  public isAdminProvicional = true;
  p: number = 1;

  constructor(
    private modalService: NgbModal,
    private configModal: NgbModalConfig
    ) {
    this.dataInfo = [];   
    this.infoSelected = []; 
    this.select ='';
    this.selection = new SelectionModel<any>(false, []);
    this.configModal.backdrop = 'static';
    this.isLoad = false;
    this.isLoad2 = false;
  }

  ngOnInit(): void {
    this.selectTable();     
  }

  selectData(posSelect: any,size:any) {    
    let pos = 0;
    if (this.p === 1) {
      pos = posSelect
    } else {
      pos = ((this.p-1) * 4)+posSelect
    }   
    this.isFirst.emit(true)
    this.infoBack.emit(this.dataInfo[pos])  
  }
  
  selectRow(row: any): void{
    this.select = row;   
    /* console.log(row);  */   
  }

  sort(colName:any) {
    this.dataInfo.sort((a, b) => a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0)    
  }

  public openDeletedModal() {
    const modalRef = this.modalService.open(DeletedModalComponent, { size: 'md' });
    modalRef.componentInstance.selectedHeader = this.selectHeader;
    modalRef.componentInstance.selected = this.select;
    modalRef.result.then((result) => {
      if (result == 'refresh') {
        this.refreshTable.emit(true);    
      }
    })    
  }

  public openEditTeacherModal() {
    const modalRef = this.modalService.open(EditTeacherModalComponent, { size: 'lg' });
    modalRef.componentInstance.teacherSelected = this.select.teacherData;
    modalRef.result.then((result) => {
      if (result == 'refresh') {
        this.refreshTable.emit(true)       
      }
    })
  }

  public openEditCourseModal() {
    const modalRef = this.modalService.open(EditCourseModalComponent, { size: 'lg' });
    modalRef.componentInstance.courseSelected = this.select;
    modalRef.result.then((result) => {
      if (result == 'refresh') {
        this.refreshTable.emit(true)       
      }
    })
  }

  public openEditStudentModal() {    
    const modalRef = this.modalService.open(EditStudentModalComponent, { size: 'lg' });
    modalRef.componentInstance.studentSelected = this.select;
    modalRef.result.then((result) => {
      if (result == 'refresh') {        
        this.refreshTable.emit(true)       
      }
    })
  }

  public openEditSubjectModal() {
    const modalRef = this.modalService.open(EditSubjectModalComponent, { size: 'lg' });
    modalRef.componentInstance.subjectSelected = this.select;
    modalRef.result.then((result) => {
      if (result == 'refresh') {
        this.refreshTable.emit(true)       
      }
    })
  }

  public showEvaluationModal(row:any) {
    const modalRef = this.modalService.open(ShowEvaluationModalComponent, { size: 'xl' });
    modalRef.componentInstance.evaluationSelected = row;  
  }

  public showSubjectModal(row:any) {
    const modalRef = this.modalService.open(ShowSubjectsModalComponent, { size: 'xl' });
    modalRef.componentInstance.subjectSelected = row.subjectInfo;  
  }

  selectTable() {
    switch (this.selectHeader) {
      case 'teacher': this.headerTables = headerTable.teacher;
        break;
      case 'student1': this.headerTables = headerTable.student1;
        break;
      case 'student2': this.headerTables = headerTable.student2;
        break;
      case 'course1': this.headerTables = headerTable.course1;
        break;
      case 'course2': this.headerTables = headerTable.course2;
        break;
      case 'subjects1': this.headerTables = headerTable.subject1;
        break;
      case 'subjects2': this.headerTables = headerTable.subject2;
        break;
    }
  }  
}
