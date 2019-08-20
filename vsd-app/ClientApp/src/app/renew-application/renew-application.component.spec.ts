
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { RenewApplicationComponent } from './renew-application.component';
let component: RenewApplicationComponent;
let fixture: ComponentFixture<RenewApplicationComponent>;

describe('RenewApplication component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [RenewApplicationComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
      fixture = TestBed.createComponent(RenewApplicationComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});
