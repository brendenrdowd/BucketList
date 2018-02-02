import { Component, OnInit } from '@angular/core';
import { InterlinkService } from '../interlink.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  userName: string
  displayedUser: object
  id: string
  userList:object[]=[]
  constructor(private _interlink: InterlinkService, private _router: Router,private route: ActivatedRoute ) { }
  checkbox(id){
    this._interlink.checkbox(id,()=>{
      console.log("checkbox")
    })
  }
  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this._interlink.grabFriend(this.id);

    this._interlink.displayUser.subscribe((res)=>{
      this.displayedUser = res
    })

    this._interlink.userList.subscribe((res)=>{
      this.userList = res;
    })
    this._interlink.grabUserList(this.id);
    this._interlink.taggedList.subscribe((res)=>{
      this.userList.push(res)
      console.log("back in comp", res)
    })
    this._interlink.grabTaggedList(this.id);

    this._interlink.CheckSession((userName) => {
      if (userName['user']) {
        this.userName = userName['user']['name'];
      } else {
        this._router.navigate(['/']);
      }
    })
  }
}