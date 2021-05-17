/* tslint:disable:no-unused-variable */

import { ElementRef } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { InputUppercaseDirective } from './input-uppercase.directive';

export class MockElementRef extends ElementRef {}

describe('Directive: InputUppercase', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        //more providers
        { provide: ElementRef, useClass: MockElementRef }
      ]
    }).compileComponents();
  }));

  it('should create an instance', () => {
    // const directive = new InputUppercaseDirective();
    // expect(directive).toBeTruthy();
  });
});
