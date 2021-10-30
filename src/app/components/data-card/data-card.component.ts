import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import { Label } from 'ng2-charts';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.scss']
})
export class DataCardComponent implements OnInit {
  type_screen="l"
  activeData: ChartDataSets[] = [
    { 
      data: [],
      fill:false,
      lineTension:0.2,
      label:'',
      borderWidth:2,
      borderColor:"#007bff",
      pointRadius:0
     },
  ]
  confirmData: ChartDataSets[] = [
    { 
      data: [],
      fill:false,
      lineTension:0.2,
      label:'',
      borderWidth:2,
      borderColor:"#ff073a",
      pointRadius:0
     },
  ]
  recoverData: ChartDataSets[] = [
    { 
      data: [],
      fill:false,
      lineTension:0.2,
      borderWidth:2,
      label:'',
      borderColor:"#28a745",
      pointRadius:0
     },
  ]
  deathsData: ChartDataSets[] = [
    { 
      data: [],
      fill:false,
      lineTension:0.2,
      borderWidth:2,
      label:'',
      borderColor:"#6c757d",
      pointRadius:0,
     },
  ]
  lineChartLabels: Label[] = [];
  lineChartOptions : ChartOptions = {
    responsive: false,
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          display: false
      }
      }],
      yAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          display: false
      },
      }],
    },
    
  };
 
  curent_recover_count=0
  curent_confirm_count=0
  curent_death_count=0
  total_recover = "0"
  total_confirm="0"
  total_death="0"
  total_active="0"
  
  public lineChartLegend = false;
  public lineChartType:ChartType = 'line';

  constructor(private apiservice:ApiService) { }

  ngOnInit(): void {
    var width = window.innerWidth
    if(width<500){
      this.type_screen="xs"
    }else if(width<1000){
      this.type_screen='s'
    }else{
      this.type_screen='l'
    }
    let date: Date = new Date();  
    var end_date = this.getDateString(date)
    console.log(end_date)
    date.setDate(date.getDate()-30)
    var start_date = this.getDateString(date)
    console.log(start_date)
    var data = {
      state_code:"IN",
      start_date:start_date,
      end_date:end_date
  }
    this.apiservice.post("statewise_timeseries_data/",data).subscribe(
      res=>{
        // console.log(res["data"])
        var label =[]
        var confirm_data=[]
        var recover_data=[]
        var active_data=[]
        var death_data=[]
        for(var i=0;i<res["data"].length;i++){
          label.push(res["data"][i]["date"])
          confirm_data.push(res["data"][i]["confirm"])
          recover_data.push(res["data"][i]["recovered"])
          active_data.push(res["data"][i]["active"])
          death_data.push(res["data"][i]["deaths"])
        }
        this.activeData[0].data=active_data
        this.confirmData[0].data=confirm_data
        this.recoverData[0].data=recover_data
        this.deathsData[0].data=death_data
        this.lineChartLabels=label
        this.curent_recover_count=recover_data[recover_data.length-1]
        this.curent_confirm_count=confirm_data[confirm_data.length-1]
        this.curent_death_count=death_data[death_data.length-1]
        this.total_confirm=this.convert_number(res["data"][res["data"].length-1]["total_confirm"])
        this.total_active=this.convert_number(res["data"][res["data"].length-1]["total_active"])
        this.total_death=this.convert_number(res["data"][res["data"].length-1]["total_death"])
        this.total_recover=this.convert_number(res["data"][res["data"].length-1]["total_recovered"])
      },
      err=>{
        console.log(err)
      }
    )
  }

  getDateString(date:Date){
    var res = ""
    var month = date.getMonth()+1<10?"0"+String(date.getMonth()+1):String(date.getMonth()+1)
    var day = date.getDate()<10?"0"+String(date.getDate()):String(date.getDate())
    res = date.getFullYear()+"-"+month+"-"+day
    return res
  }

  convert_number(n:number){
    var x=n.toString();
    var lastThree = x.substring(x.length-3);
    var otherNumbers = x.substring(0,x.length-3);
    if(otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res
  }
}
