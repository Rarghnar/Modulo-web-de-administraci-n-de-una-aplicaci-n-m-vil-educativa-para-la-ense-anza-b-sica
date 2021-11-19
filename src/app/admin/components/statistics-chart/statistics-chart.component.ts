import { Component, OnInit, ViewChild, Input, HostListener } from '@angular/core';
import { Chart, ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import { Student } from 'src/app/core/models/student.model';
import { StudentProviderService } from '../../../core/providers/student/student-provider.service';
import { Label } from 'ng2-charts';
import { CapitalizePipe } from '../../../shared/pipes/capitalize/capitalize.pipe';

@Component({
  selector: 'admin-statistics-chart',
  templateUrl: './statistics-chart.component.html',
  styleUrls: ['./statistics-chart.component.css'],
  providers: [CapitalizePipe]
})
export class StatisticsChartComponent implements OnInit {


  /* @Input() namesStudent!: any[]; */

  public dataStudent: any;
  /* public average: any[]; */
  public names: any[]
  public promedioAlumn: any = [];
  public promediosAlumnos: any [];
  public isLoad:boolean = false;

  /* public months: any[];
  public monthSelected: string;
  public dateNow: any; */
  @Input() avarageStudent!: any;
  @Input() dataStudentInput: any;
  @Input() load: any

  chartData: any;
  chartLabels:any;
  chartOptions: any;
  chartType: any


  constructor( 
    private studentProvider: StudentProviderService,
    public capitalizePipe: CapitalizePipe,
  ) {
    /* this.average = [70,10,10,70,null,50,10,50,10,50, null, 70,10,10,70]; */
    this.names = [];
    this.promediosAlumnos = []

    /* this.months = ['Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    this.monthSelected = this.months[0].day; */

    this.chartData = [
      {
            
        label: 'Promedio',
        /* data: this.promediosAlumnos, */
        data: [80,10,80],
        backgroundColor: "#C4C4C4",
        borderColor: "#1EDA00",
        fill: false,
        pointStyle: 'circle',
        pointRadius: 5,
        pointBorderColor: '#C4C4C4',
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        pointHoverBorderColor: '#000000',
        pointHoverBackgroundColor: '#C4C4C4',
        pointHoverRadius: 5,
        tension: 0

      }
    ];

    this.chartLabels = this.names

    this.chartOptions = {
      scales: {
        yAxes: [{
          ticks:{
            beginAtZero: true,            
            max: 70, //70

            stepSize:10,
            
          }},
        ],
        x: {
          ticks: {
            minRotation: 75,
            maxRotation: 90,
          },
          grid: {
            display: false
          }
        }
      },
      labels: {
        display: false
      },
      tension: {

      }
    }
    this.chartType = 'line';
  }
  

  ngOnInit(): void { 
    this.getStudent()
  }

  ngDoCheck() {
    this.chartData.forEach((data: ChartDataSets) => {
      data.data = this.avarageStudent;
    }); 
  }

  ngOnChanges(){
    this.chartLabels = [];
    for (const student of this.dataStudentInput) {
      this.chartLabels.push(this.capitalizePipe.transform(student.lastNames));
    }

  }
  
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  }


  public async getStudent() {
    this.isLoad= true    
  }

  createAverage(marks: number[]){
    let average = 0;
    for (let i = 0; i < marks.length; i++) {
      average = average + marks[i];
    }
    average = Math.round(((average/marks.length)*100)/100); 
    this.promediosAlumnos.push(average);
    this.changeData(this.promediosAlumnos)
    return average;
  }

  public changeData(newData: number[]): void {
    for (let i = 0; i < newData.length; i++) {
      this.chartData[0].data[i]= newData[i];
    }
    if(this.chartData[0].data.length > newData.length){
      let extra = this.chartData[0].data.length-newData.length
      for (let j = extra; j <= extra; j++) {
        this.chartData[0].data[extra]= 10;
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    return window.innerWidth;
  }
  
} 