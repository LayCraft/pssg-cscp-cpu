import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactInformationDeletemeComponent } from './contact-information-DELETEME.component';


describe('ContactInformationComponent', () => {
	let component: ContactInformationDeletemeComponent;
	let fixture: ComponentFixture<ContactInformationDeletemeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ContactInformationDeletemeComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ContactInformationDeletemeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
