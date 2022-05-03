import { Component, OnInit } from '@angular/core';
import {Teams} from "../../../../models/teams.model";
import {WorkersService} from "../../../../services/workers.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ActivatedRoute, Router} from "@angular/router";
import {Data} from "../../../../models/Data.model";
import {DataService} from "../../../../services/Data.service";
import {Checks} from "../../../../models/checks.model";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-data-check',
  templateUrl: './data-check.component.html',
  styles: [
  ]
})
export class DataCheckComponent implements OnInit {

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

  getAllData() {
    this.dataservice.getData().subscribe((data: Data[]) => {
      this.data = data;
      console.log(this.data)
    })
  }
  ngOnInit(): void {
    this.getAllData();

  }
  deleteData(id: number){
    this.dataservice.DeleteData(id).then(() => {
      console.log(" u sure to delete?")
      this.getAllData();

    });
  }

}
