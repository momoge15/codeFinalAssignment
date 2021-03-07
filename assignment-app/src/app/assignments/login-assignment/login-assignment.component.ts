
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../assignments/user.model';
import { AssignmentsService } from '../../shared/assignments.service';

@Component({
  selector: 'app-login-assignment',
  templateUrl: './login-assignment.component.html',
  styleUrls: ['./login-assignment.component.css']
})
export class LoginAssignmentComponent implements OnInit {
  user : User[];

  connecteduser:User= {
    _id : null,
    login : null,
    password : null,
    admin : false,
    }
  userlogin: string='';
  password:string='';
  admin: string='';


  connectedU=null;

  constructor(private route: ActivatedRoute,
    private router: Router, private assignmentsS: AssignmentsService) { }


  ngOnInit(): void {
    this.connecte(localStorage.getItem('user'), localStorage.getItem('password'))


  }

  connecter()
  {
    this.connecte(this.userlogin, this.password)
  }
  connecte(login : string, password : string) {
    this.assignmentsS.getUser(login).subscribe((user) => {

    this.user= user;
    if(user) {
      for(var i = 0; i < user.length; i++) {
        //this.list.push(this.results[i])


        if((user[i].login==login) && (user[i].password==password))
        {
          localStorage.setItem('user', login)
          localStorage.setItem('password', password)
          localStorage.setItem('admin', String (user[i].admin))
          localStorage.setItem('voir', 'true')
          console.log("Usertrouve :"  +this.user[i].login +"  Password : " +this.user[i].password)
          console.log(this.router.url)

          this.router.navigateByUrl('/home');



        }
      }

    }

  });
  }



}
