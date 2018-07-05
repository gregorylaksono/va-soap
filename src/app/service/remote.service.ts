import { PaymentMessage } from './../model/PaymentMessage';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QueryMessage } from '../model/QueryMessage';
import { VirtualAccount } from '../model/VirtualAccount';

@Injectable({
  providedIn: 'root'
})
export class RemoteService {

  constructor(private httpClient: HttpClient) { }

  public echo(message: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':  'text/xml'
    });
    const body = "<?xml version='1.0' encoding='utf-8'?>"
                +"<soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'  xmlns:tns='http://CIMB3rdParty/BillPaymentWS'>"
                +"<soap:Body><CIMB3rdParty_EchoRq xmlns='http://CIMB3rdParty/BillPaymentWS'>"
                +"<EchoRequest>"+message+"</EchoRequest>"
                +"</CIMB3rdParty_EchoRq></soap:Body></soap:Envelope>";
    return this.httpClient.post('http://localhost:8082/va-cimb', body, {headers, responseType:'text'});
  }

  public query(vaNo: string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type':  'text/xml'
    });

    let body = new QueryMessage(vaNo);
    return this.httpClient.post('http://localhost:8082/va-cimb',body.toString(), {headers, responseType:'text'});
  }

  public payment(vaNo : VirtualAccount):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type':  'text/xml'
    });
    let paymentMessage = new PaymentMessage(vaNo);
    return this.httpClient.post('http://localhost:8082/va-cimb',paymentMessage.toString(), {headers, responseType:'text'});
  }


}
