import { useState, useEffect, FormEvent } from 'react';
import { supabase, Testimonial } from '../lib/supabase';
import { Plus, Edit2, Trash2, X, ChevronUp, ChevronDown, Tag as TagIcon, Mail, MessageSquare, LogOut } from 'lucide-react';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  organization: string;
  inquiry_type: string;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const ENGAGEMENT_TYPE_TAGS = [
  'Keynote Speaking',
  'Workshop Facilitation',
  'Executive Coaching',
  'Strategy & Roadmap',
];

const OTHER_TAGS = [
  'AI Fluency',
  'Social Wealth',
  'Leadership Development',
  'Relationship Management',
  'Organizational Change',
  'Career Capital',
  'Mindset Shift',
  'AI Readiness',
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'testimonials' | 'contacts'>('testimonials');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [customTag, setCustomTag] = useState('');
  const [formData, setFormData] = useState({
    quote: '',
    author: '',
    company: '',
    display_order: '',
    is_active: true,
    featured: false,
    tags: [] as string[],
    testimonial_type: 'client' as 'client' | 'character_witness',
  });

  useEffect(() => {
    if (activeTab === 'testimonials') {
      fetchTestimonials();
    } else {
      fetchContactSubmissions();
    }
  }, [activeTab]);

  const fetchTestimonials = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching testimonials:', error);
    } else {
      setTestimonials(data || []);
    }
    setLoading(false);
  };

  const fetchContactSubmissions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching contact submissions:', error);
    } else {
      setContactSubmissions(data || []);
    }
    setLoading(false);
  };

  const handleUpdateSubmissionStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('contact_submissions')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      console.error('Error updating submission status:', error);
      alert('Failed to update status');
      return;
    }

    fetchContactSubmissions();
  };

  const handleDeleteSubmission = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) {
      return;
    }

    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting submission:', error);
      alert('Failed to delete submission');
      return;
    }

    fetchContactSubmissions();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const targetPosition = formData.display_order ? parseInt(formData.display_order) : null;

    if (editingId) {
      // Update existing testimonial
      const updateData = { ...formData };
      delete updateData.display_order;

      const { error } = await supabase
        .from('testimonials')
        .update(updateData)
        .eq('id', editingId);

      if (error) {
        console.error('Error updating testimonial:', error);
        alert('Failed to update testimonial');
        return;
      }

      // If position specified, use smart insertion
      if (targetPosition !== null && targetPosition > 0) {
        const { error: positionError } = await supabase.rpc('insert_testimonial_at_position', {
          testimonial_id_param: editingId,
          target_position: targetPosition,
        });

        if (positionError) {
          console.error('Error setting position:', positionError);
          alert('Failed to set position');
          return;
        }
      }
    } else {
      // Create new testimonial
      const maxOrder = testimonials.length > 0
        ? Math.max(...testimonials.map(t => t.display_order))
        : 0;

      const insertData = { ...formData };
      delete insertData.display_order;

      const { data: newTestimonial, error } = await supabase
        .from('testimonials')
        .insert([{ ...insertData, display_order: maxOrder + 1 }])
        .select()
        .single();

      if (error) {
        console.error('Error creating testimonial:', error);
        alert('Failed to create testimonial');
        return;
      }

      // If position specified, move it there with smart insertion
      if (targetPosition !== null && targetPosition > 0 && newTestimonial) {
        const { error: positionError } = await supabase.rpc('insert_testimonial_at_position', {
          testimonial_id_param: newTestimonial.id,
          target_position: targetPosition,
        });

        if (positionError) {
          console.error('Error setting position:', positionError);
          alert('Failed to set position');
          return;
        }
      }
    }

    resetForm();
    fetchTestimonials();
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setFormData({
      quote: testimonial.quote,
      author: testimonial.author,
      company: testimonial.company,
      display_order: testimonial.display_order.toString(),
      is_active: testimonial.is_active,
      featured: testimonial.featured || false,
      tags: testimonial.tags || [],
      testimonial_type: testimonial.testimonial_type || 'client',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }

    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting testimonial:', error);
      alert('Failed to delete testimonial');
      return;
    }

    // Normalize display_order to remove gaps
    const { error: normalizeError } = await supabase.rpc('normalize_testimonials_display_order');

    if (normalizeError) {
      console.error('Error normalizing display order:', normalizeError);
    }

    fetchTestimonials();
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('testimonials')
      .update({ is_active: !currentStatus })
      .eq('id', id);

    if (error) {
      console.error('Error toggling active status:', error);
      alert('Failed to update status');
      return;
    }

    fetchTestimonials();
  };

  const handleToggleFeatured = async (id: string, currentStatus: boolean) => {
    if (!currentStatus) {
      const featuredCount = testimonials.filter(t => t.featured && t.id !== id).length;
      if (featuredCount >= 5) {
        alert('You can only feature up to 5 testimonials at a time. Please unfeature another testimonial first.');
        return;
      }
    }

    const { error } = await supabase
      .from('testimonials')
      .update({ featured: !currentStatus })
      .eq('id', id);

    if (error) {
      console.error('Error toggling featured status:', error);
      alert('Failed to update featured status');
      return;
    }

    fetchTestimonials();
  };

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = testimonials.findIndex(t => t.id === id);
    if (currentIndex === -1) return;

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= testimonials.length) return;

    const currentItem = testimonials[currentIndex];
    const targetItem = testimonials[targetIndex];

    const { error: error1 } = await supabase
      .from('testimonials')
      .update({ display_order: targetItem.display_order })
      .eq('id', currentItem.id);

    const { error: error2 } = await supabase
      .from('testimonials')
      .update({ display_order: currentItem.display_order })
      .eq('id', targetItem.id);

    if (error1 || error2) {
      console.error('Error reordering testimonials:', error1 || error2);
      alert('Failed to reorder testimonials');
      return;
    }

    fetchTestimonials();
  };

  const resetForm = () => {
    setFormData({
      quote: '',
      author: '',
      company: '',
      display_order: '',
      is_active: true,
      featured: false,
      tags: [],
      testimonial_type: 'client',
    });
    setCustomTag('');
    setEditingId(null);
    setShowForm(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const toggleTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.includes(tag)
        ? formData.tags.filter(t => t !== tag)
        : [...formData.tags, tag],
    });
  };

  const addCustomTag = () => {
    const trimmedTag = customTag.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, trimmedTag],
      });
      setCustomTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tagToRemove),
    });
  };

  const handleNormalizeOrder = async () => {
    const { error } = await supabase.rpc('normalize_testimonials_display_order');

    if (error) {
      console.error('Error normalizing display order:', error);
      alert('Failed to normalize order');
      return;
    }

    alert('Display order has been normalized successfully!');
    fetchTestimonials();
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
      alert('Failed to sign out');
      return;
    }
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="bg-softWhite min-h-screen flex items-center justify-center">
        <p className="text-slate">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-softWhite min-h-screen">
      <section aria-labelledby="admin-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="flex justify-between items-center mb-8">
          <h1 id="admin-heading" className="text-4xl md:text-5xl font-light text-ink">Career Capital CMS</h1>
          <button
            onClick={handleLogout}
            className="btn-outline flex items-center gap-2"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'testimonials'
                ? 'text-navy border-b-2 border-navy'
                : 'text-slate hover:text-ink'
            }`}
          >
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Testimonials
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'contacts'
                ? 'text-navy border-b-2 border-navy'
                : 'text-slate hover:text-ink'
            }`}
          >
            <Mail className="w-4 h-4 inline mr-2" />
            Contact Submissions
            {contactSubmissions.filter(s => s.status === 'new').length > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-trueWhite bg-navy rounded-full">
                {contactSubmissions.filter(s => s.status === 'new').length}
              </span>
            )}
          </button>
        </div>

        {activeTab === 'testimonials' && (
          <>
            <div className="flex justify-end items-center mb-8">
              {!showForm && (
                <div className="flex gap-3">
                  <button
                    onClick={handleNormalizeOrder}
                    className="btn-outline text-sm"
                    title="Fix display order gaps and duplicates"
                  >
                    Fix Order
                  </button>
                  <button
                    onClick={() => setShowForm(true)}
                    className="btn-primary flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add New
                  </button>
                </div>
              )}
            </div>

        {showForm && (
          <div className="bg-surface border border-border p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-light text-ink">
                {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h2>
              <button
                onClick={resetForm}
                className="text-slate hover:text-steel transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="quote" className="block text-base font-medium text-ink mb-2">
                  Quote *
                </label>
                <textarea
                  id="quote"
                  name="quote"
                  required
                  rows={4}
                  value={formData.quote}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-colors resize-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="author" className="block text-base font-medium text-ink mb-2">
                    Author (First Name, Last Initial) *
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    required
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="e.g., Gabriela S"
                    className="w-full px-4 py-3 border border-border focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-colors"
                  />
                  <p className="text-sm text-slate mt-1">Period will be added automatically after last initial</p>
                </div>

                <div>
                  <label htmlFor="company" className="block text-base font-medium text-ink mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g., United Airlines"
                    className="w-full px-4 py-3 border border-border focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="testimonial_type" className="block text-base font-medium text-ink mb-2">
                  Testimonial Type *
                </label>
                <select
                  id="testimonial_type"
                  name="testimonial_type"
                  value={formData.testimonial_type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-colors"
                >
                  <option value="client">Client Testimonial</option>
                  <option value="character_witness">Professional Endorsement</option>
                </select>
              </div>

              <div>
                <label htmlFor="display_order" className="block text-base font-medium text-ink mb-2">
                  Display Position (Optional)
                </label>
                <input
                  type="number"
                  id="display_order"
                  name="display_order"
                  min="1"
                  max={testimonials.length + 1}
                  value={formData.display_order}
                  onChange={handleChange}
                  placeholder="Leave blank to add at end"
                  className="w-full px-4 py-3 border border-border focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-colors"
                />
                <p className="text-sm text-slate mt-1">
                  Enter a position number to insert this testimonial at that spot. Other testimonials will automatically shift to make room.
                  {editingId && formData.display_order && ` (Currently at position ${formData.display_order})`}
                </p>
              </div>

              <div>
                <label className="block text-base font-medium text-ink mb-2">
                  Tags
                </label>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-slate uppercase tracking-wide mb-2">
                      Engagement Type (Filterable)
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {ENGAGEMENT_TYPE_TAGS.map(tag => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1 text-sm border transition-colors ${
                            formData.tags.includes(tag)
                              ? 'bg-navy text-trueWhite border-navy'
                              : 'bg-surface text-ink border-border hover:border-navy'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate uppercase tracking-wide mb-2">
                      Topics & Outcomes
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {OTHER_TAGS.map(tag => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1 text-sm border transition-colors ${
                            formData.tags.includes(tag)
                              ? 'bg-navy text-trueWhite border-navy'
                              : 'bg-surface text-ink border-border hover:border-navy'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add custom tag..."
                      value={customTag}
                      onChange={(e) => setCustomTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTag())}
                      className="flex-1 px-4 py-2 border border-border focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-colors text-sm"
                    />
                    <button
                      type="button"
                      onClick={addCustomTag}
                      className="px-4 py-2 bg-surface border border-border hover:border-navy text-ink transition-colors text-sm"
                    >
                      Add Tag
                    </button>
                  </div>

                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                      <span className="text-sm text-slate">Selected tags:</span>
                      {formData.tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-navy text-trueWhite text-sm"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="hover:text-trueWhite/70 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="w-4 h-4 text-navy border-border focus:ring-navy"
                  />
                  <label htmlFor="is_active" className="text-sm font-medium text-ink">
                    Display on website
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={(e) => {
                      const willBeFeatured = e.target.checked;
                      if (willBeFeatured) {
                        const featuredCount = testimonials.filter(t => t.featured && t.id !== editingId).length;
                        if (featuredCount >= 5) {
                          alert('You can only feature up to 5 testimonials at a time. Please unfeature another testimonial first.');
                          return;
                        }
                      }
                      handleChange(e);
                    }}
                    className="w-4 h-4 text-navy border-border focus:ring-navy"
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-ink">
                    Feature on home page (max 5)
                  </label>
                </div>
              </div>

              <div className="flex gap-4">
                <button type="submit" className="btn-primary">
                  {editingId ? 'Update Testimonial' : 'Add Testimonial'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-surface border border-border p-6 ${
                !testimonial.is_active ? 'opacity-60' : ''
              }`}
            >
              <div className="flex justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-2 mb-2">
                    <span className={`text-xs px-2 py-1 ${
                      testimonial.testimonial_type === 'character_witness'
                        ? 'bg-slate/20 text-slate'
                        : 'bg-navy/10 text-navy'
                    }`}>
                      {testimonial.testimonial_type === 'character_witness' ? 'Professional Endorsement' : 'Client'}
                    </span>
                    {testimonial.featured && (
                      <span className="text-xs px-2 py-1 bg-navy text-trueWhite font-medium">
                        Featured on Home
                      </span>
                    )}
                  </div>
                  <p className="text-slate leading-relaxed mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <p className="text-ink"><strong className="font-semibold">{testimonial.author}</strong>, {testimonial.company}</p>
                  {testimonial.tags && testimonial.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {testimonial.tags.map(tag => {
                        const isEngagementType = ENGAGEMENT_TYPE_TAGS.includes(tag);
                        return (
                          <span
                            key={tag}
                            className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs ${
                              isEngagementType
                                ? 'bg-navy text-trueWhite'
                                : 'bg-navy/10 text-navy'
                            }`}
                          >
                            <TagIcon className="w-3 h-3" />
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  )}
                  {!testimonial.is_active && (
                    <p className="text-sm text-slate mt-2">(Hidden from website)</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleReorder(testimonial.id, 'up')}
                      disabled={index === 0}
                      className="p-2 text-slate hover:text-steel transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move up"
                    >
                      <ChevronUp className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleReorder(testimonial.id, 'down')}
                      disabled={index === testimonials.length - 1}
                      className="p-2 text-slate hover:text-steel transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move down"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="p-2 text-slate hover:text-steel transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="p-2 text-slate hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() =>
                        handleToggleActive(testimonial.id, testimonial.is_active)
                      }
                      className="text-xs px-2 py-1 border border-border hover:bg-navy hover:text-trueWhite transition-colors"
                    >
                      {testimonial.is_active ? 'Hide' : 'Show'}
                    </button>
                    <button
                      onClick={() =>
                        handleToggleFeatured(testimonial.id, testimonial.featured)
                      }
                      className={`text-xs px-2 py-1 border transition-colors ${
                        testimonial.featured
                          ? 'border-navy bg-navy text-trueWhite hover:bg-navy/80'
                          : 'border-border hover:bg-navy hover:text-trueWhite'
                      }`}
                    >
                      {testimonial.featured ? 'Featured' : 'Feature'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {testimonials.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate">No testimonials yet. Add your first one above!</p>
            </div>
          )}
        </div>
        </>
        )}

        {activeTab === 'contacts' && (
          <div className="space-y-4">
            {contactSubmissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-surface border border-border p-6"
              >
                <div className="flex justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-medium text-ink">{submission.name}</h3>
                      <span className={`text-xs px-2 py-1 ${
                        submission.status === 'new' ? 'bg-navy text-trueWhite' :
                        submission.status === 'read' ? 'bg-slate/20 text-slate' :
                        submission.status === 'responded' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {submission.status.toUpperCase()}
                      </span>
                      <span className={`text-xs px-2 py-1 ${
                        submission.inquiry_type === 'consulting' ? 'bg-blue-100 text-blue-800' :
                        submission.inquiry_type === 'speaking' ? 'bg-purple-100 text-purple-800' :
                        submission.inquiry_type === 'workshop' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {submission.inquiry_type === 'consulting' ? 'Consulting' :
                         submission.inquiry_type === 'speaking' ? 'Speaking' :
                         submission.inquiry_type === 'workshop' ? 'Workshop' : 'Other'}
                      </span>
                    </div>
                    <p className="text-slate text-sm mb-1">
                      <a href={`mailto:${submission.email}`} className="hover:text-navy transition-colors">
                        {submission.email}
                      </a>
                    </p>
                    {submission.organization && (
                      <p className="text-slate text-sm mb-3">{submission.organization}</p>
                    )}
                    <p className="text-ink leading-relaxed mb-3 whitespace-pre-wrap">
                      {submission.message}
                    </p>
                    <p className="text-xs text-slate">
                      Submitted: {new Date(submission.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <select
                      value={submission.status}
                      onChange={(e) => handleUpdateSubmissionStatus(submission.id, e.target.value)}
                      className="text-xs px-2 py-1 border border-border focus:border-navy focus:ring-1 focus:ring-navy outline-none"
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="responded">Responded</option>
                      <option value="archived">Archived</option>
                    </select>
                    <button
                      onClick={() => handleDeleteSubmission(submission.id)}
                      className="p-2 text-slate hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {contactSubmissions.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate">No contact submissions yet.</p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
