import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { Matiere } from '../matiere.model';
import {ViewEncapsulation } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ToastComponent, ToastAnimationSettingsModel, ToastPositionModel } from '@syncfusion/ej2-angular-notifications';
import { ButtonComponent } from "@syncfusion/ej2-angular-buttons";

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddAssignmentComponent implements OnInit {
  // pour le formulaire
  nomDevoir = "";
  dateDeRendu: Date = null;
  titre ="";
  prof ="";
  note ="";
  remarque ="";
  etudiant ="";
  message="";
  matieres : Matiere[];
  newAssignment : Assignment= {
    id: null,
  nom: null,
  dateDeRendu: null,
  rendu: false,
  etudiant: null,
  matiere : {titre:"", prof: ""},
  note : "",
  remarque : "",

  };
  @ViewChild("defaulttoast")
  public toastObj: ToastComponent;

  public onCreate = (): void => {
    this.toastObj.position=this.position;
    //this.toastObj.show();
  };
  public position: ToastPositionModel = { X: "Right", Y: "Bottom" };
  public showAnimation: ToastAnimationSettingsModel  ={ show: { effect: 'FadeIn', duration: 600, easing: 'linear'},hide: { effect: 'FadeOut', duration: 600, easing: 'linear' }}



// maps the appropriate column to fields property
public fields: Object = { text: 'matiere', value: 'prof' };
// set the height of the popup element
public height: string = '300px';
// set the placeholder to DropDownList input element
public watermark: string = 'Choisir une matière';

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.assignmentsService.user.login=localStorage.getItem('user')
    this.getMatieres();


    //this.router.navigate(['/login']);
  }

  onSubmit(event) {
    // evite la soumission standard du formulaire, qui génère un warning
    // dans la console...
    event.preventDefault();
    if(!this.nomDevoir)
    {
      this.message="Nom du devoir obligatoire";

    }
    else if(!this.etudiant)
    {
      this.message="Nom de l'étudiant obligatoire";

    }
    else if(!this.titre)
    {
      this.message="Matière obligatoire";

    }


    else if(isNaN(Number(this.note)))
      {
        this.message="La note doit être une valeur numerique";

      }
    else if((Number(this.note)<0) || (Number(this.note)>20))
    {
      this.message="La note est compris entre 0 et 20";

    }

    else if(this.remarque.trim()!="" && this.note.trim()=="")
    {

        this.message="Impossible de faire une remarque sans mettre une note";


    }
    else
    {


      this.InsertAssignment();


    }



    this.toastObj.show();




  }
  InsertAssignment()
  {
    console.log(
      'Dans submit nom = ' + this.nomDevoir + ' date = ' + this.dateDeRendu
    );

    newAssignment : Assignment;
    this.newAssignment.id = Math.floor(Math.random() * 1000000);
    this.newAssignment.nom = this.nomDevoir;
    this.newAssignment.dateDeRendu = new Date();
    this.newAssignment.rendu = false;
    this.newAssignment.etudiant=this.etudiant;
    this.newAssignment.note = this.note;
    this.newAssignment.remarque = this.remarque;

    this.newAssignment.matiere.prof=this.prof;
    this.newAssignment.matiere.titre=this.titre;
    if(this.note.trim()!="")
    {
      this.newAssignment.rendu=true;
    }



    // on va utiliser directement le service
    this.assignmentsService
      .addAssignment(this.newAssignment)
      .subscribe((reponse) => {
        console.log(reponse.message);

        // il va falloir naviguer de nouveau vers la page d'accueil
        // on va devoir faire l'équivalent du routerLink="/home" mais
        // par programme...
        // on retourne à la page d'accueil
        //this.router.navigate(['/home']);

      });
      this.message="Record done with success";
      this.toastObj.show();
      setTimeout(() => {
        if(this.router.url=="/home")
        {
          this.router.navigate(['/home/list']);
        }
        else
        {
          this.router.navigate(['/home'])
        }


    }, 1);


  }

  getMatieres() {


    this.assignmentsService.getMatieres()
    .subscribe(matiere => this.matieres = matiere);
  }

  getmatiereclique(mat: Matiere){
  this.titre = mat.matiere;
  this.prof = mat.prof;

  }
}
