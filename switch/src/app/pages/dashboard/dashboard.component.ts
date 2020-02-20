import { Component, OnInit } from '@angular/core';
import { EstateService } from 'src/app/core/estate.service';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/authentication.service';
import { Estate } from 'src/app/shared/models/estate.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loading = false;
  error: string;
  result: string;
  user: any;

  constructor(public estateService: EstateService,  private afs: AngularFirestore, private afAuth: AngularFireAuth) {
   
   }

  ngOnInit() {
    this.user = this.afAuth.auth.currentUser;
  }

  async onSubmit(form: NgForm) {
    let id = this.afs.createId();
    this.loading = true;
    this.error = null;
    this.result = null;
    const { title, cost, estateImage, bedrooms, bathrooms, pets, squareMeters } = form.value;

    const estate: Estate = {
      key: id,
      title,
      cost,
      estateImage,
      bedrooms,
      bathrooms,
      pets,
      squareMeters,
      uploadedBy: 'test' ,
      uploadedByName: 'test2',
      uploadedByImage: 'test3',
    };
    this.estateService.createEstate(estate);
    form.reset();
  }

}
