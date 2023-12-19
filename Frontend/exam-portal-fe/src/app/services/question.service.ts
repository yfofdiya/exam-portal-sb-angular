import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _httpClient: HttpClient) { }

  public getAllQuestionsByQuizId(qid: any) {
    return this._httpClient.get(`${baseUrl}/api/questions/quiz/all/${qid}`);
  }

  public addQuestion(question: any) {
    return this._httpClient.post(`${baseUrl}/api/questions`, question);
  }

  public getQuestionByQuestionId(quesId: any) {
    return this._httpClient.get(`${baseUrl}/api/questions/${quesId}`);
  }

  public updateQuestion(question: any) {
    return this._httpClient.put(`${baseUrl}/api/questions`, question);
  }

  public deleteQuestion(quesId: any) {
    return this._httpClient.delete(`${baseUrl}/api/questions/${quesId}`);
  }

  public getRandomQuestionsByQuizId(qid: any) {
    return this._httpClient.get(`${baseUrl}/api/questions/quiz/${qid}`);
  }

  public evalQuiz(questions: any, id: any, qid: any, cid: any) {
    return this._httpClient.post(`${baseUrl}/api/questions/eval-quiz/${id}/${qid}/${cid}`, questions);
  }
}
