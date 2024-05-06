import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/models/test-type';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  posts: Test[] = [];
  constructor(private _testService: TestService) {}

  ngOnInit(): void {
    this._testService.getTests().subscribe((data: Test[]) => {
      this.posts = data.splice(1, 3);
    });
  }
}
