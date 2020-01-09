import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators';
import { of } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  path = 'https://api.aylien.com/api/v1/absa/';

  mockResp = {
    "text": "Delicious food. Disappointing service.",
    "domain": "restaurants",
    "aspects": [{
      "aspect": "food",
      "aspect_confidence": 0.9835863709449768,
      "polarity": "positive",
      "polarity_confidence": 0.9158669114112854
    }, {
      "aspect": "staff",
      "aspect_confidence": 0.9747142195701599,
      "polarity": "negative",
      "polarity_confidence": 0.9969394207000732
    }],
    "sentences": [{
      "text": "Delicious food.",
      "polarity": "positive",
      "polarity_confidence": 0.9158669114112854,
      "aspects": [{
        "aspect": "food",
        "aspect_confidence": 0.9835863709449768,
        "polarity": "positive",
        "polarity_confidence": 0.9158669114112854
      }]
    }, {
      "text": "Disappointing service.",
      "polarity": "negative",
      "polarity_confidence": 0.9969394207000732,
      "aspects": [{
        "aspect": "staff",
        "aspect_confidence": 0.9747142195701599,
        "polarity": "negative",
        "polarity_confidence": 0.9969394207000732
      }]
    }]
  };

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    // return this.http.get<any[]>(`${this.path}`);
    return of([this.mockResp]);
  }
}

