import { useState } from 'react';
import { Eye, EyeOff, ExternalLink } from 'lucide-react';
import { Page } from '../../lib/supabase';

interface LivePreviewProps {
  page: Page;
}

export default function LivePreview({ page }: LivePreviewProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const refreshPreview = () => {
    setIframeKey(prev => prev + 1);
  };

  const openInNewTab = () => {
    window.open(`/${page.slug}`, '_blank');
  };

  if (!showPreview) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setShowPreview(true)}
          className="btn-primary shadow-lg flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Show Live Preview
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-ink/50 z-40 flex items-center justify-center p-4">
      <div className="bg-trueWhite rounded-lg shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-ink">Live Preview: {page.title}</h3>
            <p className="text-sm text-slate">Viewing: /{page.slug}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={refreshPreview}
              className="btn-secondary text-sm"
            >
              Refresh
            </button>
            <button
              onClick={openInNewTab}
              className="btn-secondary text-sm flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Open in New Tab
            </button>
            <button
              onClick={() => setShowPreview(false)}
              className="btn-primary text-sm flex items-center gap-2"
            >
              <EyeOff className="w-4 h-4" />
              Close Preview
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <iframe
            key={iframeKey}
            src={`/${page.slug}`}
            className="w-full h-full border-0"
            title={`Preview of ${page.title}`}
          />
        </div>
      </div>
    </div>
  );
}
