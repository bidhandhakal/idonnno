'use client';

import { ChevronDown } from 'lucide-react';
import { DropdownMenu } from 'radix-ui';

import { cn } from '@/lib/utils';

export function RulesDropdown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className={cn(
          'inline-flex h-8 items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 text-xs font-medium whitespace-nowrap text-slate-700 outline-none select-none',
          'hover:bg-slate-100 hover:text-slate-900',
          'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
          'data-[state=open]:bg-slate-100 data-[state=open]:text-slate-900',
        )}
      >
        rules
        <ChevronDown className="size-3.5 opacity-70" aria-hidden />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={6}
          align="end"
          className={cn(
            'z-50 min-w-48 overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md',
            'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          )}
        >
          <DropdownMenu.Label className="px-2 py-2 text-left text-xs text-muted-foreground">
            there is no rules
          </DropdownMenu.Label>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
