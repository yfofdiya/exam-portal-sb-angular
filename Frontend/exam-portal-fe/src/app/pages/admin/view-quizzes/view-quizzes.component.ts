import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  constructor(private _quizService: QuizService, private _snack: MatSnackBar) { }

  quizzes: any;

  isConfirmed: any;

  ngOnInit(): void {
    this._quizService.getAllQuizzes().subscribe(
      (data) => {
        this.quizzes = data;
      },
      (error) => {
        this._snack.open("Something went wrong while fetching quizzes", 'ok', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    );
  }

  public deleteQuiz(qid: any) {
    this.isConfirmed = window.confirm('Are you sure you want to delete this item?');
    if (this.isConfirmed) {
      this._quizService.deleteQuiz(qid).subscribe(
        (data) => {
          this.quizzes = this.quizzes.filter((quiz: any) => quiz.qid != qid);
          this._snack.open("Quiz is deleted", 'ok', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
        },
        (error) => {
          this._snack.open("Something went wrong while deleting quiz", 'ok', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
        }
      );
    }
  }
}
