import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../node_modules/@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  projectForm: FormGroup;
  statusValues: string[] = ['Stable', 'Critical', 'Finished'];

  ngOnInit(){
    this.projectForm = new FormGroup({
    'name' : new FormControl(null, [Validators.required],[this.forbiddenNames]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl('Stable')
    });
  }
  
  onSubmit(){
    console.log(
      `Project name: ${this.projectForm.get('name').value} 
       Email: ${this.projectForm.get('email').value} 
       Status: ${this.projectForm.get('status').value} 
      `
    );
  }

  forbiddenNames(control: FormControl):Promise<any>|Observable<any>{
    return new Promise(
      (resolve, error) => {
        setTimeout(() => {
          if(control.value && control.value.toLowerCase() === 'test'){
            resolve({'forbiddenName':true});
          }
          else{
            resolve(null);
          }
        }, 2000);
       
      }
    );
   
  }
  
}
