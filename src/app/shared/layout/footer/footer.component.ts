import { Component, Input, OnInit } from '@angular/core';
import { Test } from 'src/app/models/test-type';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  @Input() posts: Test[] = [];
  constructor() {}

  ngOnInit(): void {}
}
