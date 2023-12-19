import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _questionService: QuestionService, private _snack: MatSnackBar) { }

  qid: any;
  title: any;

  question = {
    quiz: {
      qid: ''
    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: ''
  };

  // public Editor = ClassicEditor;

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this.title = this._route.snapshot.params['title'];
    this.question.quiz.qid = this.qid;
  }

  public addQuestion() {
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
    this._questionService.addQuestion(this.question).subscribe(
      (data) => {
        this.question.content = '';
        this.question.option1 = '';
        this.question.option2 = '';
        this.question.option3 = '';
        this.question.option4 = '';
        this.question.answer = '';
        this._snack.open("Question is added", 'ok', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      },
      (error) => {
        this._snack.open("Something went wrong while adding question", 'ok', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    );
  }

}
