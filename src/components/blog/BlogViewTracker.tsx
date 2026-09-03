'use client';

import { useEffect } from 'react';

export function BlogViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    // Count every page open as 1 view — no deduplication
    fetch(`/api/blog/${slug}/views`, { method: 'POST' }).catch(() => {});
  }, [slug]);

  return null;
}

