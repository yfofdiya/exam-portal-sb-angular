import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _questionService: QuestionService, private _snack: MatSnackBar) {}

  qid: any;
  title: any;

  isConfirmed: any;

  questions: any;

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this.title = this._route.snapshot.params['title'];

    this._questionService.getAllQuestionsByQuizId(this.qid).subscribe(
      (data) => {
        this.questions = data;
      },
      (error) => {
        this._snack.open("Something went wrong while fetching all questions", 'ok', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    );
  }

  public deleteQuestion(quesId: any) {
    this.isConfirmed = window.confirm('Are you sure you want to delete this item?');
    if (this.isConfirmed) {
      this._questionService.deleteQuestion(quesId).subscribe(
        (data) => {
          this.questions = this.questions.filter((question: any) => question.quesId != quesId);
          this._snack.open("Question is deleted", 'ok', {
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
