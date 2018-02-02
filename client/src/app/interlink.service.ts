import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'Rxjs';

@Injectable()
export class InterlinkService {
  allUserArr: object[]
  allUsers: BehaviorSubject<any[]> = new BehaviorSubject([])
  itemArr: object[]
  allItems: BehaviorSubject<any[]> = new BehaviorSubject([])
  displayUser: BehaviorSubject<any[]> = new BehaviorSubject([])
  userList: BehaviorSubject<any[]> = new BehaviorSubject([])
  userlistArr: object[]
  tagArr: object[]
  taggedList:BehaviorSubject<any[]> = new BehaviorSubject([])
  constructor(private _http: Http) {}
  newItem(item, cb){
    this._http.post('/newItem', item).subscribe((res)=>{
      this.showItems();
      cb()
    })
  }
  showUsers(){
    this._http.get("/allUsers").subscribe((res)=>{
      this.allUserArr = res.json();
      this.allUsers.next(this.allUserArr);
    })
  }
  showItems(){
    this._http.get("/allItems").subscribe((res)=>{
      this.itemArr = res.json();
      this.allItems.next(this.itemArr)
    })
  }
  checkbox(id, cb){
    this._http.get('/check/' + id).subscribe((res)=>{
      cb(res)
    })
  }
  //display functions
  grabFriend(id){
    this._http.get('/displayUser/'+ id).subscribe((res)=>{
      this.displayUser.next(res.json()) //might give error
    })
  }
  grabUserList(id){
    this._http.get('/userList/' + id).subscribe((res)=>{
      this.userlistArr = res.json();
      this.userList.next(this.userlistArr)
    })
  }
  grabTaggedList(id){
    this._http.get('/taggedList/'+ id).subscribe((res)=>{
      this.tagArr = res.json();
      this.taggedList.next(this.tagArr)
    })
  }
  //login functions
  login(user, cb) {
    this._http.post('/login', user).subscribe((res) => {
      return cb(res.json());
    })
  }
  CheckSession(cb) {
    this._http.get('/dashboard_backend').subscribe((res) => {
      return cb(res.json());
    })
  }
}
