'use client';

import React from 'react';
import { ChatBot } from './ChatBot';

export function ChatBotLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 max-h-screen overflow-y-auto">
        {children}
      </main>
      <ChatBot />
    </div>
  );
} 