"use client";
import { useState, useEffect } from "react";

export default function useLocalStorage(key: string, initialValue: any) {
  const [value, setValue] = useState(initialValue);
  
  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(key);
      setValue(storedValue !== null ? JSON.parse(storedValue) : initialValue);
    } catch (error) {
      console.error("Error reading localStorage", error);
    }
  }, [key, initialValue]);

  useEffect(() => {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  }, [key, value]);

  return [value, setValue];
}
