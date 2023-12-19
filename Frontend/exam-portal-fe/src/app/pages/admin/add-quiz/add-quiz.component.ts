import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  constructor(private _snack: MatSnackBar, private _quizService: QuizService, private _categoryService: CategoryService) { }

  categories: any;

  quiz = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: false,
    category: null
  }

  ngOnInit(): void {
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

  public addQuiz() {
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
    this._quizService.addQuiz(this.quiz).subscribe(
      (data) => {
        this.quiz.title = '';
        this.quiz.description = '';
        this.quiz.maxMarks = '';
        this.quiz.numberOfQuestions = '';
        this.quiz.active = false;
        this.quiz.category = null;
        this._snack.open("Quiz is added", 'ok', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      },
      (error) => {
        this._snack.open("Something went wrong while adding quiz", 'ok', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    )
  }
}
