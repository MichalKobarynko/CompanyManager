import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { FormStatus, FormType } from '../models/types';
import { FormService } from '../services/form.service';
import { ToastService } from '../services/toast.service';
import { ProjectRestService } from '../api/services/project-rest.service';

@Component({
  selector: 'app-border',
  templateUrl: './border.component.html',
  styleUrls: ['./border.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BorderComponent implements OnInit, OnDestroy {
  status: FormStatus = FormStatus.OK;
  destroy$ = new Subject<void>();

  constructor(
    private formService: FormService,
    private projectService: ProjectRestService
  ) { }
  
  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.projectService.getProjects();
  }

  onForm(type: FormType, columnId?: string) {
    this.formService.onChangeFormVisibility(type);
    //if (columnId) {
    //  this.boardService.onChangeSelectedColumnId(columnId);
    //}
  }
}
