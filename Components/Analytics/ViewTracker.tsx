'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { trackBlogView } from '@/util/analytics';

interface ViewTrackerProps {
  blogId: string;
}

export default function ViewTracker({ blogId }: ViewTrackerProps) {
  const { data: session } = useSession();

  useEffect(() => {
    const trackView = async () => {
      // Create a unique identifier for the user
      const userIdentifier =
        session?.user?.dbid ||
        localStorage.getItem('anonymousId') ||
        `anonymous_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Store anonymous ID for future visits
      if (!session?.user?.dbid && !localStorage.getItem('anonymousId')) {
        localStorage.setItem('anonymousId', userIdentifier);
      }

      // Track the view
      await trackBlogView(blogId, userIdentifier);
    };

    // Track view after a short delay to ensure the user actually viewed the content
    const timer = setTimeout(trackView, 2000);

    return () => clearTimeout(timer);
  }, [blogId, session]);

  return null; // This component doesn't render anything
}
