import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastType } from '../../models/types';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent implements OnInit {
  message$: Observable<string> | null = null;
  show$: Observable<boolean> | null = null;
  type$: Observable<ToastType> | null = null;

 
  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.message$ = this.toastService.getMessage;
    this.show$ = this.toastService.getShow;
    this.type$ = this.toastService.getType;
  }

  onClose() {
    this.toastService.closeToast();
  }
}
