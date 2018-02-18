import '../polymer/polymer.js';
import { IronButtonState } from '../iron-behaviors/iron-button-state.js';
import { IronControlState } from '../iron-behaviors/iron-control-state.js';

export const PaperItemBehaviorImpl = {
  hostAttributes: {
    role: 'option',
    tabindex: '0'
  }
};

export const PaperItemBehavior = [
  IronButtonState,
  IronControlState,
  PaperItemBehaviorImpl
];
