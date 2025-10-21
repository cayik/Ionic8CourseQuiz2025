import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonList, IonItem, IonLabel, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Data } from 'src/app/services/data';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/services/Question';


@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonInput, IonLabel, IonItem, IonList, IonButtons, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class QuestionPage implements OnInit {

  public data = inject(Data);
  public route = inject(ActivatedRoute);
  public question!: Question;


  constructor() { }

  ngOnInit() {
    let questionId = this.route.snapshot.paramMap.get('id') || '0';
    if(questionId== '0')
      this.question = this.data.getNewQuestion()
    else
      this.question = this.data.getQuestion(questionId) || this.data.getNewQuestion();
    console.log(this.question);
  }

  ionViewWillLeave(){
    if(this.question.id == '0' && this.question.title.trim().length >=2){
      this.data.addQuestion(this.question);
  }
  this.data.save();
  }

setCorrect(answerNumber: number) {
  this.question.correct = answerNumber;
}

}
