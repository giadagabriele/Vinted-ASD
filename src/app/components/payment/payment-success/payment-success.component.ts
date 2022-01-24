import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PayPalConfirmPaymentRequest } from '@app/models/payment/paypal/PayPalConfirmPaymentRequest';
import { PayPalConfirmPaymentResponse } from '@app/models/payment/paypal/payPalConfirmPaymentResponse';
import { PaymentService } from '@app/services/payment/payment.service';

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {

  @ViewChild('pdfTable') pdfTable: ElementRef;
  
  constructor(private paymentService: PaymentService) { }

  request: PayPalConfirmPaymentRequest = new PayPalConfirmPaymentRequest();
  paymentResponse: PayPalConfirmPaymentResponse;
  ngOnInit() {

    if (document.URL.indexOf('?')){
      const splitUrl = document.URL.split('?');
      const splitParams = splitUrl[1].split('&');
      let i: any;
      for (i in splitParams){
        const singleURLParam = splitParams[i].split('=');
        if (singleURLParam[0]==='paymentId'){
          this.request.paymentId = singleURLParam[1].trim();
        }
        if (singleURLParam[0]==='PayerID'){
          this.request.payerId = singleURLParam[1].trim();
        }
      }
    }
    // call to successPayment service
    this.paymentService.confirmPayment(this.request)
      .subscribe((response: PayPalConfirmPaymentResponse)=>{
        if (response.status==='approved'){
          this.paymentResponse = response;
          console.log(response);
          window.close();
          // location.replace('http://localhost:4200')

        }
    });

  }

  public ExportAsPDF() {
    const doc = new jsPDF();
    //get table html
    const pdfTable = this.pdfTable.nativeElement;
    //html to pdf format
    var html = htmlToPdfmake(pdfTable.innerHTML);
   
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
  }

}
