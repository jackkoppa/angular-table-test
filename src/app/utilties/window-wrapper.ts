import { Injectable } from '@angular/core';

// allows for providing `window` without failing AOT compilation
@Injectable()
export class WindowWrapper extends Window { }
export function getWindow() { return window; }
