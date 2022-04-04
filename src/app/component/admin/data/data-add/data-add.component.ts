import { Component, OnInit } from '@angular/core';
import {WorkersService} from "../../../../services/workers.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Data} from "../../../../models/Data.model";
import {DataService} from "../../../../services/Data.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-data-add',
  templateUrl: './data-add.component.html',
  styles: [
  ]
})
export class DataAddComponent implements OnInit {

  createForm;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              public dataservice: DataService) {
    this.createForm =this.formBuilder.group({
      month: ['', Validators.required],
      leonI_Part: ['', Validators.required],
      part_Request: ['', Validators.required],
      contexxt: ['', Validators.required],
      supplier: ['', Validators.required],
      fors_Material_Group: ['', Validators.required],
      leonI_Part_Classification: ['', Validators.required]

    });
  }

  ngOnInit(): void {

  }
  onSubmit(formData : any){
    this.dataservice.AddData(formData.value).subscribe(res =>{
      this.router.navigateByUrl('data/list')
    })
  }

}
