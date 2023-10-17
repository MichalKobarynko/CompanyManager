import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AuthComponent implements OnInit, OnDestroy {
  isRegister = new BehaviorSubject<boolean>(false);
  private urlSubscription?: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.urlSubscription = this.route.url.subscribe(segments => {
      this.isRegister.next(segments.map(segment => segment.path).includes('register'));
    })
  
  }

  ngOnDestroy(): void {
    if (this.urlSubscription) {
      this.urlSubscription.unsubscribe();
    }
  }
}
