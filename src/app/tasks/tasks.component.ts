import { Component, OnInit } from '@angular/core';
import { TaskService } from '.././task.service';
import { Task } from '../.././Task';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

    tasks: Task[];
    title: string;

  constructor(private taskService:TaskService) {

      this.taskService.getTasks()
        .subscribe(tasks => {
            console.log(tasks);
            this.tasks = tasks;
        })
  }

  ngOnInit() {
  }

  addTask(event) {
      event.preventDefault();
      var newTask = {
          title: this.title,
          isDone: false
      }

      this.taskService.addTask(newTask)
        .subscribe(task => {
            this.tasks.push(task);
            this.title = '';
        })
  }

  deleteTask(id) {
      var tasks = this.tasks;
      this.taskService.deleteTask(id)
        .subscribe(data => {
            if (data.n == 1) {
                for (var i = 0; i < tasks.length; i++) {
                    if (tasks[i]._id == id) {
                        tasks.splice(i, 1);
                    }
                }
            }
        })
  }

  updateStatus(task) {
      var _task = {
          _id: task._id,
          title: task.title,
          isDone: !task.isDone
      };

      this.taskService.updateStatus(_task)
        .subscribe(data => {
            task.isDone = !task.isDone;
        })
  }

}
