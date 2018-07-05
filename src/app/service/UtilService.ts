import { VirtualAccount } from './../model/VirtualAccount';
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class UtilService{
    private virtual_account_data = new Subject<VirtualAccount>(); 
    private payment_data = new Subject<string>();

    public parsePayment(xml : any) : void{
      let response = xml.children[0].children[1].children[0].children[0];
      let responseCode = response.childNodes[19].textContent;
      this.payment_data.next(responseCode);
    }

    public parseQuery(vaNo: string, xml : any) : void{
      let response = xml.children[0].children[1].children[0].children[0];
      let respCode = response.childNodes[19].textContent;
      let amount = response.childNodes[10].textContent;
      let customer =  response.childNodes[13].textContent;
      let expired = response.childNodes[16].textContent;
      let sts = '';
      if(respCode == '00'){
        sts = 'Active';
      }
      else if(respCode == '20'){
        sts = 'Paid';
      }
      else if(respCode == '16'){
        sts = 'Not found'
      }
      
      let va = new VirtualAccount(vaNo,amount,customer,expired,sts,respCode);
      this.virtual_account_data.next(va);
    }

    public getData() : Subject<VirtualAccount> {
      return this.virtual_account_data;
    }

    public getPaymentResponse() : Subject<string>{
      return this.payment_data;
    }
}