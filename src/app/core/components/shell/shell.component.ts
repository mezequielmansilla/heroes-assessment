import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  @Input()
  appName: string;

  constructor() { }

  ngOnInit(): void {
  }

}
