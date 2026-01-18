import { useState, useMemo } from 'react';
import { Search, X, Tag } from 'lucide-react';
import * as Icons from 'lucide-react';

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
  onClose: () => void;
}

const iconMetadata: Record<string, { categories: string[], keywords: string[] }> = {
  MessageCircle: { categories: ['communication', 'social'], keywords: ['chat', 'talk', 'conversation', 'message', 'speech', 'dialogue'] },
  MessageSquare: { categories: ['communication', 'social'], keywords: ['chat', 'talk', 'conversation', 'message', 'speech', 'comment'] },
  Mail: { categories: ['communication', 'business'], keywords: ['email', 'letter', 'contact', 'message', 'envelope'] },
  Phone: { categories: ['communication', 'business'], keywords: ['call', 'telephone', 'contact', 'ring'] },
  Megaphone: { categories: ['communication', 'marketing'], keywords: ['announce', 'broadcast', 'speech', 'promotion', 'loud', 'speaker'] },
  Users: { categories: ['people', 'business'], keywords: ['team', 'group', 'community', 'crowd', 'collaboration'] },
  User: { categories: ['people', 'business'], keywords: ['person', 'profile', 'account', 'individual'] },
  Target: { categories: ['business', 'marketing'], keywords: ['goal', 'aim', 'focus', 'objective', 'bullseye'] },
  TrendingUp: { categories: ['business', 'analytics'], keywords: ['growth', 'increase', 'profit', 'success', 'rise'] },
  BarChart: { categories: ['business', 'analytics'], keywords: ['graph', 'statistics', 'data', 'metrics', 'report'] },
  PieChart: { categories: ['business', 'analytics'], keywords: ['graph', 'statistics', 'data', 'breakdown', 'report'] },
  Briefcase: { categories: ['business', 'work'], keywords: ['work', 'job', 'career', 'professional', 'office'] },
  Lightbulb: { categories: ['ideas', 'innovation'], keywords: ['idea', 'innovation', 'creative', 'inspiration', 'think'] },
  Rocket: { categories: ['innovation', 'business'], keywords: ['launch', 'startup', 'growth', 'fast', 'space'] },
  Zap: { categories: ['tech', 'energy'], keywords: ['lightning', 'fast', 'power', 'energy', 'electric'] },
  Code: { categories: ['tech', 'development'], keywords: ['programming', 'developer', 'software', 'coding'] },
  Monitor: { categories: ['tech', 'work'], keywords: ['computer', 'screen', 'display', 'desktop'] },
  Smartphone: { categories: ['tech', 'communication'], keywords: ['mobile', 'phone', 'device', 'app'] },
  Globe: { categories: ['tech', 'social'], keywords: ['world', 'internet', 'web', 'global', 'international'] },
  Award: { categories: ['achievement', 'business'], keywords: ['trophy', 'prize', 'achievement', 'recognition', 'winner'] },
  CheckCircle: { categories: ['success', 'ui'], keywords: ['done', 'complete', 'success', 'approved', 'verified'] },
  XCircle: { categories: ['error', 'ui'], keywords: ['cancel', 'error', 'wrong', 'remove', 'delete'] },
  AlertCircle: { categories: ['warning', 'ui'], keywords: ['warning', 'caution', 'alert', 'info', 'notice'] },
  Heart: { categories: ['social', 'emotion'], keywords: ['love', 'like', 'favorite', 'passion', 'care'] },
  Star: { categories: ['rating', 'achievement'], keywords: ['favorite', 'rate', 'quality', 'excellence', 'featured'] },
  ThumbsUp: { categories: ['social', 'feedback'], keywords: ['like', 'approve', 'good', 'positive', 'agree'] },
  Gift: { categories: ['celebration', 'business'], keywords: ['present', 'bonus', 'reward', 'prize', 'package'] },
  Calendar: { categories: ['time', 'business'], keywords: ['date', 'schedule', 'event', 'appointment', 'day'] },
  Clock: { categories: ['time', 'business'], keywords: ['time', 'hour', 'schedule', 'deadline', 'duration'] },
  MapPin: { categories: ['location', 'business'], keywords: ['location', 'place', 'address', 'map', 'navigation'] },
  Home: { categories: ['navigation', 'ui'], keywords: ['house', 'main', 'start', 'homepage'] },
  Settings: { categories: ['ui', 'tech'], keywords: ['options', 'preferences', 'configure', 'admin', 'tools'] },
  Search: { categories: ['ui', 'navigation'], keywords: ['find', 'look', 'magnify', 'explore'] },
  BookOpen: { categories: ['education', 'content'], keywords: ['read', 'learn', 'study', 'knowledge', 'book'] },
  GraduationCap: { categories: ['education', 'achievement'], keywords: ['graduate', 'degree', 'learn', 'student', 'education'] },
  Presentation: { categories: ['communication', 'business'], keywords: ['speech', 'talk', 'meeting', 'present', 'slide', 'speak'] },
  Mic: { categories: ['communication', 'media'], keywords: ['microphone', 'speech', 'talk', 'speak', 'podcast', 'audio'] },
  Video: { categories: ['media', 'communication'], keywords: ['camera', 'film', 'record', 'stream', 'play'] },
  Image: { categories: ['media', 'content'], keywords: ['photo', 'picture', 'visual', 'graphics'] },
  FileText: { categories: ['content', 'business'], keywords: ['document', 'paper', 'file', 'text', 'write'] },
  Download: { categories: ['ui', 'action'], keywords: ['save', 'get', 'receive', 'import'] },
  Upload: { categories: ['ui', 'action'], keywords: ['send', 'share', 'submit', 'export'] },
  Share2: { categories: ['social', 'action'], keywords: ['share', 'send', 'distribute', 'spread'] },
  Link: { categories: ['ui', 'tech'], keywords: ['url', 'connect', 'chain', 'hyperlink'] },
  Lock: { categories: ['security', 'ui'], keywords: ['secure', 'private', 'protected', 'safe', 'password'] },
  Unlock: { categories: ['security', 'ui'], keywords: ['open', 'access', 'unsecure', 'public'] },
  Shield: { categories: ['security', 'protection'], keywords: ['protect', 'safe', 'defend', 'security', 'guard'] },
  Eye: { categories: ['ui', 'visibility'], keywords: ['see', 'view', 'look', 'visible', 'show'] },
  EyeOff: { categories: ['ui', 'visibility'], keywords: ['hide', 'hidden', 'invisible', 'private'] },
  ChevronRight: { categories: ['navigation', 'ui'], keywords: ['next', 'forward', 'arrow', 'right'] },
  ChevronLeft: { categories: ['navigation', 'ui'], keywords: ['back', 'previous', 'arrow', 'left'] },
  ArrowRight: { categories: ['navigation', 'ui'], keywords: ['next', 'forward', 'go', 'continue'] },
  ArrowLeft: { categories: ['navigation', 'ui'], keywords: ['back', 'return', 'previous'] },
  Plus: { categories: ['ui', 'action'], keywords: ['add', 'new', 'create', 'more'] },
  Minus: { categories: ['ui', 'action'], keywords: ['remove', 'less', 'subtract', 'delete'] },
  X: { categories: ['ui', 'action'], keywords: ['close', 'cancel', 'exit', 'remove'] },
  Menu: { categories: ['navigation', 'ui'], keywords: ['hamburger', 'bars', 'options', 'list'] },
  MoreVertical: { categories: ['ui', 'navigation'], keywords: ['options', 'menu', 'dots', 'more'] },
  Filter: { categories: ['ui', 'action'], keywords: ['sort', 'refine', 'funnel', 'select'] },
  RefreshCw: { categories: ['ui', 'action'], keywords: ['reload', 'sync', 'update', 'refresh', 'rotate'] },
  Repeat: { categories: ['ui', 'action'], keywords: ['loop', 'cycle', 'again', 'redo'] },
  Activity: { categories: ['analytics', 'health'], keywords: ['pulse', 'heartbeat', 'monitor', 'stats', 'performance'] },
  Cpu: { categories: ['tech', 'hardware'], keywords: ['processor', 'chip', 'hardware', 'computing'] },
  Database: { categories: ['tech', 'data'], keywords: ['storage', 'data', 'server', 'db'] },
  Server: { categories: ['tech', 'infrastructure'], keywords: ['host', 'cloud', 'data', 'infrastructure'] },
  Wifi: { categories: ['tech', 'connectivity'], keywords: ['wireless', 'internet', 'connection', 'network'] },
  Package: { categories: ['delivery', 'business'], keywords: ['box', 'parcel', 'shipping', 'product'] },
  ShoppingCart: { categories: ['ecommerce', 'business'], keywords: ['buy', 'purchase', 'shop', 'cart', 'basket'] },
  CreditCard: { categories: ['finance', 'business'], keywords: ['payment', 'money', 'pay', 'card', 'transaction'] },
  DollarSign: { categories: ['finance', 'business'], keywords: ['money', 'price', 'cost', 'payment', 'currency'] },
};

