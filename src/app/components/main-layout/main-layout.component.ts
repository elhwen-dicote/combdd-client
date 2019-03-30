import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, filter, withLatestFrom, tap } from 'rxjs/operators';
import { MatSidenav } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  @ViewChild('drawer') drawer: MatSidenav;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  private closeMenuSub: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.closeMenuSub = this.router.events.pipe(
      withLatestFrom(this.isHandset$),
      filter(([event, isHandset]) => (isHandset && event instanceof NavigationEnd)),
    ).subscribe(() => this.drawer.close());
  }

  ngOnDestroy(): void {
    if (this.closeMenuSub) {
      this.closeMenuSub.unsubscribe();
    }
  }
}
