import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-forbidden-found',
  templateUrl: './page-forbidden.component.html',
  styleUrls: ['./page-forbidden.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageForbiddenComponent implements OnInit {
  private returnUrl?: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public navigateToLogin() {
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: this.returnUrl } });
  }
}
