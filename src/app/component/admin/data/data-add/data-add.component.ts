import { Component, OnInit } from '@angular/core';
import {WorkersService} from "../../../../services/workers.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Data} from "../../../../models/Data.model";
import {DataService} from "../../../../services/Data.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Env} from "../../../../models/env.model";
import {Checks} from "../../../../models/checks.model";
import {Constants} from "../../../../Helper/constants";
import {User} from "../../../../models/AppUsers.model";

@Component({
  selector: 'app-data-add',
  templateUrl: './data-add.component.html',
  styles: [
  ]
})
export class DataAddComponent implements OnInit {
  user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
  check:Checks[]=[];
  data:Data[]=[];
  createForm;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              public dataservice: DataService) {
    this.createForm =this.formBuilder.group({
      month: ['', ],
      leonI_Part: ['', ],
      part_Request: ['', ],
      context: ['', ],
      supplier: ['', ],
      fors_Material_Group: ['', ],
      leonI_Part_Classification: ['', ],
      check:['', ]

    });
  }
  IsUserLogin() {
    Constants.IsUserLogin();
  }
  getCheck(){
    this.dataservice.getCheck().subscribe((data: Checks[]) => {
      this.check = data;
    })
  }
  getData(){
    this.dataservice.getData().subscribe((data: Data[]) => {
      this.data = data;
    })
  }

  ngOnInit(): void {
    this.getData();
    this.getCheck();
    console.log("data",this.data)

  }
  onSubmit(formData : any){
    const DataToSave = {...formData.value,teamid:this.user.team.teamId}
    console.log(DataToSave);
    this.dataservice.AddData(DataToSave).subscribe(res =>{
      this.router.navigateByUrl('data/list')
    })
  }

  onLogout() {
    Constants.onLogout();
    console.log("test")
    this.router.navigateByUrl('/Login')
  }
}
