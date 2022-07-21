import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'la-forge-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  ngOnInit(): void {
    console.log('LoaderComponent');
  }
}
