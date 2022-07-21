import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'la-forge-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {

  @Output() public closeSidebar: EventEmitter<null> = new EventEmitter();
  @Input() public sidebarOpen = false;
  sidebarExpanded = false;
  // constructor() {}

  ngOnInit(): void {
    console.log();

  }
}
