import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Signalement } from '../../models/signalement';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Author } from 'src/models/author';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class SignalementService {
    restBaseUri = "http://localhost:3000/";

    constructor(private http: HttpClient) { }


    addSignalement(signalement: any) {
        return this.http.post<any>(this.restBaseUri + 'signalements', signalement);
    }

    getSignalement() {
        return this.http.get<any>(this.restBaseUri + 'signalements');
    }

    getObservations() {
        return this.http.get<any>(this.restBaseUri + 'observations');
    }

    EditSignalement(data: any, id: number) {
        return this.http.put<any>(this.restBaseUri + 'signalements/' + id, data);
    }

    getSignalementByemail(email: string) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('email', email);
        return this.http.get<any>(this.restBaseUri + 'signalements', { params: queryParams });
    }

}