import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute, 
    private _quizService: QuizService, 
    private _snack: MatSnackBar, 
    private _categoryService: CategoryService, 
    private _router: Router) { }

  qid = 0;

  quiz: any;

  categories: any;

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];

    this._quizService.getQuizById(this.qid).subscribe(
      (data) => {
        this.quiz = data;
      },
      (error) => {
        this._snack.open("Something went wrong while fetching quiz details for id" + this.qid, 'ok', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    );

    this._categoryService.getAllCategories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        this._snack.open("Something went wrong while fetching categories", 'ok', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    );
  }

  public updateQuiz() {
    if (this.quiz.title.trim() == '' || this.quiz.title == null) {
      this._snack.open("Title is required", 'ok', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
      return;
    }
    if (this.quiz.description.trim() == '' || this.quiz.description == null) {
      this._snack.open("Description is required", 'ok', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
      return;
    }
    if (this.quiz.maxMarks.trim() == '' || this.quiz.maxMarks == null) {
      this._snack.open("Maximum marks is required", 'ok', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
      return;
    }
    if (this.quiz.numberOfQuestions.trim() == '' || this.quiz.numberOfQuestions == null) {
      this._snack.open("Number of question is required", 'ok', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
      return;
    }
    if (this.quiz.category == null) {
      this._snack.open("Category is required", 'ok', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
      return;
    }
    this._quizService.updateQuiz(this.quiz).subscribe(
      (data) => {
        this._snack.open("Quiz is updated", 'ok', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
        this._router.navigate(['/admin-dashboard/quizzes'])
      },
      (error) => {
        this._snack.open("Something went wrong while updating quiz", 'ok', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    )
  }
}
