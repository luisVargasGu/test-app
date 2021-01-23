import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // timer output
  public functionTimer: EventEmitter<any> = new EventEmitter();

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * Performs a call to a server for Patient information
   */
  getPatients() {
    return this.httpClient.get(environment.queryURI + '/Patient',
      { headers: this.getHeaders() });
  }

  /**
   * Performs a call to a server for Patient information with pre-set age range
   * @param  {string='1960'} startYear: Beginning of the age range
   * @param  {string='1965'} endYear: End of the age range
   */
  getPatientsAgeFilt(startYear: string = '1960', endYear: string = '1965') {
    return this.httpClient.get(environment.queryURI + `/Patient?birthdate=ge${startYear}-01-01&birthdate=le${endYear}-12-31`,
      { headers: this.getHeaders() });
  }

  /**
   * Performs a call to a server for Patient information with custom name and birth day parameters
   * @param  {string} name: Patient Name
   * @param  {Date} birthDate: Patient birth day
   */
  customSearch(name: string, birthDate: Date) {
    return this.httpClient.get(environment.queryURI + `/Patient?name=${name}&birthdate=eq${birthDate}`,
      { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/fhir+json'
    });
    return headers;
  }
}


