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
    <div className="fixed inset-0 bg-ink/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-trueWhite rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-ink mb-1">Choose an Icon</h3>
              <p className="text-sm text-slate">
                Browse {iconList.length} icons · {value && <span className="text-navy font-semibold">Currently: {value}</span>}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-surface rounded-lg transition-colors flex-shrink-0"
            >
              <X className="w-6 h-6 text-slate" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name... Try 'arrow', 'user', 'star', 'check', 'heart', 'home'"
              className="w-full pl-11 pr-4 py-3 border-2 border-border rounded-lg text-base focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none transition-all"
              autoFocus
            />
          </div>
          {search && (
            <p className="text-sm text-slate mt-2">
              Found {filteredIcons.length} icon{filteredIcons.length !== 1 ? 's' : ''} matching "{search}"
            </p>
          )}
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
            {filteredIcons.map((iconName) => (
              <button
                key={iconName}
                onClick={() => handleIconClick(iconName)}
                className={`
                  group aspect-square flex flex-col items-center justify-center p-4
                  rounded-xl border-2 transition-all duration-200
                  ${value === iconName
                    ? 'bg-navy text-trueWhite border-navy shadow-lg scale-105'
                    : 'bg-trueWhite text-ink border-border hover:border-navy hover:bg-navy/5 hover:scale-105 hover:shadow-md'
                  }
                `}
                title={iconName}
              >
                <div className="mb-2 transition-transform group-hover:scale-110">
                  {renderIcon(iconName)}
                </div>
                <span className={`text-[9px] leading-tight text-center break-all line-clamp-2 font-medium ${
                  value === iconName ? 'text-trueWhite' : 'text-slate'
                }`}>
                  {iconName}
                </span>
              </button>
            ))}
          </div>
          {filteredIcons.length === 0 && (
            <div className="text-center py-16 text-slate">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium mb-2">No icons found matching "{search}"</p>
              <p className="text-sm">Try different keywords like "arrow", "user", "star", "check", or "heart"</p>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-border bg-surface/50">
          <p className="text-xs text-slate text-center">
            Showing {filteredIcons.length} of {iconList.length} icons · Click any icon to select
          </p>
        </div>
      </div>
    </div>
  );
}
