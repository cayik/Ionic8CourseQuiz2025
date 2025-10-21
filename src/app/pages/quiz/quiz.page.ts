import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonButtons, IonBackButton, IonButton, IonChip, IonLabel,
  ToastController, AlertController, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText } from '@ionic/angular/standalone';

import { Data } from 'src/app/services/data';
import { Question } from 'src/app/services/Question';
import { Router } from '@angular/router';

type AnyQuestion = Question & { titel?: string };

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  standalone: true,
  imports: [IonText, IonCardContent, IonCardTitle, IonCardHeader, IonCard, 
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButtons, IonBackButton, IonButton, IonChip, IonLabel,
    CommonModule, FormsModule
  ]
})
export class QuizPage implements OnInit {
  private data = inject(Data);
  private toastCtrl = inject(ToastController);
  private alertCtrl = inject(AlertController);
  private router = inject(Router);

  // Arbeitskopie (gemischt)
  mixarray: AnyQuestion[] = [];

  pointer = 0;
  currentElement: AnyQuestion | null = null;
  score = 0;

  ngOnInit() {
    // 1) Erst lokal gespeicherte Daten lesen
    let list = this.readQuestionsFromService();

    // 2) Falls leer: JSON aus assets nachladen
    if (!list.length) {
      this.data.loadQuiz(); // asynchron
      // nach kurzem Delay erneut versuchen (einfach & robust mit deinem aktuellen Service)
      setTimeout(() => {
        list = this.readQuestionsFromService();
        this.setupFrom(list);
      }, 300);
    } else {
      this.setupFrom(list);
    }
  }

  private setupFrom(list: AnyQuestion[]) {
    // Arbeitskopie bauen (Original NICHT verändern)
    this.mixarray = [];
    for (const q of list) this.mixarray.push(this.normalize(q));

    // Mischen nach Professor-Pseudocode (2 Zufallsindizes tauschen)
    this.swapShuffle(this.mixarray, 1000);

    // Pointer + aktuelles Element
    this.pointer = 0;
    this.currentElement = this.mixarray[this.pointer] ?? null;
    this.score = 0;
  }

  private readQuestionsFromService(): AnyQuestion[] {
    // WICHTIG: Deine Daten liegen hier:
    const list = this.data.currentQuiz?.questions ?? [];
    return Array.isArray(list) ? (list as AnyQuestion[]) : [];
  }

  // Akzeptiert sowohl "title" als auch "titel" aus deinem JSON
  private normalize(q: AnyQuestion): AnyQuestion {
    if (!q.title && q.titel) {
      (q as any).title = q.titel;
    }
    return q;
  }

  private swapShuffle<T>(arr: T[], swaps = 1000) {
    const n = arr.length;
    if (n < 2) return;
    for (let i = 0; i < swaps; i++) {
      const z1 = Math.floor(Math.random() * n);
      const z2 = Math.floor(Math.random() * n);
      if (z1 !== z2) {
        const x = arr[z2];
        arr[z2] = arr[z1];
        arr[z1] = x;
      }
    }
  }

  async answer(choiceIndex: number) {
    if (!this.currentElement) return;

    // Dein JSON nutzt 1-basierten Index in "correct"
    const correctIdx0 = (this.currentElement.correct ?? 1) - 1;
    const isCorrect = choiceIndex === correctIdx0;
    if (isCorrect) this.score++;

  const toast = await this.toastCtrl.create({
    message: isCorrect ? 'Richtig! +1 Punkt' : 'Leider falsch',
    duration: 1200,
    position: 'bottom',
    cssClass: isCorrect ? 'toast-correct' : 'toast-wrong'
  });
  await toast.present();


    this.pointer++;

    if (this.pointer >= this.mixarray.length) {
      const alert = await this.alertCtrl.create({
        header: 'Quiz beendet',
        message: `Dein Score: ${this.score} / ${this.mixarray.length}`,
        buttons: ['OK'], backdropDismiss: false
      });
      await alert.present();
      await alert.onDidDismiss();
      this.router.navigateByUrl('/'); // zurück zur Startseite
      return;
    }

    this.currentElement = this.mixarray[this.pointer];
  }
}
