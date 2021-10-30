import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-data-progress-bar',
  templateUrl: './data-progress-bar.component.html',
  styleUrls: ['./data-progress-bar.component.scss']
})
export class DataProgressBarComponent implements OnInit {
  one_dose_percentage="70%"
  two_dose_percentage="30%"
  total_vaccine = "90,51,75,348"
  population=0
  vaccine_1 = 0
  vaccine_2 = 0
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    
    this.apiService.get("total_data_state/IN/").subscribe(
      res=>{
        // console.log(res["state_data"])
        this.population=res["state_data"]["population"]
        this.vaccine_1=res["state_data"]["total_vaccinated1"]        
        this.vaccine_2=res["state_data"]["total_vaccinated2"]
        this.one_dose_percentage = this.round_to_1decimal((this.vaccine_1*100)/this.population).toString()+"%"
        this.two_dose_percentage = this.round_to_1decimal((this.vaccine_2*100)/this.population).toString()+"%"
        this.total_vaccine = this.convert_number(this.vaccine_1+this.vaccine_2)
      },
      err=>{
        console.log(err)
      }
    )
  }
  round_to_1decimal(n:number){
    return (Math.round(n * 10)) / 10
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
