import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import { Label } from 'ng2-charts';
import { ApiService } from 'src/app/service/api.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-data-linechart',
  templateUrl: './data-linechart.component.html',
  styleUrls: ['./data-linechart.component.scss']
})
export class DataLinechartComponent implements OnInit {
  selected_chart="confirm"
  days_selected=30
  date_label=["","","","",""]
  activeData: ChartDataSets[] = [
    { 
      data: [],
      fill:false,
      lineTension:0.3,
      label:'',
      borderWidth:2.5,
      borderColor:"#007bff",
      pointRadius:3,
      pointBorderColor:"rgb(40, 75, 122)",
      pointBackgroundColor:"rgb(87, 136, 199)"
     },
  ]
  confirmData: ChartDataSets[] = [
    { 
      data: [],
      fill:false,
      lineTension:0.3,
      label:'',
      borderWidth:2.5,
      borderColor:"#ff073a",
      pointRadius:3,
      pointBorderColor:"rgb(137, 35, 35)",
      pointBackgroundColor:"rgb(199, 87, 87)"
     },
  ]
  recoverData: ChartDataSets[] = [
    { 
      data: [],
      fill:false,
      lineTension:0.3,
      borderWidth:2.5,
      label:'',
      borderColor:"#28a745",
      pointRadius:3,
      pointBorderColor:"#1f8537",
      pointBackgroundColor:"#31a04b"
     },
  ]
  deathsData: ChartDataSets[] = [
    { 
      data: [],
      fill:false,
      lineTension:0.3,
      borderWidth:2.5,
      label:'',
      borderColor:"#6c757d",
      pointRadius:3,
      pointBorderColor:"#505458",
      pointBackgroundColor:"#8e9195"
     },
  ]
  lineChartLabels: Label[] = [];
  confirmChartOptions : ChartOptions = {
    responsive: false,
    scales: {
      xAxes: [{
        gridLines:{
          display:false
        },
        ticks:{
          display:false, 
        }
      }],
      yAxes: [ {
                  id: 'right-y-axis',
                  type: 'linear',
                  position: 'right',
                  gridLines:{
                    display:false,
                  },
                  ticks:{
                    fontColor:"rgb(105, 13, 13)",
                    callback:function(value, index, values) {
                      var n_k="0"
                      if(typeof value==='number'){
                        var n_k = String(Math.round(value*10/1000)/10)
                      }else if(typeof value==='string'){
                        var n_k = String(Math.round(Number.parseInt(value)*10/1000)/10)
                      }
                      return n_k+"K"
                    },
                    
                  },
              },
              {
                id: 'left-y-axis',
                type: 'linear',
                position: 'left',
                gridLines:{
                  display:false
                },
                ticks:{
                  display:false,
                  fontColor:"rgb(105, 13, 13)",
                }
            },
            ],
      },
        
  };
  recoverChartOptions : ChartOptions = {
    responsive: false,
    scales: {
      xAxes: [{
        gridLines:{
          display:false
        },
        ticks:{
          display:false, 
        }
      }],
      yAxes: [ {
                  id: 'right-y-axis',
                  type: 'linear',
                  position: 'right',
                  gridLines:{
                    display:false,
                  },
                  ticks:{
                    fontColor:"rgb(21, 105, 13)",
                    callback:function(value, index, values) {
                      var n_k="0"
                      if(typeof value==='number'){
                        var n_k = String(Math.round(value*10/1000)/10)
                      }else if(typeof value==='string'){
                        var n_k = String(Math.round(Number.parseInt(value)*10/1000)/10)
                      }
                      return n_k+"K"
                    },
                    
                  },
              },
              {
                id: 'left-y-axis',
                type: 'linear',
                position: 'left',
                gridLines:{
                  display:false
                },
                ticks:{
                  display:false,
                  fontColor:"rgb(105, 13, 13)",
                }
            },
            ],
      },       
  };

