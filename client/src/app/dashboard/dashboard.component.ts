import { Component, OnInit } from '@angular/core';
import { InterlinkService } from '../interlink.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName: string
  errMsg: string
  list:object
  allUsers: object[] = []
  allItems: object[] = []
  constructor(private _interlink: InterlinkService, private _router: Router) { 
    this.list = {
      title: '',
      desc: '', 
      user: '',
      creator: ''
    }
    this.errMsg = ''
  }
  newItem(){
    this.list['title'] = this.list['title'].trim();
    this.list['desc'] = this.list['desc'].trim();
    if(this.list['title'].length > 4 && this.list['desc'].length > 9){
      this._interlink.newItem(this.list, ()=>{
        for(var i in this.list){
          i = "";
        }
        this._router.navigate(['/'])
      })
    }else if(this.list['title'].length < 5){
      this.errMsg = "Not enough characters"
      for(var i in this.list){
        i = "";
      }
    }else if(this.list['desc'].length < 10){
      this.errMsg = "Not enough Characters"
      for(var i in this.list){
        i = "";
      }
    }
  }
  checkbox(id){
    this._interlink.checkbox(id,()=>{
      console.log("back in component")
    })
  }
  ngOnInit() {
    this._interlink.allUsers.subscribe((res)=>{
      this.allUsers = res;
    })
    this._interlink.showUsers();

    this._interlink.allItems.subscribe((res)=>{
      this.allItems = res;
    })
    this._interlink.showItems();

    this._interlink.CheckSession((userName) => {
      if (userName['user']) {
        this.userName = userName['user']['name'];
      } else {
        this._router.navigate(['/']);
      }
    })
  }
}
