

// Simple state management without context
let globalReady = false;
let globalCurrentFlavor = 0;
const readyListeners: ((ready: boolean) => void)[] = [];
const flavorListeners: ((flavor: number) => void)[] = [];

export function useStore<T>(selector: (state: { ready: boolean; currentFlavor: number }) => T): T {

    // Subscribe to changes (simplified)
    const state = {
        ready: globalReady,
        currentFlavor: globalCurrentFlavor,
    };

    return selector(state);
}

// Helper functions to update global state
export function setReady(ready: boolean) {
    globalReady = ready;
    readyListeners.forEach(listener => listener(ready));
}

export function setCurrentFlavor(flavor: number) {
    globalCurrentFlavor = flavor;
    flavorListeners.forEach(listener => listener(flavor));
}

// For compatibility with existing code
export function StoreProvider({ children }: { children: React.ReactNode }) {
    return children as React.ReactElement;
}