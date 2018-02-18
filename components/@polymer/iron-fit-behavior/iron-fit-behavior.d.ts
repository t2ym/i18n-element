/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   iron-fit-behavior.html
 */

/// <reference path="../polymer/types/polymer.d.ts" />

declare namespace Polymer {

  /**
   * `Polymer.IronFitBehavior` fits an element in another element using `max-height` and `max-width`, and
   * optionally centers it in the window or another element.
   *
   * The element will only be sized and/or positioned if it has not already been sized and/or positioned
   * by CSS.
   *
   * CSS properties               | Action
   * -----------------------------|-------------------------------------------
   * `position` set               | Element is not centered horizontally or vertically
   * `top` or `bottom` set        | Element is not vertically centered
   * `left` or `right` set        | Element is not horizontally centered
   * `max-height` set             | Element respects `max-height`
   * `max-width` set              | Element respects `max-width`
   *
   * `Polymer.IronFitBehavior` can position an element into another element using
   * `verticalAlign` and `horizontalAlign`. This will override the element's css position.
   *
   *       <div class="container">
   *         <iron-fit-impl vertical-align="top" horizontal-align="auto">
   *           Positioned into the container
   *         </iron-fit-impl>
   *       </div>
   *
   * Use `noOverlap` to position the element around another element without overlapping it.
   *
   *       <div class="container">
   *         <iron-fit-impl no-overlap vertical-align="auto" horizontal-align="auto">
   *           Positioned around the container
   *         </iron-fit-impl>
   *       </div>
   *
   * Use `horizontalOffset, verticalOffset` to offset the element from its `positionTarget`;
   * `Polymer.IronFitBehavior` will collapse these in order to keep the element
   * within `fitInto` boundaries, while preserving the element's CSS margin values.
   *
   *       <div class="container">
   *         <iron-fit-impl vertical-align="top" vertical-offset="20">
   *           With vertical offset
   *         </iron-fit-impl>
   *       </div>
   */
  interface IronFitBehavior {

    /**
     * The element that will receive a `max-height`/`width`. By default it is the same as `this`,
     * but it can be set to a child element. This is useful, for example, for implementing a
     * scrolling region inside the element.
     */
    sizingTarget: Element;

    /**
     * The element to fit `this` into.
     */
    fitInto: object|null|undefined;

    /**
     * Will position the element around the positionTarget without overlapping it.
     */
    noOverlap: boolean|null|undefined;

    /**
     * The element that should be used to position the element. If not set, it will
     * default to the parent node.
     */
    positionTarget: Element;

    /**
     * The orientation against which to align the element horizontally
     * relative to the `positionTarget`. Possible values are "left", "right", "center", "auto".
     */
    horizontalAlign: string|null|undefined;

    /**
     * The orientation against which to align the element vertically
     * relative to the `positionTarget`. Possible values are "top", "bottom", "middle", "auto".
     */
    verticalAlign: string|null|undefined;

    /**
     * If true, it will use `horizontalAlign` and `verticalAlign` values as preferred alignment
     * and if there's not enough space, it will pick the values which minimize the cropping.
     */
    dynamicAlign: boolean|null|undefined;

    /**
     * A pixel value that will be added to the position calculated for the
     * given `horizontalAlign`, in the direction of alignment. You can think
     * of it as increasing or decreasing the distance to the side of the
     * screen given by `horizontalAlign`.
     *
     * If `horizontalAlign` is "left" or "center", this offset will increase or
     * decrease the distance to the left side of the screen: a negative offset will
     * move the dropdown to the left; a positive one, to the right.
     *
     * Conversely if `horizontalAlign` is "right", this offset will increase
     * or decrease the distance to the right side of the screen: a negative
     * offset will move the dropdown to the right; a positive one, to the left.
     */
    horizontalOffset: number|null|undefined;

    /**
     * A pixel value that will be added to the position calculated for the
     * given `verticalAlign`, in the direction of alignment. You can think
     * of it as increasing or decreasing the distance to the side of the
     * screen given by `verticalAlign`.
     *
     * If `verticalAlign` is "top" or "middle", this offset will increase or
     * decrease the distance to the top side of the screen: a negative offset will
     * move the dropdown upwards; a positive one, downwards.
     *
     * Conversely if `verticalAlign` is "bottom", this offset will increase
     * or decrease the distance to the bottom side of the screen: a negative
     * offset will move the dropdown downwards; a positive one, upwards.
     */
    verticalOffset: number|null|undefined;

    /**
     * Set to true to auto-fit on attach.
     */
    autoFitOnAttach: boolean|null|undefined;
    _fitInfo: object|null;
    _fitWidth(): any;
    _fitHeight(): any;
    _fitLeft(): any;
    _fitTop(): any;

    /**
     * The element that should be used to position the element,
     * if no position target is configured.
     */
    _defaultPositionTarget(): any;

    /**
     * The horizontal align value, accounting for the RTL/LTR text direction.
     */
    _localeHorizontalAlign(): any;
    attached(): any;
    detached(): any;

    /**
     * Positions and fits the element into the `fitInto` element.
     */
    fit(): any;

    /**
     * Memoize information needed to position and size the target element.
     */
    _discoverInfo(): any;

    /**
     * Resets the target element's position and size constraints, and clear
     * the memoized data.
     */
    resetFit(): any;

    /**
     * Equivalent to calling `resetFit()` and `fit()`. Useful to call this after
     * the element or the `fitInto` element has been resized, or if any of the
     * positioning properties (e.g. `horizontalAlign, verticalAlign`) is updated.
     * It preserves the scroll position of the sizingTarget.
     */
    refit(): any;

    /**
     * Positions the element according to `horizontalAlign, verticalAlign`.
     */
    position(): any;

    /**
     * Constrains the size of the element to `fitInto` by setting `max-height`
     * and/or `max-width`.
     */
    constrain(): any;
    _sizeDimension(rect: any, positionedBy: any, start: any, end: any, extent: any): any;

    /**
     * Centers horizontally and vertically if not already positioned. This also sets
     * `position:fixed`.
     */
    center(): any;
  }

  const IronFitBehavior: object;
}
