import React from 'react';

// CoreVisuals: Centralized state management for 3D landing page
// Manages 3D scene readiness, theme variations, and responsive behaviors across components

let coreVisualsReady = false; // Tracks the initialization of the 3D scene
let currentCoreVisualsTheme = 0; // Controls the active theme/flavor
const readyListeners: ((ready: boolean) => void)[] = []; // Listeners for readiness changes
const themeListeners: ((theme: number) => void)[] = []; // Listeners for theme updates

// CoreVisuals state selector for optimized component subscriptions
export function useStore<T>(selector: (state: { coreVisualsReady: boolean; currentCoreVisualsTheme: number }) => T): T {
    const state = {
        coreVisualsReady: coreVisualsReady,
        currentCoreVisualsTheme: currentCoreVisualsTheme,
    };

    return selector(state);
}

// Triggers updates to all components that depend on 3D initialization
export function setCoreVisualsReady(ready: boolean) {
    coreVisualsReady = ready;
    readyListeners.forEach(listener => listener(ready));
}

// Triggers updates to all components based on theme preferences
export function setCurrentCoreVisualsTheme(theme: number) {
    currentCoreVisualsTheme = theme;
    themeListeners.forEach(listener => listener(theme));
}

// Required to ensure proper app initialization through base React setup
export function StoreProvider({ children }: { children: React.ReactNode }): React.ReactElement {
    return children as React.ReactElement;
}