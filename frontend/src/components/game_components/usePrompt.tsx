// usePrompt.tsx
import { useEffect } from 'react';
import { useNavigate, UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import { useContext } from 'react';

export function usePrompt(message: string, when: boolean) {
  const navigate = useNavigate();
  const { navigator } = useContext(NavigationContext);

  useEffect(() => {
    if (!when) return;

    const push = navigator.push;
    const replace = navigator.replace;

    navigator.push = (...args) => {
      if (window.confirm(message)) {
        push(...args);
      }
    };

    navigator.replace = (...args) => {
      if (window.confirm(message)) {
        replace(...args);
      }
    };

    return () => {
      navigator.push = push;
      navigator.replace = replace;
    };
  }, [message, when, navigator]);
}
