import { RemoteService } from './../../service/remote.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { VirtualAccount } from '../../model/VirtualAccount';
import {Router} from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SimpleMessageComponent } from '../../dialog/simple-message/simple-message.component';
import { UtilService } from '../../service/UtilService';
@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit, OnDestroy {
  private va : VirtualAccount;
  private canProcessed = false;
  private paymentSubscriber: any;
  private querySubscriber: any;
  constructor(private router: Router, private matDialog: MatDialog, private utilService: UtilService, private remoteService: RemoteService) { 
    
  }

  ngOnInit() {
  this.querySubscriber = this.utilService.getData().subscribe(data =>{
    this.va = data;
      if(this.va.code == '00'){
          this.canProcessed = true;
      }
  });
  
  this.paymentSubscriber = this.utilService.getPaymentResponse().subscribe(responseCode => {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.disableClose = true;
    matDialogConfig.autoFocus = true;

    if(responseCode == '00'){  
      matDialogConfig.data = {
        title: 'Payment',
        description:'Payment is successfull. Click close to go back'
      }
    }
    else if(responseCode == '37'){
      matDialogConfig.data = {
        title: 'Payment',
        description:'Virtual account is expired. Please click ok to go back'
      }
    }
    else {
      matDialogConfig.data = {
        title: 'Payment',
        description:'Payment is failed. Click close to go back'
      }
    }
    this.matDialog.open(SimpleMessageComponent,matDialogConfig );
  });

  }

  back(){
    this.router.navigateByUrl('main');
  }

  payment() :void{
    this.remoteService.payment(this.va).subscribe( res =>{
      const parser = new DOMParser();
      const xml = parser.parseFromString(res, 'text/xml');
      this.utilService.parsePayment(xml);
    });
   
  }

  ngOnDestroy(){
    this.paymentSubscriber.unsubscribe();
    this.querySubscriber.unsubscribe();
  }
}
