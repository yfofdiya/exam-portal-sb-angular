import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _quizService: QuizService, private _snack: MatSnackBar) {}

  cid: any;

  quizzes: any;

  ngOnInit(): void {

    this._route.params.subscribe(
      (param) => {
        this.cid = param['cid'];

        if (this.cid == 0) {
          this._quizService.getAllActiveQuizzes().subscribe(
            (data) => {
              this.quizzes = data;
            },
            (error) => {
              this._snack.open("Something went wrong while fetching all quizzes", 'ok', {
                duration: 2000,
                verticalPosition: 'top',
                horizontalPosition: 'end'
              });
            }
          );
        } else {
          this._quizService.getAllActiveQuizzesByCategoryId(this.cid).subscribe(
            (data) => {
              this.quizzes = data;
              
            },
            (error) => {
              this._snack.open("Something went wrong while fetching all quizzes by category id " + this.cid, 'ok', {
                duration: 2000,
                verticalPosition: 'top',
                horizontalPosition: 'end'
              });
            }
          )
        }
      }
    );
  }

}
