import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-missionlist',
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css']
})
export class MissionlistComponent implements OnInit {

  constructor(private apiService:ApiService) { }
  missions;
  
  ngOnInit(): void {
    this.apiService.getAll().subscribe((data)=>{
      this.missions = data;
      console.log(this.missions)
    })
  }

}
