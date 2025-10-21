import { PreferencesPlugin } from './../../../node_modules/@capacitor/preferences/dist/esm/definitions.d';
import { Question } from './Question';
import { inject, Injectable } from '@angular/core';
import { Quiz } from './Quiz';
import { v4 as uuidv4 } from 'uuid'; //uuidv4 erzeugt eine zufällige id
import { Preferences } from '@capacitor/preferences';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Data {
  
  public currentQuiz: Quiz = {id:"erstesQuiz", 
                quizName: "erstes Quiz", 
                questions: []};

public http = inject(HttpClient);

constructor() { 
  /*this.currentQuiz.questions.push({ //push fügt ein element in ein array ein
    id: "1",
    title: "Was ist 2+2?",
    a1: "1",
    a2: "2",  //um parameter optional zu machen muss man durch ein ? kennzeichnen (z.B. a4?: string)
    a3: "3",
    a4: "4",
    correct: 4
  })*/
  this.load();
}

save(){
  Preferences.set({
    key: 'quizdataLena',
    value: JSON.stringify(this.currentQuiz)
  })
  console.log(this.currentQuiz);
  console.log(JSON.stringify(this.currentQuiz)); //JSON.stringify wandelt ein Objekt in einen String um
}

/*load(){
  Preferences.get({key: 'quizdataLena'}).then(result => {
    if(result.value){
      this.currentQuiz= JSON.parse(result.value);
    }
  });
}*/

async load(){
  const result = await Preferences.get({key: 'quizdataLena'});
  if(result.value){
    this.currentQuiz= JSON.parse(result.value);
    console.log(result.value);
  }
}



getNewQuestion(): Question {
  return {id: '0', title: '', a1: '', a2: '', a3: '', a4: '', correct: 1}

}
getQuestion(questionId:string): Question | undefined {
  //return this.currentQuiz.questions.find((q)=> {return q.id == questionId}); //find gibt das erste element zurück, das die bedingung erfüllt
  return this.currentQuiz.questions.find(q => q.id == questionId);
}

deleteQuestion(q: Question){
  this.currentQuiz.questions = this.currentQuiz.questions.filter(question => question.id !== q.id); //filter gibt alle elemente zurück, die die bedingung erfüllen
  this.save();
}
addQuestion(q:Question){
  q.id = uuidv4();
  this.currentQuiz.questions.push(q);
  this.save();
}

loadQuiz(){
  this.http.get<Quiz>('assets/data.json').subscribe((loadedData: Quiz) => {
   if(loadedData != null){
    if(loadedData.quizName != null){
    //erst daten prüfen
    console.log(loadedData);
    console.log("Quiz vom Server geladen");
    //daten speichern
    this.currentQuiz = loadedData;
    //this.save();
    }
   }
  });
}
}
