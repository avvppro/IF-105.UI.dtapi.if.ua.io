import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from './question.service';
import { IQuestion } from './question';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { switchMap, filter } from 'rxjs/operators';
import { MatTable } from '@angular/material/table';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDiaglogComponent, ConfirmDialogModel } from '../../confirm-diaglog/confirm-diaglog.component';
import { MatDialog } from '@angular/material'; //FIX


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  animations: [
    trigger('answersExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    trigger('rotateIcon', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ],
})
export class QuestionComponent implements OnInit {

  questions: IQuestion[]
  expandedQuestion: IQuestion
  testId: number;
  loadingQuestionId: number;
  loadingQuestions: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private dialog: MatDialog
  ) { }


  @ViewChild("table", { static: true }) table: MatTable<any>;

  private getQuestionById(id) {
    return this.questions.find((question) => {
      return question.question_id === id
    })
  }

  expandQuestionAnswers(id) {
    let selectedQuestion: IQuestion;
    selectedQuestion = this.getQuestionById(id);
    if (selectedQuestion.answers.length) {
      this.expandedQuestion = this.expandedQuestion == selectedQuestion ? null : selectedQuestion
      return
    }
    else {
      this.loadingQuestionId = id;
      this.questionService.getQuestionAnswers(id)
      .subscribe((res: any) => { //FIX
        if (res.response === 'no records') {
          selectedQuestion.answers = 'No answers';
        } else {
          selectedQuestion.answers = res;
        }
        this.expandedQuestion = this.expandedQuestion == selectedQuestion ? null : selectedQuestion
        this.loadingQuestionId = null;
      })
    }
  }

  deleteQuestion(id) {
    const dialogData = new ConfirmDialogModel('Підтвердження', 'Питання та всі відповіді до нього будуть видалені.');
    const dialogRef = this.dialog.open(ConfirmDiaglogComponent, {
        maxWidth: '400px',
        data: dialogData
    });
    dialogRef.afterClosed()
      .pipe(
        filter(val => val),
        switchMap((val:any) => { 
          this.loadingQuestions = true;
          return this.questionService.getQuestionAnswers(id) 
        }),  //FIX
        switchMap((val:any) => val.response !== 'no records' ? this.questionService.deleteAnswerCollection(val) : of(val)), //FIX
        switchMap((val: any) => this.questionService.deleteQuestion(id) )
      )
      .subscribe( res => { 
        let questionIndex;
        this.questions.forEach( (question, index) => {
          if (question.question_id === id) {
            questionIndex = index;
          }
        })
        this.questions.splice(questionIndex, 1);
        this.loadingQuestions = false;
        this.table.renderRows();
      })
  }

  
  ngOnInit() {
    this.testId = +this.route.snapshot.paramMap.get('id');
    this.loadingQuestions = true;
    this.questionService.getTestQuestion(this.testId)
      .subscribe((res: IQuestion[]) => {
        const questionsWithEmptyAnswers = res.map((question) => {
          return { ...question, answers: [] }
        }) 
        this.questions = questionsWithEmptyAnswers
        this.loadingQuestions = false;
        } )
  }

}
