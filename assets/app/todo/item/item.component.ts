import {Component, OnInit, Input} from '@angular/core';
import { Todo } from '../../shared/models/todo';
@Component({
  selector: 'item',
  templateUrl: '/item.component.html',
  styleUrls: ['/item.component.css']
})
export class ItemComponent implements OnInit{
  @Input()
  todos:Todo[]=[];
  constructor(){}
  ngOnInit(){

  }
}
