import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'la-forge-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('300ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('300ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class DefaultLayoutComponent implements OnInit {

  // constructor() { }
  public loading = false;
  public sidebarOpen = false;
  ngOnInit(): void {
    console.log();
  }


  constructor(private router: Router) {
    // this.router.events.pipe(
    // ).subscribe((event) => {
    //   switch (true) {
    //     case event instanceof NavigationStart: {
    //       this.loading = true;
    //       break;
    //     }

    //     case event instanceof NavigationEnd:
    //     case event instanceof NavigationCancel:
    //     case event instanceof NavigationError: {
    //       setTimeout(() => {
    //         this.loading = false;
    //       }, 1000);
    //       break;
    //     }
    //     default: {
    //       break;
    //     }
    //   }
    // });
  }

}
