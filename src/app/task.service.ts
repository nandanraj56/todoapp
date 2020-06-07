import { Injectable, ɵConsole } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Task} from './task';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  _url:string ="http://localhost:3000/tasks/";
  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]>{
    //console.log(this.http.get<Task[]>(this._url));
   return this.http.get<Task[]>(this._url);
  }
  createTask(obj:Task):Observable<Task>{
   return this.http.post<Task>(this._url,obj);

  }

  updateTask(obj:Task):Observable<Task>{
    return this.http.patch<Task>(this._url+obj._id,obj);

  }
  deleteTask(id):Observable<any>{
    const requestOptions: Object = {
      headers: new HttpHeaders(),
      responseType: 'text',
      observe:"response"
    }
  

    return this.http.delete<any>(this._url+id,requestOptions);
  }
}
//observe:"response",