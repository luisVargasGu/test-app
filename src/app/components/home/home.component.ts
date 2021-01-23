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

  get f() {
    return this.form.controls;
  }

  emitFunctionTimer(time: number) {
    if (time !== undefined) {
      this.apiService.functionTimer.emit(time);
    }
  }

  filterSearch() {
    const t0 = performance.now();
    this.allSubscriptions.push(this.apiService.getPatientsAgeFilt().subscribe(
      (data: SearchResponse) => {
        this.filteredEntries = data.entry;
        console.log(data);
        const t1 = performance.now();
        this.functionTime = t1 - t0;
        this.emitFunctionTimer(this.functionTime);
      }
    ));
  }

  customSearch() {
    const t0 = performance.now();
    this.allSubscriptions.push(this.apiService.customSearch(this.f.name.value, this.f.date.value).subscribe(
      (data: SearchResponse) => {
        this.filteredEntries = data.entry;
        console.log(data);
        this.submitted = false;
        const t1 = performance.now();
        this.functionTime = t1 - t0;
        this.emitFunctionTimer(this.functionTime);
      }
    ));
  }

  onSubmit() {
    this.submitted = true;
    this.customSearch();
  }

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

  resetEntries() {
    this.filteredEntries = this.allEntries;
  }
}
