export type FormType =
  | 'project'
  | 'board'
  | 'task'
  | 'column'
  | 'subtask'
  | 'user'
  | 'assign-user'
  | 'profile'
  | 'see-tasks';

export type ToastType = 'confirm' | 'warning';

export enum FormStatus {
  OK = 'ok',
  Loading = 'loading',
  error = 'error'
}

export type TabNameAssign = 'peek' | 'assign';

export type SortBy = { column: keyof Task; direction: 'asc' | 'des' };
