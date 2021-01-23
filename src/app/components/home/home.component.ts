import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Entry } from 'src/app/models/entry';
import { Resource } from 'src/app/models/resource';
import { SearchResponse } from 'src/app/models/searchResponse';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  // Title for test
  title = 'fhir-app-test';
  // All patient resources
  allEntries: Entry[];
  // Filtered patient resources
  filteredEntries: Entry[];
  // all entires subscription
  allSubscriptions: Subscription[] = [];
  // execution timer
  functionTime: number = 0;
  // search form
  form: FormGroup;
  // checker
  submitted: boolean = false;

  constructor(private apiService: ApiService,
    private formBuilder: FormBuilder) { }

  ngOnDestroy(): void {
    this.allSubscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit() {
    const t0 = performance.now();
    this.allSubscriptions.push(this.apiService.getPatients().subscribe(
      (data: SearchResponse) => {
        this.allEntries = data.entry;
        this.filteredEntries = this.allEntries;
        console.log(data);
        const t1 = performance.now();
        this.functionTime = t1 - t0;
        this.emitFunctionTimer(this.functionTime);
      }
    ));
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      date: ['', [Validators.required, Validators.pattern('\\d{4}-\\d{2}-\\d{2}')]]
    });
  }

  /**
   * Provides access to the form controls to the home html template
   */
  get f() {
    return this.form.controls;
  }

  /**
   * Emits how long the function, and api call took to the footer
   * @param  {number} time: How long the function, and api call took
   */
  emitFunctionTimer(time: number) {
    if (time !== undefined) {
      this.apiService.functionTimer.emit(time);
    }
  }

  /**
   * Submits the search form with the custom birth range
   */
  filterSearch() {
    const t0 = performance.now();
    this.allSubscriptions.push(this.apiService.getPatientsAgeFilt().subscribe(
      (data: SearchResponse) => {
        this.filteredEntries = data.entry;
        const t1 = performance.now();
        this.functionTime = t1 - t0;
        this.emitFunctionTimer(this.functionTime);
      }
    ));
  }

  /**
   * Submits the Api call for Patients with custom name and custom birthday
   * Also sets the timer of the footer
   */
  customSearch() {
    const t0 = performance.now();
    this.allSubscriptions.push(this.apiService.customSearch(this.f.name.value, this.f.date.value).subscribe(
      (data: SearchResponse) => {
        this.filteredEntries = data.entry;
        this.submitted = false;
        const t1 = performance.now();
        this.functionTime = t1 - t0;
        this.emitFunctionTimer(this.functionTime);
      }
    ));
  }

  /**
   * Submits the search form with the name and custom birthday
   */
  onSubmit() {
    this.submitted = true;
    this.customSearch();
  }

  /**
   * Compiles the Name of the Patient
   * @param  {Resource} item: A patient object from the Api call
   * @returns string: Name of the Patient
   */
  compileName(item: Resource): string {
    let fullName = "";
    item.name?.forEach((element, index) => {
      if (element.text) {
        fullName += element.text
      } else {
        if (element.suffix) {
          fullName += element.suffix[index] + ' ';
        }
        if (element.given) {
          fullName += element.given[index] + ' ';
        }
        if (element.family) {
          fullName += element.family + ' ';
        }
      }
    });
    return fullName;
  }

  /**
   * Sorts the Patient table by Age (Asce)
   */
  sortYoungestToOldest() {
    if (this.allEntries === this.filteredEntries) {
      this.filteredEntries = this.allEntries.sort((a, b) => {
        return new Date(a.resource.birthDate).getTime() - new Date(b.resource.birthDate).getTime();
      });
    }
    else {
      this.filteredEntries = this.filteredEntries.sort((a, b) => {
        return new Date(a.resource.birthDate).getTime() - new Date(b.resource.birthDate).getTime();
      });
    }

  }

  /**
   * Sets the Patients in the table back to the Original
   * Non filtered Patient List
   */
  resetEntries() {
    this.filteredEntries = this.allEntries;
  }
}
