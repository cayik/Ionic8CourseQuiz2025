import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { Data } from 'src/app/services/data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {

  public data = inject(Data); //unterschied injection und new Klasse: injection = singleton (eine instanz für die ganze app), new = neue instanz für jede klasse
  public router= inject(Router);
  constructor() {}

  public showList(){
    this.router.navigate(["/question-list"]);
  }

  public showQuiz(){
    this.router.navigate(["/quiz"]);
  }

  public loadQuiz(){
    this.data.loadQuiz();
  }
}
