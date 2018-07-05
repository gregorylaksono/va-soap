
import {formatDate } from '@angular/common';
export class QueryMessage{

    constructor(public va: string) {}

    public toString() : string
    {
      let now = new Date();
      let trxDate = formatDate(now, "yyyyMMddHHmmssSS",'en-US','+0700');
    
      let companyCode = this.va.substr(0,4);
      let number = this.va.substr(4, this.va.length);

      return "<x:Envelope xmlns:x='http://schemas.xmlsoap.org/soap/envelope/' xmlns:bil='http://CIMB3rdParty/BillPaymentWS'><x:Header/><x:Body><bil:CIMB3rdParty_InquiryRq><bil:InquiryRq><bil:TransactionID>12344</bil:TransactionID><bil:ChannelID>1233</bil:ChannelID><bil:TerminalID>222</bil:TerminalID><bil:TransactionDate>"+trxDate+"</bil:TransactionDate><bil:CompanyCode>"+companyCode+"</bil:CompanyCode><bil:CustomerKey1>"+number+"</bil:CustomerKey1><bil:CustomerKey2>?</bil:CustomerKey2><bil:CustomerKey3>?</bil:CustomerKey3><bil:AdditionalData1>?</bil:AdditionalData1><bil:AdditionalData2>?</bil:AdditionalData2><bil:AdditionalData3>?</bil:AdditionalData3><bil:AdditionalData4>?</bil:AdditionalData4></bil:InquiryRq></bil:CIMB3rdParty_InquiryRq></x:Body></x:Envelope>";
    }
}