import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {
  show$: Observable<boolean> | null = null;

  constructor(
    private lodingSpinnerService: LoadingSpinnerService
  ) { }

  ngOnInit(): void {
    this.show$ = this.lodingSpinnerService.getShow;
  }

}
