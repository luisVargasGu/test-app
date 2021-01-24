import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Questionare } from 'src/app/models/questionare';
import { QuestionnaireResponse } from 'src/app/models/questionnaireResponse';
import { QuestionnaireService } from 'src/app/services/questionnaire.service';
import questionaireText from "../../../assets/questionnaire.json";

@Component({
  selector: 'app-questionaire',
  templateUrl: './questionaire.component.html',
  styleUrls: ['./questionaire.component.scss']
})
export class QuestionaireComponent implements OnInit {
  questionaire: Questionare = questionaireText;
  // custom form
  form: FormGroup;
  // generated output
  payLoad: string = '';
  // form boolean
  submitted: boolean = false;

  constructor(private questionnaireService: QuestionnaireService) {
    this.form = this.questionnaireService.toFormGroup(this.questionaire.item);
  }

  ngOnInit(): void {
    this.parseQuestionarire();
  }

  /**
   * Generates a response obj if the form is valid
   */
  generateResponse() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    let formFields = this.form.getRawValue();
    let output: QuestionnaireResponse = {
      resourceType: "QuestionnaireResponse",
      // Update to Identifier object
      identifier: "1",
      basedOn: this.questionaire.url,
      status: "completed",
      // Update to Reference(any)
      subject: null,
      // Update to Reference(Encounter)
      encounter: null,
      authored: new Date(),
      // Update to Reference(Device|Practitioner|PractitionerRole|Patient|RelatedPerson|Organization)
      author: "Desktop-test",
      // Update to Reference(Patient|Practitioner|PractitionerRole|RelatedPerson)
      source: "Client-test",
      item: this.questionaire.item
    };
    output.item.forEach((question, i) => {
      if (question.type === "radio") {
        output.item[i]["answer"] = formFields[question.linkId];
      }
      else if (question.type === "group") {
        let formFieldSubgroup = formFields[question.linkId];
        question.item.forEach((subQuestion: { linkId: string | number; }, j: string | number) => {
          output.item[i].item[j]["answer"] = formFieldSubgroup[subQuestion.linkId];
        });
      }
    });
    this.payLoad = JSON.stringify(output);
  }

  /**
   * Sets questionare type items to something
   * That an input component can interpret
   */
  parseQuestionarire() {
    this.questionaire.item.forEach((question, i) => {
      if (question.type === "boolean") {
        this.questionaire.item[i].type = "radio";
      }
    });
  }

}
