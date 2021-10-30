import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  data:any[] = []

  constructor(private apiService:ApiService) { }
  ngOnInit(): void {
    $(window).on('scroll', function () {

      var $w = $(window);
      $('.position-fixed-x').css('left', Number($w.scrollLeft()));
    
    });
    this.convert_number_to_K_L_Cr(36802640)
    this.convert_number_to_K_L_Cr(6591697)
    this.convert_number_to_K_L_Cr(7555)
    this.convert_number_to_K_L_Cr(230)
    this.apiService.get("all_state_total_data/").subscribe(
      res=>{
        var states_data = res["states_data"]
        for(var state_data of states_data){
          var state_info = {
            state:state_data["state_name"],
            total_confirm:this.convert_number(state_data["total_confirm"]),
            confirm:state_data["confirm"],
            total_recover:this.convert_number(state_data["total_recovered"]),
            recover:state_data["recovered"],
            total_active:this.convert_number(state_data["total_active"]),
            total_death:this.convert_number(state_data["total_death"]),
            death:state_data["deaths"],
            total_test:this.convert_number_to_K_L_Cr(state_data["total_tested"]),
            test:this.convert_number_to_K_L_Cr(state_data["tested"]),
            vaccine_1:this.convert_number_to_K_L_Cr(state_data["total_vaccinated1"]),
            vaccine_2:this.convert_number_to_K_L_Cr(state_data["total_vaccinated2"])
          }
          this.data.push(state_info)
        }
        var country_data = res["country_data"]
        var state_info = {
          state:country_data["state_name"],
          total_confirm:this.convert_number(country_data["total_confirm"]),
          confirm:country_data["confirm"],
          total_recover:this.convert_number(country_data["total_recovered"]),
          recover:country_data["recovered"],
          total_active:this.convert_number(country_data["total_active"]),
          total_death:this.convert_number(country_data["total_death"]),
          death:country_data["deaths"],
          total_test:this.convert_number_to_K_L_Cr(country_data["total_tested"]),
          test:this.convert_number_to_K_L_Cr(country_data["tested"]),
          vaccine_1:this.convert_number_to_K_L_Cr(country_data["total_vaccinated1"]),
          vaccine_2:this.convert_number_to_K_L_Cr(country_data["total_vaccinated2"])
        }
        this.data.push(state_info)
      },
      err=>{
        console.log("error")
        console.log(err)
      }
    )
  }
  lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e5, symbol: "L" },
    { value: 1e7, symbol: "Cr" },
  ];
  convert_number_to_K_L_Cr(n:number){
    if(n/1e7>1){
      return this.round_1decimal(n/1e7)+"Cr"
    }else if(n/1e5>1){
      return this.round_1decimal(n/1e5)+"L"
    }else if(n/1e3>1){
      return this.round_1decimal(n/1e3)+"K"
    }else{
      return n.toString()
    }
  }

  round_1decimal(n:number){
    return Math.round(n*10)/10
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
