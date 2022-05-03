import { Component, Input, OnInit, Output ,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delect',
  templateUrl: './delect.component.html',
  styleUrls: ['./delect.component.css']
})
export class DelectComponent implements OnInit {

  @Input() item: string | undefined

  @Output() onCancel = new EventEmitter

  @Output() onDelete = new EventEmitter

  constructor() { }

  ngOnInit(): void {

  }

  cancel(){
    this.onCancel.emit()
  }

  delete(){
    this.onDelete.emit(this.item)
  }


}
