import { trigger, state, animate, style, transition, stagger, query, keyframes } from '@angular/animations';

// import { trigger, state, animate, style, transition } from '@angular/core';


export function slideToBottom() {
  return trigger('slideToBottom', [
    state('void', style({ position: 'fixed', width: '100%' })),
    state('*', style({ position: 'fixed', width: '100%' })),
    transition(':enter', [
      style({ transform: 'translateY(-100%)' }),
      animate('0.5s ease-in-out', style({ transform: 'translateY(0%)' }))
    ]),
    transition(':leave', [
      style({ transform: 'translateY(0%)' }),
      animate('0.5s ease-in-out', style({ transform: 'translateY(-100%)' }))
    ])
  ]);
}


export function slideInOut() {
  return trigger('slideInOut', [
    state('in', style({
      transform: 'translateY(0%)'
    })),
    state('out', style({
      transform: 'translateY(100%)'
    })),
    transition('in => out', animate('400ms ease-in-out')),
    transition('out => in', animate('400ms ease-in-out'))
  ]);
}

export function slideOutIn() {
  return trigger('slideInOut', [
    state('in', style({
      transform: 'translateY(100%)'
    })),
    state('out', style({
      transform: 'translateY(0%)'
    })),
    transition('in => out', animate('400ms ease-in-out')),
    transition('out => in', animate('400ms ease-in-out'))
  ]);
}

export function fadeToBlack() {

  return trigger('fadeToBlack', [
    state('void', style({ position: 'fixed', width: '100%' })),
    state('*', style({ position: 'fixed', width: '100%' })),
    transition(':enter', [
      style({ opacity: '0' }),
      animate('1s', style({ opacity: '1' }))
    ]),
    transition(':leave', [
      style({ opacity: '1' }),
      animate('1s', style({ opacity: '0' }))
    ])
  ]);
}

export function slideToLeft() {
  return trigger('slideToLeft', [
    state('void', style({ position: 'fixed', width: '100%' })),
    state('*', style({ position: 'fixed', width: '100%' })),
    transition(':enter', [
      style({ transform: 'translateX(100%)' }),
      animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
    ]),
    transition(':leave', [
      style({ transform: 'translateX(0%)' }),
      animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
    ])
  ]);
}


export function slideToRight() {
  return trigger('slideToRight', [
    state('void', style({ position: 'fixed', width: '100%' })),
    state('*', style({ position: 'fixed', width: '100%' })),
    transition(':enter', [
      style({ transform: 'translateX(-100%)' }),
      animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
    ]),
    transition(':leave', [
      style({ transform: 'translateX(0%)' }),
      animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
    ])
  ]);
}

export function slideToTop() {
  return trigger('slideToTop', [
    state('void', style({ position: 'fixed', width: '100%', height: '100%' })),
    state('*', style({ position: 'fixed', width: '100%', height: '100%' })),
    transition(':enter', [
      style({ transform: 'translateY(100%)' }),
      animate('0.5s ease-in-out', style({ transform: 'translateY(0%)' }))
    ]),
    transition(':leave', [
      style({ transform: 'translateY(0%)' }),
      animate('0.5s ease-in-out', style({ transform: 'translateY(-100%)' }))
    ])
  ]);
}

export function toastExpand( animationTime : number = 250 ) {
  return trigger('toastExpand', [
    state('in', style({ height: '42px' })),
    state('out', style({ height: '*' })),
    transition('in => out', [
      style({ height: '42px' }),
      animate(animationTime, style({ height: 0 }))
    ]),
    transition('out => in', [
      style({ height: 0 }),
      animate(animationTime, style({ height: '42px' }))
    ])
  ]);
}

export function expandCollapse( animationTime : number = 1000 ) {
  return trigger('expandCollapse', [
    state('expanded', style({ opacity: 1, height: '*', display: 'block'})),
    state('collapsed', style({ opacity: 0, height: 0, display: 'none'})),
    transition('collapsed => expanded', [
      // style({ opacity: 0, height: 0 }),
      // animate(animationTime, style({ opacity: 1, height: '*' }))
      animate(animationTime, keyframes([
        style({display: 'block', offset: 0}),
        style({height: '*', offset: 0.15}),
        style({opacity: 1, offset: 0.5})
      ]))
    ]),
    transition('expanded => collapsed', [
      // style({ opacity: 1, height: '*' }),
      // animate(animationTime, style({ opacity: 0, height: 0 }))
      animate(animationTime, keyframes([
        style({opacity: 0,offset: 0.25}),
        style({height: 0, offset: 0.5}),
        style({display: 'none', offset: 0.75})
      ]))
    ])
  ]);
}

export function accordionControl( animationTime : number = 250, staggerTime : number = 250 ) {
  return trigger('accordionControl', [
    transition(':enter', [
      query(':enter', [
        style({ visibility: 'hidden', height: 0 }),
        stagger(staggerTime, [
          animate(animationTime, style({ visibility: 'visible' }))
        ])
      ])

    ]),
    transition(':leave', [
      query(':leave', [
        style({ visibility: 'visible' }),
        stagger(staggerTime, [ animate(animationTime, style({ visibility: 'none', height: 0 })) ])

      ])
    ])
  ]);
}

export function shrinkToShow() {
  return trigger('shrinkToShow', [
    state('void', style({ height: 0 })),
    state('*', style({ height: '*' })),
    transition('* => void', [
      style({ height: '*' }),
      animate(250, style({ height: 0 }))
    ]),
    transition('void => *', [
      style({ height: 0 }),
      animate(250, style({ height: '*' }))
    ])
  ]);
}

export function reloadNotificationShow() {
  return trigger('reloadNotification', [
    state('show', style({ opacity: 1, height: '45px', transform: 'scale(1.0)' })),
    state('hide', style({ opacity: 0, display: 'none', transform: 'scale(1.0)' })),
    transition('show => hide', animate('500ms ease-in')),
    transition('hide => show', animate('400ms ease-out'))
  ]);
}


export function loadHeaderBar() {
  return trigger('loadHeader', [
    state('*', style({ height: '40px', width: '100%' })),
    state('void', style({ height: 0, width: '100%' })),
    transition('* => void', animate('500ms ease-out')),
    transition('void => *', animate('400ms ease-in'))
  ]);
}


export function entryTransition() {
  return trigger('routerTransition', [
    state('void', style({ position: 'fixed', width: '100%', height: 'calc(100% - 60px)' })),
    state('*', style({ position: 'fixed', width: '100%', height: 'calc(100% - 60px)' })),
    transition(':enter', [  // before 2.1: transition('void => *', [
      style({ transform: 'translateX(100%)' }),
      animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
    ]),
    transition(':leave', [  // before 2.1: transition('* => void', [
      style({ transform: 'translateY(0%)' }),
      animate('0.5s ease-in-out', style({ transform: 'translateY(100%)' }))
    ])
  ]);
}

export function routerTransition() {
  return entryTransition();
}
