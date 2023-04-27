import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Todo from 'app/models/todo';
import { TaskService } from 'app/task.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { EditcommentComponent } from '../editcomment/editcomment.component';

declare var google: any;    

@Component({
    moduleId: module.id,
    selector: 'comment-cmp',
    templateUrl: 'comment.component.html',
    styleUrls: ['./comment.component.css']
})

export class CommentComponent implements OnInit {
    inputTodo:string='';  
    title='todo app';  
    todos: Todo[];  
    commentForm: FormGroup;

  constructor(private taskService: TaskService,
              private dialog: MatDialog) { }  
  
  ngOnInit(): void {
    // b = b.replace(/(?:\r\n|\r|\n)/g, '<br />');
    this.initForm();    
    this.taskService.getComments().subscribe(data => {
        console.log("~~~!!! comment from onInit = ",data);        
        this.todos=data;
        // this.commentForm.patchValue(this.todos);
    });  
  }

  initForm(){
    this.commentForm = new FormGroup({
        inputTodo: new FormControl("",Validators.required)
    });
  }

  submit(data){
    console.log("create todo data = ",data);
    data = data.inputTodo;
    data = data.replace(/(?:\r\n|\r|\n)/g, '<br/>');
    console.log("after replace todo data = ",data);
    let res = this.taskService.createComments(data);
    // console.log("res data = ",res);
    this.taskService.getComments().subscribe(data => {
        console.log("~~~!!! comment from submit = ",data);        
        this.todos=data;
        // this.commentForm.patchValue(this.todos);
    });
  }

  // formatText(item) {
  //   item = item.replace(/(?:\r\n|\r|\n)/g, '<br/>');
  //   return item;
  // }

  edit(item) {
    const componentName = EditcommentComponent
    console.log("%%% item in edit = ",item);
    this.openDialog(item,componentName);
  }

  deleteComment(item) {
    const componentName = PopupComponent;
    console.log("%%% item = ",item); 
    this.openDialog(item, componentName);
  }

  openDialog(item, componentName): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    
    const dialogRef = this.dialog.open(componentName, {
      data: {content:item.content,_id:item._id},
      panelClass: 'editComment',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed. result = ',result);
      this.taskService.getComments().subscribe(data => {      
            this.todos=data; });
    });
  }

}
