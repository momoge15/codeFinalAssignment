import { Component, ViewChild,AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
  import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';
import { User } from './assignments/user.model';
import { LoginAssignmentComponent } from './assignments/login-assignment/login-assignment.component';
import { ThrowStmt } from '@angular/compiler';
import { Subscription, Observable, timer, interval } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})




export class AppComponent {
  @ViewChild(LoginAssignmentComponent) loginA;
  titre = 'Assignments';//info pour l'authentification
  voir = this.assignmentsService.voir;
  connecteduser:User= {
  _id : null,
  login : null,
  password : null,
  admin : false,
  }
  user: User[];




  private updateSubscription: Subscription;
  constructor(

    private authService: AuthService,
    private router: Router,
    public assignmentsService: AssignmentsService
  ) {}

  ngOnInit(): void {



    this.assignmentsService.user.login=localStorage.getItem('user')
    this.connecte(localStorage.getItem('user'), localStorage.getItem('password'))

    this.updateSubscription = interval(1000).subscribe(
      (val) => {try
                {
                  this.connecte(localStorage.getItem('user'), localStorage.getItem('password'))
                  this.voir = Boolean (localStorage.getItem('voir'));
                  if(localStorage.getItem('admin')=="true")
                  {
                    this.login()

                  }
                  else
                  {
                    this.logout();
                  }

                }
                catch(e)
                {

                }
              }
      );





  }
  deconnecter()
  {
    localStorage.removeItem('user');
    localStorage.removeItem('password');
    localStorage.removeItem('admin');
    localStorage.removeItem('voir')
    this.assignmentsService.user.login='';
    this.router.navigateByUrl('/login');

  }



  login() {

      this.authService.logIn();

  }
  logout()
  {
    this.authService.logOut();
  }

  recevoirInfo($event) {
    this.connecteduser=$event;
  }

  peuplerLaBase() {
    // on appelle une méthode dans le service assignments
    this.assignmentsService.peuplerBase();

    /*
    // ici si on ne veut qu'une seule notification quand c'est fini
    this.assignmentsService.peuplerBDJoin()
      .subscribe(() => {
        console.log("Toute la BD a été peuplée");
      });
      */
  }


  connecte(login : string, password : string) {
    this.assignmentsService.getUser(login).subscribe((user) => {

    this.user= user;
    if(user.length>0) {
      for(var i = 0; i < user.length; i++) {
        //this.list.push(this.results[i])


        if((user[i].login==login) && (user[i].password==password))
        {
          localStorage.setItem('user', login)
          localStorage.setItem('password', password)
          localStorage.setItem('voir', 'true')
          console.log("Usertrouve :"  +this.user[i].login +"  Password : " +this.user[i].password)
          console.log()
          if(this.router.url=="/login")
          {
            this.router.navigateByUrl('/home');
          }

        }
        else
        {
          this.router.navigate(['/login']);
        }
      }


    }
    else {
      this.router.navigate(['/login']);

    }

  });
  }
}
