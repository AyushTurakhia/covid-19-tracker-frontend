import { Component, OnInit } from '@angular/core';
import {  GoogleChartInterface } from 'ng2-google-charts';
import { ApiService } from 'src/app/service/api.service';
import * as d3 from 'd3';
import * as $ from 'jquery'

declare var Datamap:any;
@Component({
  selector: 'app-data-maps',
  templateUrl: './data-maps.component.html',
  styleUrls: ['./data-maps.component.scss']
})
export class DataMapsComponent implements OnInit {
  confirm_data:{[key:string]:map_data}={}
  recover_data:{[key:string]:map_data}={}
  active_data:{[key:string]:map_data}={}
  death_data:{[key:string]:map_data}={}
  confirm_shades={
    '0-5'   :'#fcecec',
    '6-10'  :'#fde5e5',
    '11-15' :'#ffd7d7',
    '16-20' :'#ffc8c8',
    '21-25' :'#ffbbbb',
    '26-30' :'#fdadad',
    '31-35' :'#fc9c9c',
    '36-40' :'#fc8d8d',
    '41-45' :'#ff8282',
    '46-50' :'#ff7373',
    '51-55' :'#fc6161',
    '56-60' :'#f14f4f',
    '61-65' :'#e43d3d',
    '66-70' :'#e62d2d',
    '71-75' :'#e62d2d',
    '76-80' :'#d83030',
    '81-85' :'#c92323',
    '86-90' :'#b81717',
    '91-95' :'#a50e0e',
    '96-100' :'#7f0505',
    defaultFill: '#dddddd'
}
  active_shades={
    '0-5'   :'#edecfc',
    '6-10'  :'#e5f0fd',
    '11-15' :'#d7e3ff',
    '16-20' :'#c8d4ff',
    '21-25' :'#bbccff',
    '26-30' :'#adbafd',
    '31-35' :'#9ca9fc',
    '36-40' :'#8d9cfc',
    '41-45' :'#8293ff',
    '46-50' :'#7396ff',
    '51-55' :'#618ffc',
    '56-60' :'#4f72f1',
    '61-65' :'#3d4be4',
    '66-70' :'#214add',
    '71-75' :'#0821c2',
    '76-80' :'#3038d8',
    '81-85' :'#2339c9',
    '86-90' :'#1c17b8',
    '91-95' :'#0e0ea5',
    '96-100' :'#05057f',
    defaultFill: '#dddddd'
}
  recover_shades={
    '0-5'   :'#edfcec',
    '6-10'  :'#eafde5',
    '11-15' :'#daffd7',
    '16-20' :'#d1ffc8',
    '21-25' :'#bbffbf',
    '26-30' :'#adfdb0',
    '31-35' :'#9cfc9f',
    '36-40' :'#8dfc9a',
    '41-45' :'#88ff82',
    '46-50' :'#73ff78',
    '51-55' :'#64fc61',
    '56-60' :'#5df14f',
    '61-65' :'#53e43d',
    '66-70' :'#24dd21',
    '71-75' :'#11c208',
    '76-80' :'#46d830',
    '81-85' :'#2bc923',
    '86-90' :'#17b82a',
    '91-95' :'#1ba50e',
    '96-100' :'#0b7f05',
    defaultFill: '#dddddd'
}
  death_shades={
    '0-5'   :'#f0f0f0',
    '6-10'  :'#e6e6e6',
    '11-15' :'#dbdbdb',
    '16-20' :'#d1d1d1',
    '21-25' :'#c7c7c7',
    '26-30' :'#bdbdbd',
    '31-35' :'#b3b3b3',
    '36-40' :'#a8a8a8',
    '41-45' :'#9e9e9e',
    '46-50' :'#949494',
    '51-55' :'#8a8a8a',
    '56-60' :'#808080',
    '61-65' :'#757575',
    '66-70' :'#6b6b6b',
    '71-75' :'#616161',
    '76-80' :'#575757',
    '81-85' :'#4d4d4d',
    '86-90' :'#424242',
    '91-95' :'#383838',
    '96-100' :'#2e2e2e',
    defaultFill: '#dddddd'
}
  states_data = [['State','COVID-Confirmed Cases']];
  mapReady=false;
  selected_chart="confirm"
  constructor(public serv: ApiService){}

