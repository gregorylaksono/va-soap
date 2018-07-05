import { VirtualAccount } from './../../model/VirtualAccount';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { RemoteService } from '../../service/remote.service';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { UtilService } from '../../service/UtilService';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  
  vaNo: string;

  constructor(private http: HttpClient, private router: Router,
    private remoteService: RemoteService, private ngxXml2jsonService: NgxXml2jsonService,
    private utilService: UtilService) { }

  ngOnInit() {
  }

  query(): void {
    this.remoteService.query(this.vaNo).subscribe( res => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(res, 'text/xml');
      this.utilService.parseQuery(this.vaNo, xml);
      
    });

    this.router.navigateByUrl('query');
  }

  echo(): void {

    this.remoteService.echo('Greg').subscribe(res => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(res, 'text/xml');
      const obj = this.ngxXml2jsonService.xmlToJson(xml);
      console.log(xml.children[0].children[1].children[0].children[0].textContent);

    });


  }

}
