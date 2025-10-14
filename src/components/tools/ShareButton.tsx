'use client';

import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface ShareButtonProps {
  text: string;
  title?: string;
  className?: string;
}

export default function ShareButton({ text, title = 'Check this out!', className = '' }: ShareButtonProps) {
  const handleShare = async () => {
    // Generate a shareable link (could be enhanced with URL shortening)
    const shareUrl = window.location.href;
    const shareText = `${title}\n\n${text.substring(0, 200)}${text.length > 200 ? '...' : ''}`;

    // Try native sharing first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url: shareUrl,
        });
        toast.success('Shared successfully!');
      } catch (error: unknown) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error sharing:', error);
          fallbackShare(shareUrl, shareText);
        }
      }
    } else {
      fallbackShare(shareUrl, shareText);
    }
  };

  const fallbackShare = (url: string, text: string) => {
    // Copy link to clipboard as fallback
    const shareContent = `${text}\n\n${url}`;
    navigator.clipboard.writeText(shareContent)
      .then(() => {
        toast.success('Link copied to clipboard!');
      })
      .catch(() => {
        toast.error('Failed to share');
      });
  };

  return (
    <motion.button
      onClick={handleShare}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-600 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-medium transition-colors ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Share2 className="w-4 h-4" />
      <span>Share</span>
    </motion.button>
  );
}
