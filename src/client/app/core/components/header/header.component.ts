import { AfterViewInit, Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bs-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent implements AfterViewInit {

  // @todo: Rewrite scripts from theme
  public ngAfterViewInit() {
    let self = this;
    $('.navbar-toggler').click(function (e) {
      e.preventDefault();

      if ($(this).hasClass('sidebar-toggler')) {
        $('body').toggleClass('sidebar-hidden');
        self.resizeBroadcast();
      }

      if ($(this).hasClass('aside-menu-toggler')) {
        $('body').toggleClass('aside-menu-hidden');
        self.resizeBroadcast();
      }

      if ($(this).hasClass('mobile-sidebar-toggler')) {
        $('body').toggleClass('sidebar-mobile-show');
        self.resizeBroadcast();
      }
    });

    $('.sidebar-close').click(function () {
      $('body').toggleClass('sidebar-opened').parent().toggleClass('sidebar-opened');
    });
  }

  private resizeBroadcast() {
    let timesRun = 0;
    let interval = setInterval(() => {
      timesRun += 1;
      if (timesRun === 5) {
        clearInterval(interval);
      }
      window.dispatchEvent(new Event('resize'));
    }, 62.5);
  }
}