  deathChartOptions : ChartOptions = {
    responsive: false,
    scales: {
      xAxes: [{
        gridLines:{
          display:false
        },
        ticks:{
          display:false, 
        }
      }],
      yAxes: [ {
                  id: 'right-y-axis',
                  type: 'linear',
                  position: 'right',
                  gridLines:{
                    display:false,
                  },
                  ticks:{
                    fontColor:"rgb(51, 52, 50)",
                    callback:function(value, index, values) {
                      return value
                    },
                    
                  },
              },
              {
                id: 'left-y-axis',
                type: 'linear',
                position: 'left',
                gridLines:{
                  display:false
                },
                ticks:{
                  display:false,
                }
            },
            ],
      },       
  };
  activeChartOptions : ChartOptions = {
    responsive: false,
    scales: {
      xAxes: [{
        gridLines:{
          display:false
        },
        ticks:{
          display:false, 
        }
      }],
      yAxes: [ {
                  id: 'right-y-axis',
                  type: 'linear',
                  position: 'right',
                  gridLines:{
                    display:false,
                  },
                  ticks:{
                    fontColor:"rgb(13, 41, 105)",
                    callback:function(value, index, values) {
                      var n_k="0"
                      if(typeof value==='number'){
                        var n_k = String(Math.round(value*10/1000)/10)
                      }else if(typeof value==='string'){
                        var n_k = String(Math.round(Number.parseInt(value)*10/1000)/10)
                      }
                      return n_k+"K"
                    },
                    
                  },
              },
              {
                id: 'left-y-axis',
                type: 'linear',
                position: 'left',
                gridLines:{
                  display:false
                },
                ticks:{
                  display:false,
                }
            },
            ],
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
    
    
    this.create_chart(90)
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
        if(diff_day==30){
          let date: Date = new Date();
          date.setDate(date.getDate()-30)
          date.setDate(date.getDate()+1)
          this.date_label[0]=this.getDateRead(this.getDateString(date))
          date.setDate(date.getDate()+6)
          this.date_label[1]=this.getDateRead(this.getDateString(date))
          date.setDate(date.getDate()+7)
          this.date_label[2]=this.getDateRead(this.getDateString(date))
          date.setDate(date.getDate()+6)
          this.date_label[3]=this.getDateRead(this.getDateString(date))
          date.setDate(date.getDate()+6)
          this.date_label[4]=this.getDateRead(this.getDateString(date))
        }else if(diff_day==60){
          let date: Date = new Date();
          date.setDate(date.getDate()-60)
          date.setDate(date.getDate()+2)
          this.date_label[0]=this.getDateRead(this.getDateString(date))
          date.setDate(date.getDate()+13)
          this.date_label[1]=this.getDateRead(this.getDateString(date))
          date.setDate(date.getDate()+14)
          this.date_label[2]=this.getDateRead(this.getDateString(date))
          date.setDate(date.getDate()+11)
          this.date_label[3]=this.getDateRead(this.getDateString(date))
          date.setDate(date.getDate()+12)
          this.date_label[4]=this.getDateRead(this.getDateString(date))
        }else if(diff_day==90){
          let date: Date = new Date();
          date.setDate(date.getDate()-90)
          date.setDate(date.getDate()+4)
          this.date_label[0]=this.getDateRead(this.getDateString(date))
          date.setDate(date.getDate()+20)
          this.date_label[1]=this.getDateRead(this.getDateString(date))
          date.setDate(date.getDate()+20)
          this.date_label[2]=this.getDateRead(this.getDateString(date))
          date.setDate(date.getDate()+18)
          this.date_label[3]=this.getDateRead(this.getDateString(date))
          date.setDate(date.getDate()+18)
          this.date_label[4]=this.getDateRead(this.getDateString(date))
        }
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
  months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

  getDateRead(date:string){
    var[y,m,d] = date.split("-")
    var res = this.months[Number.parseInt(m)-1]+" "+d
    return res
  }

  convert_K(n:number){
    var n_k = Math.round(n*10/1000)/10
    return n_k+"K"
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

  change_chart(change:string){
    this.selected_chart=change
  }
  change_days(days:number){
    this.create_chart(days)
    this.days_selected=days
  }

}