  ngOnInit(){
    var containerw = $('#container').width()
  var height = Number(containerw)*(28/29)
  $('#container').height(height)
    this.serv.get("all_state_total_data/").subscribe((res)=>{
        var states_data = res["states_data"]
        var max_confirm=0,max_active=0,max_recover=0,max_death=0;
        
        for(let state of states_data){
          var confirm_json:map_data={
            state_name:state["state_name"],
            data_number:state["total_confirm"],
            type:"confirm",
            fillKey:"0-5"
          }
          var active_json:map_data={
            state_name:state["state_name"],
            data_number:state["total_active"],
            type:"active",
            fillKey:"0-5"
          }
          var death_json:map_data={
            state_name:state["state_name"],
            data_number:state["total_death"],
            type:"death",
            fillKey:"0-5"
          }
          var recover_json:map_data={
            state_name:state["state_name"],
            data_number:state["total_recovered"],
            type:"recover",
            fillKey:"0-5"
          }
          if(max_confirm<state["total_confirm"]){
            max_confirm=state["total_confirm"]
          }
          if(max_active<state["total_active"]){
            max_active=state["total_active"]
          }
          if(max_death<state["total_death"]){
            max_death=state["total_death"]
          }
          if(max_recover<state["total_recovered"]){
            max_recover=state["total_recovered"]
          }
          if(state["state_code"]!="OR"){
            if(state["state_code"]!="TG"){
              if(state["state_code"]!="UT"){
                this.confirm_data[state["state_code"]]=confirm_json
                this.active_data[state["state_code"]]=active_json
                this.recover_data[state["state_code"]]=recover_json
                this.death_data[state["state_code"]]=death_json
              }else{
                this.confirm_data["UK"]=confirm_json
                this.active_data["UK"]=active_json
                this.recover_data["UK"]=recover_json
                this.death_data["UK"]=death_json
              }
              
            }else{
              this.confirm_data["TS"]=confirm_json
              this.active_data["TS"]=active_json
              this.recover_data["TS"]=recover_json
              this.death_data["TS"]=death_json
            }
            
          }else{
            this.confirm_data["OD"]=confirm_json
            this.active_data["OD"]=active_json
            this.recover_data["OD"]=recover_json
            this.death_data["OD"]=death_json
          }
          
        }

        for(let code of Object.keys(this.confirm_data)){
          this.confirm_data[code].fillKey=this.get_fill_key(this.confirm_data[code].data_number,max_confirm)
          this.recover_data[code].fillKey=this.get_fill_key(this.recover_data[code].data_number,max_recover)
          this.active_data[code].fillKey=this.get_fill_key(this.active_data[code].data_number,max_active)
          this.death_data[code].fillKey=this.get_fill_key(this.death_data[code].data_number,max_death)
        }
        console.log(this.confirm_data)
        this.mapReady=true
        this.draw_map("confirm")
      },
      (err)=>{
        console.log(err)
      }
    );
  }

  get_fill_key(data_number:number,max_data:number){
    var percentage = Math.round((data_number/max_data)*100)
    
    var tens_place = ~~(percentage/10)
    var units_place = percentage%10
    var res=""
    if(units_place!=0){
      if(units_place<=5){
        if(tens_place==0){
          res="0-5"
        }else{
          res = tens_place+"1-"+tens_place+"5"
        }
      }else{
        if(tens_place==0){
          res="6-10"
        }else{
          res = tens_place+"6-"+(tens_place+1)+"0"
        }
      }
    }else{
      if(tens_place==0){
        res="0-5"
      }
      else if(tens_place==1){
        res = "6-10"
      }else{
        res = (tens_place-1)+"6-"+tens_place+"0"
      }
    }
    return res
  }

  draw_map(type:any){
    var fill_color={}
  var data={}
  var border_color=""
  if(type=="confirm"){
    fill_color=this.confirm_shades
    data=this.confirm_data
    border_color="rgba(255, 7, 58, 0.25)"
  }else if(type=="death"){
    fill_color = this.death_shades
    data = this.death_data
    border_color="rgba(108, 117, 125, 0.25)"
  }
  else if(type=="recover"){
    fill_color = this.recover_shades
    data = this.recover_data
    border_color="rgba(40, 167, 69, 0.25)"
  }
  else if(type=="active"){
    fill_color=this.active_shades
    data = this.active_data
    border_color="rgba(0, 123, 255, 0.25)"
  }
  $('#container').empty();
  var map = new Datamap({element:document.getElementById('container')});
  map.svg.remove();
  delete map.svg;
  var map = new Datamap({
      element:document.getElementById('container'),
         scope: 'india',
         responsive:true,
         geographyConfig: {
             popupOnHover: true,
             highlightOnHover: false,
             borderColor: border_color,
             borderWidth: 0.5,
             popupTemplate: function (geo:any, data:any) {
                 if(data!=null){
                  return `<div class="hoverinfo">state: ${data.state_name}<br>${data.type}: ${data.data_number}</div>`;
                 }
                 else
                  return ``;
          },
             dataUrl: 'https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/india.topo.json'
         },
         fills: fill_color,
         data: data,
         setProjection: function (element:any) {
           console.log(element.clientWidth)
           console.log(element.offsetWidth)
             var projection = d3.geoMercator()
                 .center([96.9629, 10.5937]) // always in [East Latitude, North Longitude]
                 .scale(element.clientWidth+300)
                .translate([(element.clientWidth+350) / 2, (element.clientWidth+300) / 2]);
             var path = d3.geoPath().projection(projection);
             return { path: path, projection: projection };
         }
});
  }
  change_chart(type:any){
    this.selected_chart=type
    this.draw_map(type)
  }
 
  
  
  
}
export class map_data{
  data_number: number=0
  fillKey: string=""
  state_name: string=""
  type: string=""
}
