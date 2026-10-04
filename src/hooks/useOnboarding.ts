import { useState, useEffect } from 'react';
import { Interest, UserPreferences } from '../types/user';

const STORAGE_KEY = 'ai_launchpad_preferences';

export function useOnboarding() {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      interests: [],
      hasCompletedOnboarding: false,
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (e) {
      console.error('Failed to save preferences to localStorage:', e);
    }
  }, [preferences]);

  const toggleInterest = (interest: Interest) => {
    setPreferences((prev) => {
      const exists = prev.interests.includes(interest);
      const newInterests = exists
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return {
        ...prev,
        interests: newInterests,
      };
    });
  };

  const completeOnboarding = (interests?: Interest[]) => {
    setPreferences((prev) => ({
      interests: interests !== undefined ? interests : prev.interests,
      hasCompletedOnboarding: true,
    }));
  };

  const resetPreferences = () => {
    const defaultState: UserPreferences = {
      interests: [],
      hasCompletedOnboarding: false,
    };
    setPreferences(defaultState);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return {
    preferences,
    interests: preferences.interests,
    hasCompletedOnboarding: preferences.hasCompletedOnboarding,
    toggleInterest,
    completeOnboarding,
    resetPreferences,
  };
}
