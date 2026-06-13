# Hooks Directory

This directory contains custom React hooks used across the Zion Cakes & Bites application.

## Directory Structure

All custom hooks should be placed directly in this directory and follow the standard camelCase naming convention prefixed with `use` (e.g. `useAuth.ts`, `useLocalStorage.ts`).

## Guidelines & Architecture

1. **Abstraction Layer**: Hooks act as clean, framework-agnostic or provider-agnostic interfaces. For example, `useAuth.ts` wraps the React context and Firebase Auth logic. If the authentication provider is swapped in the future (e.g., to Auth0 or Supabase), page and component files only consume `useAuth()` and remain completely untouched.
2. **Client-side only**: Since Next.js App Router renders pages on the server by default, ensure hooks consuming client-side state or window APIs are labeled with `'use client'` at the top of the file.
3. **Focused Responsibility**: Keep hooks focused on a single responsibility. Avoid grouping unrelated business logic into single monolithic hooks.
4. **Context Access**: For hooks that consume React Contexts, provide helpful runtime errors if the hook is invoked outside of its corresponding context provider.

## Available Hooks

- [useAuth.ts](file:///d:/projects/zion/hooks/useAuth.ts) — Convenience hook for subscribing to current user state, loading status, Google OAuth sign-in, and sign-out actions.
