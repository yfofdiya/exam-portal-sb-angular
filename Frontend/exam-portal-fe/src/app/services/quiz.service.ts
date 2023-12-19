import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _httpClient: HttpClient) { }

  public getAllQuizzes() {
    return this._httpClient.get(`${baseUrl}/api/quizzes`);
  }

  public addQuiz(quiz: any) {
    return this._httpClient.post(`${baseUrl}/api/quizzes`, quiz);
  }

  public deleteQuiz(qid: any) {
    return this._httpClient.delete(`${baseUrl}/api/quizzes/${qid}`);
  }

  public getQuizById(qid: any) {
    return this._httpClient.get(`${baseUrl}/api/quizzes/${qid}`);
  }

  public updateQuiz(quiz: any) {
    return this._httpClient.put(`${baseUrl}/api/quizzes`, quiz);
  }

  public getAllActiveQuizzes() {
    return this._httpClient.get(`${baseUrl}/api/quizzes/active`);
  }

  public getAllActiveQuizzesByCategoryId(cid: any) {
    return this._httpClient.get(`${baseUrl}/api/quizzes/active/category/${cid}`)
  }
}
