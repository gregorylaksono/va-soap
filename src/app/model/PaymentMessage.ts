import { formatDate } from '@angular/common';
import { VirtualAccount } from './VirtualAccount';
export class PaymentMessage{
    public constructor(public virtual_account: VirtualAccount){}

    public toString(): string{
    let companyCode = this.virtual_account.vaNo.substr(0,4);
    let va_no = this.virtual_account.vaNo.substr(4,this.virtual_account.vaNo.length);
    let now = new Date();
    let transactionDate = formatDate(now, "yyyyMMddHHmmssSS",'en-US','+0700');
    let value = "<x:Envelope xmlns:x='http://schemas.xmlsoap.org/soap/envelope/' xmlns:bil='http://CIMB3rdParty/BillPaymentWS'>"
    +"<x:Header/>"
    +"<x:Body>"
        +"<bil:CIMB3rdParty_PaymentRq>"
            +"<bil:PaymentRq>"
                +"<bil:TransactionID>111111111</bil:TransactionID>"
                +"<bil:ChannelID>1233</bil:ChannelID>"
                +"<bil:TerminalID>222</bil:TerminalID>"
                +"<bil:TransactionDate>"+transactionDate+"</bil:TransactionDate>"
                +"<bil:CompanyCode>"+companyCode+"</bil:CompanyCode>"
                +"<bil:CustomerKey1>"+va_no+"</bil:CustomerKey1>"
                +"<bil:CustomerKey2>?</bil:CustomerKey2>"
                +"<bil:CustomerKey3>?</bil:CustomerKey3>"
                +"<bil:Language>?</bil:Language>"
                +"<bil:Currency>IDR</bil:Currency>"
                +"<bil:Amount>"+this.virtual_account.amount+"</bil:Amount>"
                +"<bil:Fee>0</bil:Fee>"
                +"<bil:PaidAmount>"+this.virtual_account.amount+"</bil:PaidAmount>"
                +"<bil:ReferenceNumberTransaction>?</bil:ReferenceNumberTransaction>"
                +"<bil:FlagPaymentList>?</bil:FlagPaymentList>"
                +"<bil:CustomerName>?</bil:CustomerName>"
                +"<bil:AdditionalData1>?</bil:AdditionalData1>"
                +"<bil:AdditionalData2>?</bil:AdditionalData2>"
                +"<bil:AdditionalData3>?</bil:AdditionalData3>"
                +"<bil:AdditionalData4>?</bil:AdditionalData4>"
                +"</bil:PaymentRq>"
                +"</bil:CIMB3rdParty_PaymentRq>"
                +"</x:Body>"
    +"</x:Envelope>";

    return value;
    }
}