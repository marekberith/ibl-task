import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { OpmetQuery, OpmetResponse } from '../../shared/interfaces/opmet.interface';
import { catchError, of } from 'rxjs';
import { HighlightPipe } from '../../shared/interfaces/highlight.pipe';

@Component({
  selector: 'app-create-briefing',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, HighlightPipe],
  providers: [
    DatePipe
  ],
  templateUrl: './create-briefing.component.html',
  styleUrl: './create-briefing.component.css'
})
export class CreateBriefingComponent {
  form: FormGroup;
  errorOnRequest: string | undefined = undefined;
  data: OpmetResponse | undefined = undefined;

  constructor(private http: HttpClient, private datePipe: DatePipe) {
    this.form = new FormGroup({
      metar: new FormControl(true),
      sigmet: new FormControl(false),
      taf: new FormControl(false),
      airports: new FormControl('LZIB', [Validators.pattern('^([A-Z]{4} )*[A-Z]{4}$')]),
      countries: new FormControl('', [Validators.pattern('^([A-Z]{2} )*[A-Z]{2}$')])
    }, { validators: [this.atLeastOneCheckboxSelected, this.atLeastOneLocationApplied] });
  }

  private atLeastOneLocationApplied(group: AbstractControl): ValidationErrors | null {
    const airports: string = group.get('airports')?.value;
    const countries: string = group.get('countries')?.value;
    return airports.length || countries.length ? null : { atLeastOneLocation: true };
  }

  private atLeastOneCheckboxSelected(group: AbstractControl): ValidationErrors | null {
    const controls = group.get('metar')?.value || group.get('sigmet')?.value || group.get('taf')?.value;
    return controls ? null : { atLeastOne: true };
  }

  private isControlSelected(name: string) {
    return this.form.get(name)?.value == true
  }

  private getSelectedReportTypes(): string[] {
    const selectedReportTypes = []
    if (this.isControlSelected('metar'))
      selectedReportTypes.push('METAR')
    if (this.isControlSelected('sigmet'))
      selectedReportTypes.push('SIGMET')
    if (this.isControlSelected('taf'))
      selectedReportTypes.push('TAF')
    return selectedReportTypes;
  }

  private splitStringToWords(word: string): string[] {
    return word.split(' ').filter(part => part !== '');
  }

  private getSelectedAirports(): string[] {
    const airports: string = this.form.get('airports')?.value;
    return this.splitStringToWords(airports);
  }

  private getSelectedCountries(): string[] {
    const stations: string = this.form.get('countries')?.value;
    return this.splitStringToWords(stations);
  }

  async onSubmit() {
    if (this.form.valid) {
      const requestBody: OpmetQuery = {
        id: "query01",
        method: "query",
        params: [
          {
            id: "briefing01", 
            reportTypes: this.getSelectedReportTypes(),        
            stations: this.getSelectedAirports(),
            countries: this.getSelectedCountries()
          }
        ]
      }
      this.errorOnRequest = undefined;
      this.http.post<OpmetResponse>('https://ogcie.iblsoft.com/ria/opmetquery', requestBody).pipe(
        catchError((error) => {
          this.errorOnRequest = JSON.stringify(error);
          return of(undefined);
        })
      ).subscribe((v: OpmetResponse | undefined) => {
        this.data = v;
      })
    }
  }
}
