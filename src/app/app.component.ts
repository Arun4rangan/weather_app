import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
 title = 'Test api call';
 private apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';
 data: any={};

 constructor(private http: Http){
    console.log('this works!');
    this.getContacts();
    this.getData();
 };

 getData() {
  console.log('this works!');
  return this.http.get(this.apiUrl)
   .map((res: Response) => res.json());
 };

 getContacts() {
    this.getData().subscribe(data =>{
        console.log(data);
        this.data = data
    })
 };
};
