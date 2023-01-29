import { Signalement } from './../../models/signalement';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule, HttpResponse, HttpResponseBase} from '@angular/common/http';
import { SignalementService } from './signalement.service';

describe('SignalementService', () => {
  let service: SignalementService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [SignalementService]
    });
    service = TestBed.inject(SignalementService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return list of signalement', ()=>{
    service.getSignalement().subscribe({
      next:(res)=>{
        expect(res).toBeTruthy;
        expect(res.length).toBeGreaterThan(0);
        console.log('List of signalement verified');
      }

    })
    const req = httpMock.expectOne(service.restBaseUri + 'signalements');
    expect(req.request.method).toBe('GET');
  });

  it('should return list of Observation', ()=>{
    service.getObservations().subscribe({
      next:(res)=>{
        expect(res).toBeTruthy;
        expect(res.length).toBeGreaterThan(0);
        console.log('List of Observation verified');
      }

    })
    const req = httpMock.expectOne(service.restBaseUri + 'observations');
    expect(req.request.method).toBe('GET');
  });

  it('should add signalement', ()=>{
    const newSignalement: Signalement = {
      author: {
        first_name: "Anass",
        last_name: "DAEF",
        email: "anassdaef@gmail.com",
        birth_date: "Invalid date",
        sex: "Femme"
      },
      observation: [
        {
          id: 4,
          name: "Observation 4"
        },
        {
          id: 5,
          name: "Observation 5"
        }
      ],
      description: "Hello, this is my description",
      id: "1"
    }
    service.addSignalement(newSignalement).subscribe({
      next:(res)=>{
        expect(res).toBe(newSignalement);
        console.log('add service verified');
      }
    });
    const req = httpMock.expectOne(service.restBaseUri + 'signalements');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('POST');
    req.flush(newSignalement);
  });

  it('should add signalement', ()=>{
    const signalementToEdit: Signalement = {
      author: {
        first_name: "Anass",
        last_name: "DAEF",
        email: "anassdaef@gmail.com",
        birth_date: "Invalid date",
        sex: "Femme"
      },
      observation: [
        {
          id: 4,
          name: "Observation 4"
        },
        {
          id: 5,
          name: "Observation 5"
        }
      ],
      description: "Hello, this is my edited description",
      id: "1"
    }
    service.EditSignalement(signalementToEdit, (signalementToEdit.id)? parseInt(signalementToEdit.id) : 1 ).subscribe({
      next:(res)=>{
        expect(res).toBe(signalementToEdit);
        console.log('Edit service verified');
      }
    });
    const req = httpMock.expectOne(service.restBaseUri + 'signalements/' + signalementToEdit.id);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toBe('PUT');
    req.flush(signalementToEdit);
  });
  
});
