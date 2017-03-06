import { Component } from '@angular/core';
import { TasksComponent } from './tasks/tasks.component';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers: [TaskService]
})
export class AppComponent { }
