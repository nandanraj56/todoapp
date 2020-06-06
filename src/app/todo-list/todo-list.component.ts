import { Component, OnInit } from '@angular/core';
import { TASKS } from "../mock-task";
import { Task } from "../task"
import {TaskService} from "../task.service";
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(private _taskService:TaskService) { }

  ngOnInit(): void {
    this._taskService.getTasks()
      .subscribe(data=>this.tasks=data)
  }
  tasks  : Task[];//TASKS;//Task[];
  task_form_toggle:Boolean = false;
  add_new : Boolean = true;

  //Holder for ngModel form values
  new_task : Task = {
    _id:0,
    description:"",
    label:"Personal",
    state:"",
    due_date:"",
    priority:"Low",

  };

  //Create Task
  newTaskSubmit() : void{
    //alert("Hello");
    this._taskService.createTask({
      _id: null,
      description: this.new_task.description,
      label: this.new_task.label,
      state: 'New',
      due_date: this.new_task.due_date,
      priority: this.new_task.priority,
  }).subscribe(data=>{
    this.tasks.push(data);
    this.task_form_toggle = false;
    this.add_new= true;
    this.new_task.description="";
    this.new_task.label="Personal";
    this.new_task.state="";
    this.new_task.due_date="";
    this.new_task.priority="Low";
  });
  };
  showNewTaskForm() : void{
    if(this.task_form_toggle==false){
      this.task_form_toggle = true;
      this.add_new= false;

    }else{
      this.task_form_toggle = false;
      this.add_new= true;
    }
  }

  stateChange(id) :void {
   let task=this.tasks.find((task)=>{return task._id==id});
   let task_copy= JSON.parse(JSON.stringify(task));
   if(task_copy.state=="New")
   task_copy.state="In Progress";
   else if(task_copy.state=="In Progress")
   task_copy.state="Complete";
   else if(task_copy.state=="Complete"){
    task_copy.state="New";
    //alert("Complete->new");   
   }
   

   this._taskService.updateTask(task_copy).subscribe((result)=>{
     task.state=result.state;
     //console.log(task);
     //console.log(result);
    });
  }
  

}
