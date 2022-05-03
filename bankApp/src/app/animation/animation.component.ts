import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css'],
  animations: [
    trigger('openclose', [
      state('open', style({
        height: '500px',
        width:'500px',
        backgroundColor: 'aqua'
      })),
      state('close', style({
        height: '300px',
        width:'0px',
        backgroundColor: 'green'
      })),
      transition('open=>close', [
        animate('3s')
      ]),
      transition('close=>open', [
        animate('2s')
      ]),
    ])
  ]
})
export class AnimationComponent implements OnInit {

  isopen = true

  constructor() { }

  ngOnInit(): void {
  }


  toggle() {
    this.isopen = !this.isopen
  }

}