const categories = [
  { id: 'communication', label: 'Communication', icon: 'MessageCircle' },
  { id: 'business', label: 'Business', icon: 'Briefcase' },
  { id: 'tech', label: 'Technology', icon: 'Code' },
  { id: 'people', label: 'People', icon: 'Users' },
  { id: 'social', label: 'Social', icon: 'Heart' },
  { id: 'innovation', label: 'Innovation', icon: 'Lightbulb' },
  { id: 'analytics', label: 'Analytics', icon: 'BarChart' },
  { id: 'education', label: 'Education', icon: 'GraduationCap' },
  { id: 'media', label: 'Media', icon: 'Video' },
  { id: 'ui', label: 'Interface', icon: 'Settings' },
];

export default function IconPicker({ value, onChange, onClose }: IconPickerProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const iconList = useMemo(() => {
    const icons = Object.keys(Icons).filter(key => {
      return key !== 'createLucideIcon' &&
             key !== 'default' &&
             typeof Icons[key as keyof typeof Icons] === 'function';
    });
    return icons;
  }, []);

  const filteredIcons = useMemo(() => {
    let filtered = iconList;

    if (selectedCategory) {
      filtered = filtered.filter(name => {
        const meta = iconMetadata[name];
        return meta && meta.categories.includes(selectedCategory);
      });
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(name => {
        if (name.toLowerCase().includes(searchLower)) return true;

        const meta = iconMetadata[name];
        if (meta) {
          return meta.keywords.some(keyword => keyword.includes(searchLower)) ||
                 meta.categories.some(cat => cat.includes(searchLower));
        }
        return false;
      });
    }

    const withMetadata = filtered.filter(name => iconMetadata[name]);
    const withoutMetadata = filtered.filter(name => !iconMetadata[name]);

    return [...withMetadata, ...withoutMetadata];
  }, [search, selectedCategory, iconList]);

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

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or meaning... Try 'speech', 'communication', 'growth'"
              className="w-full pl-11 pr-4 py-3 border-2 border-border rounded-lg text-base focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none transition-all"
              autoFocus
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-navy text-trueWhite shadow-sm'
                  : 'bg-surface text-slate hover:bg-border'
              }`}
            >
              <Tag className="w-3 h-3" />
              All Icons
            </button>
            {categories.map((cat) => {
              const IconComponent = Icons[cat.icon as keyof typeof Icons] as any;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-navy text-trueWhite shadow-sm'
                      : 'bg-surface text-slate hover:bg-border'
                  }`}
                >
                  {IconComponent && <IconComponent className="w-3 h-3" />}
                  {cat.label}
                </button>
              );
            })}
          </div>

          {(search || selectedCategory) && (
            <p className="text-sm text-slate mt-3">
              {selectedCategory && <span className="font-medium">{categories.find(c => c.id === selectedCategory)?.label} category · </span>}
              Found {filteredIcons.length} icon{filteredIcons.length !== 1 ? 's' : ''}
              {search && <span> matching "{search}"</span>}
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
