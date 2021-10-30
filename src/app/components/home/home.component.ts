import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { ApiService } from 'src/app/service/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selected = "graph"
  is_phone=false
  constructor(private apiService:ApiService) { }
  ngOnInit(): void {
    this.is_phone=window.innerWidth<800
  }
  change_select(select:string){
    this.selected=select
    console.log(this.selected)
  }
 
  

}
