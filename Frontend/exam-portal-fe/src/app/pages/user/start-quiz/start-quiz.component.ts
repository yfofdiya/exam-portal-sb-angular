import { LocationStrategy } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  constructor(
    private _loc: LocationStrategy,
    private _route: ActivatedRoute,
    private _questionService: QuestionService,
    private _snack: MatSnackBar,
    private _loginService: LoginService,
    private _userService: UserService
  ) { }

  qid: any;

  questions: any;

  quiz: any;

  isConfirmed: any;

  marksGot = 0;
  correct = 0;
  wrong = 0;
  attempted = 0;

  marksForEachQuestion = 0;

  isSubmitted = false;

  timer: any;

  user: any;

  ngOnInit(): void {
    this.preventBackButton();

    this.qid = this._route.snapshot.params['qid'];

    this._questionService.getRandomQuestionsByQuizId(this.qid).subscribe(
      (data: any) => {
        this.questions = data;
        
        this.timer = this.questions.length * 60; // In minute
        this.startTimer();
        // Client Side Validation Starts
        // this.questions.forEach((q: any) => {
        //   q.selectedAnswer = '';
        // });
        // Client Side Validation Ends
      },
      (error) => {
        this._snack.open("Something went wrong while fetching questions for quiz id " + this.qid, 'ok', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    );

    this.user = this._loginService.getUserDetails();
  }

  preventBackButton() {
    history.pushState(null, "null", location.href);
    this._loc.onPopState(() => {
      history.pushState(null, "null", location.href);
    });
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  @HostListener('contextmenu', ['$event'])
  disableRightClick(event: MouseEvent): void {
    event.preventDefault();
  }

  public submitQuiz() {
    this.isConfirmed = window.confirm('Do you want to submit a quiz?');
    if (this.isConfirmed) {
      this.evalQuiz();
    }
  }

  evalQuiz() {
    // Client Side Validation Starts
    // this.isSubmitted = true;
    //   this.questions.forEach((q: any) => {
    //     if (q.selectedAnswer == q.answer) {
    //       this.correct++;
    //       let marksForEachQuestion = this.questions[0].quiz.maxMarks / this.questions.length;
    //       this.marksGot += marksForEachQuestion;
    //     }
    //     if (q.selectedAnswer.trim() != '') {
    //       this.attempted++;
    //     }
    //   });
    //   this.wrong = this.attempted - this.correct;
    // Client Side Validation Ends

      // Server Side Validation Starts
      
      this._questionService.evalQuiz(
        this.questions, 
        this.user.id, 
        this.questions[0].quiz.qid,
        this.questions[0].quiz.category.cid).subscribe(
        (data: any) => {
          this.correct = data.correct;
          this.marksGot = data.marksGot;
          this.attempted = data.attempted;
          this.wrong = data.wrong;
          this.isSubmitted = true;
        },
        (error) => {
          this._snack.open("Something went wrong while evaluating quiz", 'ok', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
        }
      );
      // Server Side Validation Ends
  }

  public getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - (mm * 60);
    return `${mm} min : ${ss} sec`;
  }

  public printResult() {
    window.print();
  }
}
