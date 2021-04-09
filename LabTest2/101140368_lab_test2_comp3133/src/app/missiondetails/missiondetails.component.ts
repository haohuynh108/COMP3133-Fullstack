import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router'
import { ApiService } from '../api.service';

@Component({
  selector: 'app-missiondetails',
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css']
})
export class MissiondetailsComponent implements OnInit {

  missions;
  number;
  constructor(private route: ActivatedRoute , private apiServer: ApiService) {
    this.route.params.subscribe(data =>{
      this.number = parseInt(data.id);
    })
   }

  ngOnInit(): void {
    this.apiServer.getID(this.number).subscribe((data: any) => {
      this.missions = data;
    });
  }

}
