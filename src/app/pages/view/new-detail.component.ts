import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-detail',
  templateUrl: './new-detail.component.html',
  styleUrls: ['./new-detail.component.css']
})
export class NewDetailComponent implements OnInit {

  @Input() detail: any;
  constructor() { }

  ngOnInit(): void {
  }

}
