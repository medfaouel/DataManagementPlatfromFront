import { Component, OnInit } from '@angular/core';
import {Constants} from "../../../Helper/constants";
import {User} from "../../../models/AppUsers.model";
import {ChecksService} from "../../../services/checks.service";
import {Checks} from "../../../models/checks.model";
import {DataService} from "../../../services/Data.service";
import {Data} from "../../../models/Data.model";
import {ChecksDetails} from "../../../models/checksDetails.model";
import {Chart} from "chart.js"
import {TeamsService} from "../../../services/Teams.service";
import {Teams} from "../../../models/teams.model";
import { map } from 'rxjs/operators';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {
  UserRole: any;
  dashboardDetails:any[]=[];
  ListOfChecksPassed=[]
  ListOfConflictedCheckDetails=[]
  user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
  checks: Checks[];
  checkDetails: ChecksDetails[];
  data:Data[];
  ChecksLength: number;
  PassedChecksLength: number;
  percentage: number;
  dataLength: number;
  NumberOfConflictedCheckDetails: number;
  teams: Teams[];
  ListOfTeams= [];
  ListOfChecksByTeam= [];

  constructor(private router: Router, private teamService: TeamsService, private dataService:DataService,private checkservice:ChecksService) { }
  IsUserLogin() {
    Constants.IsUserLogin();
  }
  getAllTeams() {
    this.teamService.getTeams().subscribe((data: Teams[]) => {
      this.teams = data;
      console.log("this teams",this.teams)
      for (let i = 0; i < this.teams.length; i++) {
        this.ListOfTeams.push(Object.values(this.teams)[i].teamName)
      }
      console.log("listofteams",this.ListOfTeams)
    })
    console.log("this.checkslength",this.ChecksLength)


  }

  ngOnInit(): void {
    this.getAllCheckDetails()
    this.getAllChecks()
    this.getDashboardTeamDetails()
    this.getAllData()
    this.getAllTeams()

  }
  checkIfPassed(){
    for (let i = 0; i < this.ChecksLength; i++) {
      console.log(Object.values(Object.values(this.checks))[i].status)
      if (Object.values(Object.values(this.checks))[i].status == 'Passed') {
        this.ListOfChecksPassed.push(Object.values(Object.values(this.checks))[i])
        console.log("ListOfChecksPassed",this.ListOfChecksPassed)

      }
    }
    this.PassedChecksLength=this.ListOfChecksPassed.length
    this.percentage=Math.floor((this.PassedChecksLength/this.ChecksLength)*100)
    const percentag=document.getElementById('percentage')
    if(percentag !=null){
      console.log("works")
      percentag.style.width= String(this.percentage)+'%'
    }


  }
  getAllChecks() {
    this.checkservice.getChecks().subscribe((data: Checks[]) => {
      this.checks = data;
      console.log("this checks",this.checks)
      this.ChecksLength=data.length
      this.checkIfPassed()

    })}
  getDashboardTeamDetails() {
    this.checkservice.DashboardTeamDetails().subscribe((data: any[]) => {
      this.dashboardDetails = Object.entries(data);
      console.log("dashboard",this.dashboardDetails)

      const myChart = new Chart("myChart", {
        type: 'bar',
        data: {
          labels: this.dashboardDetails.map(x=>x[0]),
          datasets: [{
            label: 'Total Checked Parts',
            data: this.dashboardDetails.map(x=>x[1].length),
            backgroundColor: "#00008B",
            borderWidth: 1
          },
            {
              label: 'Passed Parts',
              data: this.dashboardDetails.map(x=>{
                console.log(x)
                let y=0;
                for (let i = 0; i < x[1].length; i++) {
                  if (x[1][i]=='Passed'){
                    y++
                  }
                }
                return y;

              }),
              backgroundColor: "#228B22",

              borderWidth: 1
            },{
              label: 'Not Passed Parts',
              data: this.dashboardDetails.map(x=>{
                let y=0;
                for (let i = 0; i < x[1].length; i++) {
                  if (x[1][i]!=='Passed'){
                    y++
                  }
                }
                return y;

              }),
              backgroundColor: "#8B0000",

              borderWidth: 1
            },]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    })}

  getAllData() {
    this.dataService.getData().subscribe((data: Data[]) => {
      this.data = data;
      console.log("this data",this.data)
      this.dataLength=data.length

    })}
  getAllCheckDetails() {
    this.checkservice.getAllChecksDetails().subscribe((data: ChecksDetails[]) => {
      this.checkDetails = data;
      console.log("this checkdetails dashboard",this.checkDetails)
      this.SearchingConflictedCheckDetails()

    })}
  SearchingConflictedCheckDetails(){
    for (let i = 0; i < this.checkDetails.length; i++) {
      if ((Object.values(Object.values(this.checkDetails))[i].cdqM_feedback !== 'Need to be filled') &&
        (Object.values(Object.values(this.checkDetails))[i].dqmS_feedback !== 'Need to be filled' ) &&
        (Object.values(Object.values(this.checkDetails))[i].topicOwner_feedback == 'Need to be filled' ) ||
        (Object.values(Object.values(this.checkDetails))[i].topicOwner_feedback !== 'Need to be filled' ))
      {
        this.ListOfConflictedCheckDetails.push(Object.values(Object.values(this.checkDetails))[i])
        this.NumberOfConflictedCheckDetails=this.ListOfConflictedCheckDetails.length

      }
    }
  }

  getUserItem(){
    const user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
    console.log("USER INFO",user);
    console.log("trying user team id",user.team.teamId)
    this.UserRole=Object.values(user)[7];
  }

  onLogout() {
    Constants.onLogout();
    console.log("test")
    this.router.navigateByUrl('/Login')
  }
}
