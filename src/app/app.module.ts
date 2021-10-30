import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ChartsModule } from 'ng2-charts';
import { DataCardComponent } from './components/data-card/data-card.component';
import { HttpClientModule } from '@angular/common/http';
import { DataProgressBarComponent } from './components/data-progress-bar/data-progress-bar.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DataLinechartComponent } from './components/data-linechart/data-linechart.component';
import { DataMapsComponent } from './components/data-maps/data-maps.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { LineChartComponent } from './component/line-chart/line-chart.component';
import { ChatBotComponent } from './components/chat-bot/chat-bot.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DataCardComponent,
    DataProgressBarComponent,
    DataTableComponent,
    DataLinechartComponent,
    DataMapsComponent,
    LineChartComponent,
    ChatBotComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ChartsModule,
    HttpClientModule,
    NgApexchartsModule,
    Ng2GoogleChartsModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
