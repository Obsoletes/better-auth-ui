import { useEffect, type EffectCallback } from 'react';

export const useInit = (action: EffectCallback) => {
  useEffect(action, []);
};
