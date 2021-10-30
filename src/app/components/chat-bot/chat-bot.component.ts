import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent implements OnInit {
  msg_input=""
  disable=false
  load=false
  msg_list:any=[
   
  ]

  quick_reply=[]
  constructor(private api:ApiService) { }

  ngOnInit(): void {
  }
  
  onclick_quick(reply:string){
    if(reply!="end chat"){
      var msg = {
        msg_type:"human",
        msg_time:"00:15",
        msg_text:reply
      }
      this.msg_list.push(msg)
      this.msg_input=""
      this.quick_reply=[]
      this.disable=true
      this.load=true
      this.apicall(reply)
    }else{
      this.msg_list=[]
      this.quick_reply=[]
      this.msg_input=""
    }
     
  }

  

  onclick_send(){
    if(this.msg_input.trim()!="" && !this.disable){
      console.log(this.msg_input)
      var msg_text=this.msg_input
      var msg = {
        msg_type:"human",
        msg_time:"00:15",
        msg_text:this.msg_input
      }
      this.msg_list.push(msg)
      this.msg_input=""
      this.quick_reply=[]
      this.disable=true
      this.load=true
      this.apicall(msg_text)
    }
  }
  url_convert(text:string) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
      return "<a href='" + url + "'>click here</a>";
    })
  }
  apicall(msg_text:string){
    var data={"input":msg_text}
    this.api.post("chat_bot/",data).subscribe(
      res=>{
        
        console.log(this.url_convert(res["response"]))
        var msg = {
          msg_type:"bot",
          msg_time:"00:36",
          msg_text:this.url_convert(res["response"])
        }
        this.msg_list.push(msg)
        this.quick_reply=res["quick reply"]
        this.load=false
        this.disable=false
      },
      err=>{
        console.log(err)
        this.load=false
        this.disable=false
      }
    )

  }

}
