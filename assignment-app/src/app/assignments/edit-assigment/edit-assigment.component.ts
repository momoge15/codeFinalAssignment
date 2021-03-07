import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastAnimationSettingsModel, ToastComponent, ToastPositionModel } from '@syncfusion/ej2-angular-notifications';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import {Matiere} from '../matiere.model';

@Component({
  selector: 'app-edit-assigment',
  templateUrl: './edit-assigment.component.html',
  styleUrls: ['./edit-assigment.component.css'],
})
export class EditAssigmentComponent implements OnInit {
  assignment: Assignment;
  // formulaire
  nomassignment: string;
  dateDeRendu: Date;
  titre : String;
  prof : String
  note: String;
  remarque : String;
  etudiant : String;
  message: String;
  matieres : Matiere[];


  public fields: Object = { text: 'matiere', value: 'prof' };
// set the height of the popup element
public height: string = '300px';
// set the placeholder to DropDownList input element
public watermark: string = 'Choisir une matière';


@ViewChild("defaulttoast")
public toastObj: ToastComponent;
public onCreate = (): void => {
  this.toastObj.position=this.position;
  //this.toastObj.show();
};
public position: ToastPositionModel = { X: "Right", Y: "Bottom" };
public showAnimation: ToastAnimationSettingsModel  ={ show: { effect: 'FadeIn', duration: 600, easing: 'linear'},hide: { effect: 'FadeOut', duration: 600, easing: 'linear' }}





  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private assignmentsService: AssignmentsService
  ) {}

  ngOnInit(): void {
    this.assignmentsService.user.login=localStorage.getItem('user')
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);

    this.getAssignment();
    this.getMatieres();

  }

  getAssignment() {
    // 1 récupérer l'id de l'assignment dans l'URL
    let id: number = +this.route.snapshot.params.id;
    console.log('COMPOSANT EDIT ID = ' + id);

    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      //console.log(assignment);
      this.assignment = assignment;
      if (assignment) {
        this.nomassignment = assignment.nom;
        //this.dateDeRendu = assignment.dateDeRendu;
        this.titre = assignment.matiere.titre;
        this.prof =assignment.matiere.prof;
        this.note =assignment.note;
        this.remarque =assignment.remarque;
        this.etudiant =assignment.etudiant;


      }
    });
  }

  getmatiereclique(mat: Matiere){
    this.titre = mat.matiere;
    this.prof = mat.prof;
  }

  getMatieres() {


    this.assignmentsService.getMatieres()
    .subscribe(matiere => this.matieres = matiere);
  }

  onSaveAssignment() {
    if (this.nomassignment.trim()=="") {
      this.assignment.nom = this.nomassignment;
      this.message="Nom de l'assignment obligatoire";
    }


    else if(this.titre.trim()=="")
    {

    }
    else if(this.prof.trim()=="")
    {

    }
    else if(this.etudiant.trim()=="")
    {

      this.message="Nom de l'étudiant obligatoire";
    }



    else if(isNaN(Number(this.note)))
    {
      this.message="La note doit être un valeur numerique";

    }

    else if(Number(this.note)<0 || Number(this.note)>20)
    {
      this.message="La note doit être entre 0 et 20";

    }

    else if(this.remarque.trim()!="" && this.note.trim()=="")
    {

        this.message="Impossible de faire une remarque sans mettre une note";


    }
    else
    {
      if(this.note)
      {
        if(this.assignment.rendu==false)
        {
          this.assignment.rendu=true;
        }
      }
      this.assignment.nom = this.nomassignment;
        this.assignment.matiere.titre = this.titre;
        this.assignment.matiere.prof = this.prof;
        this.assignment.etudiant = this.etudiant;
        this.assignment.note = this.note;
        this.assignment.remarque=this.remarque;


      this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((reponse) => {
        console.log(reponse.message);
        // on navigue vers la page d'accueil
        this.router.navigate(['/home']);

      });
    }


    this.toastObj.show();







  }
}
