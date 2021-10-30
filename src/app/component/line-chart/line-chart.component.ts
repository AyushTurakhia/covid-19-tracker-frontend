import { Component, ViewChild, OnInit } from "@angular/core";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import { ApiService } from "src/app/service/api.service";
import * as $ from 'jquery';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  activeData:any={ 
      data: [],
      type:"Active",
      borderColor:"#007bff",
      axesColor:'rgb(12, 102, 247)'
     }
     confirmData:any ={ 
        data: [],
        type:"Confirm",
        borderColor:"#ff073a",
        axesColor:'rgb(247, 12, 12)'
       }
    recoverData:any = { 
        data: [],
        type:"Recover",
        borderColor:"#28a745",
        axesColor:'rgb(12, 247, 47)'
       }
    deathsData:any ={ 
        data: [],
        type:"Death",
        borderColor:"#6c757d",
        axesColor:'rgb(74, 76, 74);'
       }  
    lineChartLabels:any[] = [];
  
  @ViewChild("chart") chart: ChartComponent=new ChartComponent();
  public chartOptions:any={};
  selected_chart="confirm"
  days_selected=30
  constructor(private apiservice:ApiService) {
    
  }
  ngOnInit(){
    this.create_chart(30)

  }
  getDateString(date:Date){
    var res = ""
    var month = date.getMonth()+1<10?"0"+String(date.getMonth()+1):String(date.getMonth()+1)
    var day = date.getDate()<10?"0"+String(date.getDate()):String(date.getDate())
    res = date.getFullYear()+"-"+month+"-"+day
    return res
  }
  months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

  getDateRead(date:string){
    var[y,m,d] = date.split("-")
    var res = this.months[Number.parseInt(m)-1]+" "+d
    return res
  }

  create_chart(diff_day:number){
    let date: Date = new Date();  
    var end_date = this.getDateString(date)
    console.log(end_date)
    date.setDate(date.getDate()-diff_day)
    var start_date = this.getDateString(date)
    console.log(start_date)
    var data = {
      state_code:"IN",
      start_date:start_date,
      end_date:end_date
    }
    this.apiservice.post("statewise_timeseries_data/",data).subscribe(
      res=>{
        console.log(res["data"])
        var label =[]
        var x_label=[]
        var confirm_data=[]
        var recover_data=[]
        var active_data=[]
        var death_data=[]
        
        for(var i=0;i<res["data"].length;i++){
          label.push(this.getDateRead(res["data"][i]["date"]))
          x_label.push(" ")
          confirm_data.push(res["data"][i]["confirm"])
          recover_data.push(res["data"][i]["recovered"])
          active_data.push(res["data"][i]["active"])
          death_data.push(res["data"][i]["deaths"])
        }
        this.activeData.data=active_data
        this.confirmData.data=confirm_data
        this.recoverData.data=recover_data
        this.deathsData.data=death_data
        this.lineChartLabels=label
        this.show_chart()
       
      },
      err=>{
        console.log(err)
      }
    )
    
  }

  show_chart(){
    var data:any={}
    if(this.selected_chart=='confirm'){
      data=this.confirmData
    }else if(this.selected_chart=='active'){
      data=this.activeData
    }else if(this.selected_chart=='recover'){
      data=this.recoverData
    }else if(this.selected_chart=='death'){
      data=this.deathsData
    }
    this.chartOptions = {
      series: [
        {
          name: data.type+" chart",
          data: data.data
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight",
        width:[2.5,2.5]
      },
      colors: [data.borderColor],
      xaxis: {
        categories: this.lineChartLabels,
        tickAmount:8,
        labels: {
          show: true,
          style: {
            colors: data.axesColor,
          }
        },
        axisBorder: {
          show: true,
          color: data.axesColor,
        },
        axisTicks: {
          show: true,
          borderType: 'solid',
          color: data.axesColor,
        },
      },
      yaxis:
        {
          opposite: true,
          axisTicks: {
            show: true,
            color: data.axesColor,
          },
          axisBorder: {
            show: true,
            color: data.axesColor
          },
          labels: {
            style: {
              colors: data.axesColor
            }
          },
        },
    };
    $('#chart').empty()
    var chart = new ApexCharts(document.querySelector("#chart"), this.chartOptions);
    chart.render();
  }
  change_chart(chart_type:string){
    this.selected_chart=chart_type;
    this.show_chart()
  }
  change_days(days:number){
    this.days_selected=days
    this.create_chart(days)
  }
}
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis:ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};
