import { Component, Input, OnInit } from '@angular/core';
import { Test } from 'src/app/models/test-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() posts: Test[] = [];
  constructor() {}

  ngOnInit(): void {}
}
