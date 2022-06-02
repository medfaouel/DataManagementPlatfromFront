import { Component, OnInit } from '@angular/core';
import {Checks} from "../../../../models/checks.model";
import {Data} from "../../../../models/Data.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {DataService} from "../../../../services/Data.service";

@Component({
  selector: 'app-data-edit',
  templateUrl: './data-edit.component.html',
  styles: [
  ]
})
export class DataEditComponent implements OnInit {
  check:Checks[]=[];
  data:Data;
  editForm;
  id: number;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              public dataservice: DataService) {
    this.editForm =this.formBuilder.group({
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
  getCheck(){
    this.dataservice.getCheck().subscribe((data: Checks[]) => {
      this.check = data;
    })
  }


  ngOnInit(): void {
    this.getCheck();
    this.id = this.route.snapshot.params['id'];
    this.dataservice.getDataById(this.id).subscribe((data: Data) => {
      this.data = data;
      this.editForm.patchValue(data);
      console.log(" ng on init",this.data);
    });

  }
  onSubmit(formData : any){
    const DataToSave = {...formData.value}
    console.log(DataToSave);
    this.dataservice.UpdateData(this.id,DataToSave).subscribe(res =>{
      this.router.navigateByUrl('data/list')
    })
  }

}
