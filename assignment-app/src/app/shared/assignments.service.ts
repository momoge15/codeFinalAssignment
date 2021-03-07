import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { User } from '../assignments/user.model';
import { Matiere } from '../assignments/matiere.model';
import { forkJoin, Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { bdInitialAssignments } from './data';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {


voir : boolean = false;

  user: User =
    {
      login:null,
      password:null,
      admin: false

    };

    users: User[] =[{
      login: null,
      password: null ,
      admin : false
    },
  ];


  constructor(
    private loggingService: LoggingService,
    private router: Router,
    private http: HttpClient
  ) {}

  url = 'https://apimbds2021.herokuapp.com/api/assignments';
  url1 = 'http://localhost:8010/api/assignmentss';
  urll = 'http://localhost:8010/api/users';
  urlll = 'http://localhost:8010/api/matieres';
/*
  url = 'https://angularapiesatic.herokuapp.com/api/assignments';
  url1 = 'https://angularapiesatic.herokuapp.com/api/assignmentss';
  urll = 'https://angularapiesatic.herokuapp.com/api/users';
  urlll = 'https://angularapiesatic.herokuapp.com/api/matieres'; */

  getAssignments(): Observable<Assignment[]> {
    console.log('Dans getAssignments dans le service...');
    this.loggingService.log('tous les assignments', 'ont été recherchés');

    // return of(this.assignments);

    return this.http.get<Assignment[]>(this.url);
  }

  getMatieres(): Observable<Matiere[]> {

    return this.http.get<Matiere[]>(this.urlll);

  }

  getAssigmentss(): Observable<Assignment[]> {


    return this.http.get<Assignment[]>(this.url1);

  }


  getAssignmentsPagine(
    nextPage: Number = 1,
    limit: Number = 10
  ): Observable<Object> {
    let urlPagination = this.url + `?page=${nextPage}&limit=${limit}`;

    console.log('Requête paginée envoyée : ' + urlPagination);
    return this.http.get<Object>(urlPagination);
  }

  getAssignment(id: number): Observable<Assignment> {
    console.log('Dans getAssignment dans le service id=' + id);
    this.loggingService.log('Assignment id=' + id, 'a été recherché');


    //return of(this.assignments.find((a) => a.id === id));
    return this.http.get<Assignment>(this.url + '/' + id);

  }



  getUser(login: string): Observable<User[]> {
    console.log('Dans getUser dans le service login=' + login);
    this.loggingService.log('User login=' + login, 'a été recherché');
    return this.http.get<User[]>(this.urll + '/' + login);

  }
  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }

  addAssignment(assignment: Assignment): Observable<any> {
    // this.assignments.push(assignment);
    this.loggingService.log(assignment.nom, 'a été ajouté');

    return this.http.post(this.url, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {

    this.loggingService.log(assignment.nom, 'a été mis à jour');

    return this.http.put(this.url, assignment);
  }

  deleteAssignment(assignment: Assignment): Observable<any> {

    this.loggingService.log(assignment.nom, 'a été supprimé');

    return this.http.delete(this.url + '/' + assignment._id);
  }

  peuplerBase() {
    // ici on va générer 500 assignments et les ajouter dans la base
    bdInitialAssignments.forEach((a) => {
      let newAssignment = new Assignment();
      newAssignment.id = a.id;
      newAssignment.nom = a.nom;
      newAssignment.dateDeRendu = new Date(a.dateDeRendu);
      newAssignment.rendu = a.rendu;

      this.addAssignment(newAssignment).subscribe((reponse) => {
        console.log('Assignment ' + reponse.message);
      });
    });
  }

  // autre version qui permet de récupérer un subscribe une fois que tous les inserts
  // ont été effectués
  peuplerBDJoin(): Observable<any> {
    const calls = [];

    bdInitialAssignments.forEach((a) => {
      const new_assignment = new Assignment();

      new_assignment.id = a.id;
      new_assignment.nom = a.nom;
      new_assignment.dateDeRendu = new Date(a.dateDeRendu);
      new_assignment.rendu = false;

      calls.push(this.addAssignment(new_assignment));
    });
    return forkJoin(calls); // renvoie un seul Observable pour dire que c'est fini
  }
}
