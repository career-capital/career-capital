import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import * as Icons from 'lucide-react';

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
  onClose: () => void;
}

export default function IconPicker({ value, onChange, onClose }: IconPickerProps) {
  const [search, setSearch] = useState('');

  const iconList = useMemo(() => {
    const icons = Object.keys(Icons).filter(key => {
      return key !== 'createLucideIcon' &&
             key !== 'default' &&
             typeof Icons[key as keyof typeof Icons] === 'function';
    });
    return icons;
  }, []);

  const filteredIcons = useMemo(() => {
    if (!search) return iconList;
    return iconList.filter(name =>
      name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, iconList]);

  const handleIconClick = (iconName: string) => {
    onChange(iconName);
    onClose();
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons] as any;
    if (!IconComponent) return null;
    return <IconComponent className="w-6 h-6" />;
  };

  return (
    <div className="fixed inset-0 bg-ink/50 flex items-center justify-center z-50 p-4">
      <div className="bg-trueWhite rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-ink mb-2">Choose an Icon</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search icons... (e.g., 'arrow', 'user', 'heart')"
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:border-navy focus:ring-1 focus:ring-navy outline-none"
                autoFocus
              />
            </div>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 hover:bg-surface rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1">
          <p className="text-xs text-slate mb-4">
            Showing {filteredIcons.length} of {iconList.length} icons
            {value && (
              <span className="ml-2">
                · Currently selected: <span className="font-semibold text-navy">{value}</span>
              </span>
            )}
          </p>
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
            {filteredIcons.map((iconName) => (
              <button
                key={iconName}
                onClick={() => handleIconClick(iconName)}
                className={`
                  aspect-square flex flex-col items-center justify-center p-3
                  rounded-lg border transition-all hover:scale-105
                  ${value === iconName
                    ? 'bg-navy text-trueWhite border-navy shadow-md'
                    : 'bg-surface text-ink border-border hover:border-navy hover:bg-navy/5'
                  }
                `}
                title={iconName}
              >
                <div className="mb-1">{renderIcon(iconName)}</div>
                <span className="text-[8px] leading-tight text-center break-all line-clamp-2">
                  {iconName}
                </span>
              </button>
            ))}
          </div>
          {filteredIcons.length === 0 && (
            <div className="text-center py-12 text-slate">
              <p>No icons found matching "{search}"</p>
              <p className="text-xs mt-2">Try different keywords like "arrow", "user", or "heart"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
