import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _questionService: QuestionService,
    private _snack: MatSnackBar,
    private _router: Router
  ) { }

  quesId: any;
  quizTitle: any;

  question: any;

  ngOnInit(): void {
    this.quesId = this._route.snapshot.params['quesId'];
    this.quizTitle = this._route.snapshot.params['title'];

    this._questionService.getQuestionByQuestionId(this.quesId).subscribe(
      (data) => {
        this.question = data;
      },
      (error) => {
        this._snack.open("Something went wrong while fetching question details for id" + this.quesId, 'ok', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    );
  }

  public updateQuestion() {
    if (this.question.content.trim() == '' || this.question.content == null) {
      this._snack.open("Content is required", 'ok', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
      return;
    }
    if (this.question.option1.trim() == '' || this.question.option1 == null) {
      this._snack.open("Option 1 is required", 'ok', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
      return;
    }
    if (this.question.option2.trim() == '' || this.question.option2 == null) {
      this._snack.open("Option 2 is required", 'ok', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
      return;
    }
    if (this.question.option3.trim() == '' || this.question.option3 == null) {
      this._snack.open("Option 3 is required", 'ok', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
      return;
    }
    if (this.question.option4.trim() == '' || this.question.option4 == null) {
      this._snack.open("Option 4 is required", 'ok', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
      return;
    }
    if (this.question.answer.trim() == '' || this.question.answer == null) {
      this._snack.open("Answer is required", 'ok', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
      return;
    }
    this._questionService.updateQuestion(this.question).subscribe(
      (data) => {
        this._snack.open("Question is updated", 'ok', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
        this._router.navigate(['/admin-dashboard/view-questions/' + this.question.quiz.qid + '/' + this.quizTitle]);
      },
      (error) => {
        this._snack.open("Something went wrong while updating question", 'ok', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    );
  }
}
