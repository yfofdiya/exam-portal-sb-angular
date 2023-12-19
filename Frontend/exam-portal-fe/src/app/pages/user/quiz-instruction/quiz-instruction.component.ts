import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-instruction',
  templateUrl: './quiz-instruction.component.html',
  styleUrls: ['./quiz-instruction.component.css']
})
export class QuizInstructionComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute, 
    private _quizService: QuizService, 
    private _snack: MatSnackBar, 
    private _router: Router) {}

  qid: any;

  quiz: any;

  isConfirmed: any;

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];

    this._quizService.getQuizById(this.qid).subscribe(
      (data) => {
        this.quiz = data;    
      },
      (error) => {
        this._snack.open("Something went wrong while fetching quiz by id " + this.qid, 'ok', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    )
  }

  public startQuiz() {
    this.isConfirmed = window.confirm('Do you want to start a quiz?');
    if (this.isConfirmed) {
      this._router.navigate(['/user-dashboard/quiz/start/' + this.qid]);
    }
  }

}
