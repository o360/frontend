import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'bs-breadcrumb',
  templateUrl: 'breadcrumb.component.html'
})
export class BreadcrumbComponent {
  public breadcrumbs: {
    label: string;
    url: string
  }[] = [];

  constructor(public router: Router) {
    router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(() => {
        let child = router.routerState.snapshot.root.firstChild;

        let path: string[] = [];

        let newState = [];

        while (child) {
          let label = child.data.breadcrumb;

          let parts: string[] = child.url.map(x => x.path);
          path = path.concat(parts);

          if (!child.data.breadcrumbIgnore) {
            newState.push({
              label: label,
              url: path.join('/')
            });
          }

          child = child.firstChild;
        }
        this.breadcrumbs = newState;
      });
  }
}

