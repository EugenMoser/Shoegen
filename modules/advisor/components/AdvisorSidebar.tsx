"use client";
import { useState } from 'react';

import {
  Brain,
  X,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

import AdvisorChat from './AdvisorChat';

interface AdvisorSidebarProps {}

export default function AdvisorSidebar({}: AdvisorSidebarProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed md:w-1/3 md:h-auto md:max-h-full h-1/2 w-full bottom-4 right-4 z-50">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="hover:cursor-pointer fixed bottom-4 right-4 z-50"
          aria-label="Chat öffnen"
        >
          <Brain className="mr-2" />
          frag Shoegen
        </Button>
      )}
      {isOpen && (
        <Button
          aria-label="Chat schließen"
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="border-none shadow-none hover:cursor-pointer hover:bg-transparent absolute top-2 right-2"
        >
          <X />
        </Button>
      )}
      {isOpen && <AdvisorChat />}
    </div>
  );
}
