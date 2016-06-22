// Generated by typings
// Source: https://raw.githubusercontent.com/asvetliakov/typings-radium/d784cae404b6cdf5fbf7fbef65345b1ee7d52bf8/index.d.ts
declare module '~radium/index' {
import * as React from 'react';


namespace Radium {
    interface StyleRules {
        [index: string]: React.CSSProperties;
    }

    /**
     * Style component properties
     */
    export interface StyleProps extends React.Props<Style> {
        /**
         * An object of CSS rules to render. Each key of the rules object is a CSS selector and the value is an object
         * of styles. If rules is empty, the component will render nothing.
         */
        rules: StyleRules;
        /**
         * A string that any included selectors in rules will be appended to.
         * Use to scope styles in the component to a particular element. A good use case might be to generate a unique
         * ID for a component to scope any styles to the particular component that owns the <Style> component instance.
         */
        scopeSelector?: string;
    }

    /**
     * <Style />
     */
    export class Style extends React.Component<StyleProps, any> {}

    /**
     * StyleRoot component properties
     */
    export interface StyleRootProps extends React.HTMLProps<StyleRoot> {}
    /**
     * <StyleRoot />
     */
    export class StyleRoot extends React.Component<StyleRootProps, any> {}

    /**
     * Radium configuration
     */
    export interface RadiumConfig {
        /**
         * Allow to replace matchMedia function that Radium uses. The default one is window.matchMedia
         * @param mediaQuery
         */
        matchMedia?: (mediaQuery: string) => MediaQueryList;
        /**
         * Set the user agent passed to inline-style-prefixer to perform prefixing on style objects.
         * Mainly used during server rendering
         */
        userAgent?: string;
        /**
         * List of plugins
         */
        plugins?: Array<any>;
    }

    /**
     * Query Radium's knowledge of the browser state for a given element key.
     * This is particularly useful if you would like to set styles for one element when another element is in a particular state,
     * e.g. show a message when a button is hovered.
     *
     * Note that the target element specified by elementKey must have the state you'd like to check defined in
     * its style object so that Radium knows to add the handlers. It can be empty, e.g. ':hover': {}.
     * @param state you'll usually pass this.state, but sometimes you may want to pass a previous state, like in shouldComponentUpdate, componentWillUpdate, and componentDidUpdate
     * @param elementKey if you used multiple elements, pass the same key="" or ref="". If you only have one element, you can leave it blank ('main' will be inferred)
     * @param value one of the following: :active, :focus, and :hover
     */
    export function getState(state: any, elementKey: string|void, value: ":active"|":focus"|":hover"): boolean;

    /**
     * Create a keyframes animation for use in an inline style.
     * @param keyframes
     * @param name
     */
    export function keyframes(keyframes: StyleRules, name?: string): Object;

}
// @Radium decorator
function Radium<TElement extends Function>(component: TElement): TElement;
function Radium<TElement extends Function>(config: Radium.RadiumConfig): (component?: TElement) => TElement;

export = Radium;
}
declare module 'radium/index' {
import main = require('~radium/index');
export = main;
}
declare module 'radium' {
import main = require('~radium/index');
export = main;
}
