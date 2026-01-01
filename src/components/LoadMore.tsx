import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface LoadMoreProps<T> {
  items: T[];
  initialItemsCount?: number;
  itemsPerLoad?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  loadingDelay?: number;
  className?: string;
}

/**
 * Accessible "Load More" component
 * Better alternative to infinite scroll
 * - User has control over loading
 * - Clear completion state
 * - Works with screen readers
 * - Doesn't break browser history
 */
export function LoadMore<T>({
  items,
  initialItemsCount = 6,
  itemsPerLoad = 6,
  renderItem,
  loadingDelay = 500,
  className = ''
}: LoadMoreProps<T>) {
  const [visibleCount, setVisibleCount] = useState(initialItemsCount);
  const [isLoading, setIsLoading] = useState(false);

  const hasMore = visibleCount < items.length;
  const remainingCount = items.length - visibleCount;

  const handleLoadMore = async () => {
    setIsLoading(true);

    // Simulate loading delay for better UX
    await new Promise((resolve) => setTimeout(resolve, loadingDelay));

    setVisibleCount((prev) => Math.min(prev + itemsPerLoad, items.length));
    setIsLoading(false);
  };

  return (
    <div className={className}>
      {/* Items grid/list */}
      <div role="feed" aria-busy={isLoading}>
        {items.slice(0, visibleCount).map((item, index) => (
          <div key={index} role="article">
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {/* Load more button */}
      {hasMore && (
        <div className="mt-12 text-center">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-trueWhite rounded-lg hover:bg-steel transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2"
            aria-label={`Load ${Math.min(itemsPerLoad, remainingCount)} more items. ${remainingCount} remaining.`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                <span>Loading...</span>
              </>
            ) : (
              <span>
                Load More ({remainingCount} remaining)
              </span>
            )}
          </button>
        </div>
      )}

      {/* Completion message */}
      {!hasMore && items.length > initialItemsCount && (
        <div className="mt-12 text-center">
          <p className="text-slate">
            All items loaded ({items.length} total)
          </p>
        </div>
      )}

      {/* Screen reader announcements */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {isLoading && 'Loading more items'}
        {!isLoading && !hasMore && `All ${items.length} items loaded`}
        {!isLoading && hasMore && `Showing ${visibleCount} of ${items.length} items`}
      </div>
    </div>
  );
}
