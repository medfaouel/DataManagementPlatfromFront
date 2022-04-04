import { Component, OnInit } from '@angular/core';
import {WorkersService} from "../../../../services/workers.service";
import {ActivatedRoute, Router} from "@angular/router";
import {workers} from "../../../../models/workers.model";

@Component({
  selector: 'app-workers-profil',
  templateUrl: './workers-profil.component.html',
  styles: [
  ]
})
export class WorkersProfilComponent implements OnInit {
  id: number;
  worker: workers;
  constructor(public workersService: WorkersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.workersService.getWorkerById(this.id).subscribe((data: workers) => {
      this.worker = data;
    });
  }

}
