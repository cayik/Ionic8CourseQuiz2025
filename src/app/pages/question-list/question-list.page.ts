import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel, IonItem, IonButtons, IonBackButton, IonButton, IonIcon, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/angular/standalone';
import { Data } from 'src/app/services/data';
import { Question } from 'src/app/services/Question';
import { Router } from '@angular/router';


@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.page.html',
  styleUrls: ['./question-list.page.scss'],
  standalone: true,
  imports: [IonItemOption, IonItemOptions, IonIcon, IonButton, IonButtons, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonBackButton, IonItemSliding]
})
export class QuestionListPage implements OnInit {
  public data = inject(Data);
  private router = inject(Router);
  constructor() { }

  ngOnInit() {
  }

  show(qid: string){
    this.router.navigate(["/question", qid]);
  }

  deleteQuestion(q: Question){
    this.data.deleteQuestion(q);
  }

}
