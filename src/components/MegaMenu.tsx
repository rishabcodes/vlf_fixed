'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { MegaMenuItem } from '@/lib/navData';

interface MegaMenuProps {
  item: MegaMenuItem;
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ item, isOpen, onClose }: MegaMenuProps) {
  if (!isOpen || !item.columns) return null;

  return (
    <div className="absolute left-0 w-full mt-1 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-zinc-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-3 gap-8">
            {item.columns.map((column, idx) => (
              <div key={idx}>
                <h3 className="font-semibold text-zinc-900 mb-3 text-sm uppercase tracking-wide">
                  {column.title}
                </h3>
                <ul className="space-y-2">
                  {column.items.map((subItem) => (
                    <li key={subItem.href}>
                      <Link
                        href={subItem.href}
                        onClick={onClose}
                        className="group flex items-center text-sm text-zinc-600 hover:text-amber-600 transition-colors"
                      >
                        <ChevronRight className="h-3 w-3 mr-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        <span>{subItem.name}</span>
                        {subItem.description && (
                          <span className="ml-2 text-xs text-zinc-400">{subItem.description}</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            
            {/* Optional: Testimonial Card */}
            <div className="col-span-3 mt-4 pt-4 border-t border-zinc-100">
              <div className="bg-amber-50 rounded-lg p-4">
                <p className="text-sm text-zinc-700 italic">
                  "Vasquez Law Firm helped me navigate my immigration case with expertise and compassion."
                </p>
                <p className="mt-2 text-xs text-zinc-600 font-medium">
                  - Maria G., Client
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}