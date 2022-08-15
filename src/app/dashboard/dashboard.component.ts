import { Component } from '@angular/core';
import { AppService, IVoteItem } from '../app.service';
import { Store } from '@ngrx/store';
import { getVoteItem } from './actions/dashboard.actions';
import { IDashboard, IInitialState } from './reducers/dashboard.reducer';
import { getDashboard } from './selectors/dashboard.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public dashboard$: Observable<IInitialState> = this._store.select(getDashboard);

  public constructor(private _appService: AppService, private _store: Store<IDashboard>) {
    this._appService.getCompanies().subscribe((data: IVoteItem[]) => {
      this._store.dispatch(getVoteItem({ voteItems: data }));
    });
  }
}
