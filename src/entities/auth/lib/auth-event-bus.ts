type Listener = () => void;

const listeners = new Set<Listener>();

export function onAuthExpired(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function notifyAuthExpired() {
  listeners.forEach((listeners) => listeners());
}
