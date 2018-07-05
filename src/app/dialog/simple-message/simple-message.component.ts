import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simple-message',
  templateUrl: './simple-message.component.html',
  styleUrls: ['./simple-message.component.css']
})
export class SimpleMessageComponent implements OnInit {
  description:string;
  title:string;
  constructor(private dialogRef: MatDialogRef<SimpleMessageComponent>, @Inject(MAT_DIALOG_DATA) data, private router: Router) { 
      this.description = data.description;
      this.title = data.title;
  }

  ngOnInit() {
  }

  close():void{
    this.dialogRef.close();
    this.router.navigateByUrl('main');
  }
}
