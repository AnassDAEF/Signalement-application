import { AddSignalementComponent } from './add-signalement/add-signalement.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignalementService } from './services/signalement.service';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent,
        NavbarComponent,
        AddSignalementComponent
      ],
      providers: [SignalementService]
    }).compileComponents();
  });


  it(`should have as title 'signalement-application'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('signalement-application');
  });

});
  