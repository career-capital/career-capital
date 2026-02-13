import { useState, useEffect, useRef } from 'react';
import { Save, Trash2, Plus, GripVertical, Image as ImageIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import { SectionWithContent, ContentBlock, Button } from '../../lib/supabase';
import { supabase } from '../../lib/supabase';
import IconPicker from './IconPicker';

interface ContentEditorProps {
  section: SectionWithContent;
  onUpdate: () => void;
}

export default function ContentEditor({ section, onUpdate }: ContentEditorProps) {
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [iconPickerTarget, setIconPickerTarget] = useState<ContentBlock | null>(null);
  const [localBlocks, setLocalBlocks] = useState<ContentBlock[]>([]);
  const [localButtons, setLocalButtons] = useState<Button[]>([]);
  const [showPublishModal, setShowPublishModal] = useState(false);

  useEffect(() => {
    setLocalBlocks(section.content_blocks);
    setLocalButtons(section.buttons);
    setHasUnsavedChanges(false);
  }, [section.content_blocks, section.buttons]);

  const updateContentBlockLocal = (blockId: string, updates: Partial<ContentBlock>) => {
    setLocalBlocks(prev =>
      prev.map(block =>
        block.id === blockId
          ? { ...block, ...updates, metadata: updates.metadata !== undefined ? updates.metadata : block.metadata }
          : block
      )
    );
    setHasUnsavedChanges(true);
  };

  const updateButtonLocal = (buttonId: string, updates: Partial<Button>) => {
    setLocalButtons(prev =>
      prev.map(button =>
        button.id === buttonId
          ? { ...button, ...updates }
          : button
      )
    );
    setHasUnsavedChanges(true);
  };

  const handleSaveClick = () => {
    if (section.is_published) {
      setShowPublishModal(true);
    } else {
      saveAllChanges();
    }
  };

  const saveAllChanges = async () => {
    setShowPublishModal(false);
    setSaving(true);

    try {
      for (const block of localBlocks) {
        const { error } = await supabase
          .from('content_blocks')
          .update({
            content: block.content,
            metadata: block.metadata,
          })
          .eq('id', block.id);

        if (error) {
          console.error('Error updating content block:', error);
          throw error;
        }
      }

      for (const button of localButtons) {
        const { error } = await supabase
          .from('buttons')
          .update({
            button_text: button.button_text,
            button_type: button.button_type,
            link_type: button.link_type,
            link_destination: button.link_destination,
            is_external: button.is_external,
          })
          .eq('id', button.id);

        if (error) {
          console.error('Error updating button:', error);
          throw error;
        }
      }

      setHasUnsavedChanges(false);
      onUpdate();
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const addContentBlock = async (blockType: string) => {
    setSaving(true);
    const maxOrder = Math.max(...section.content_blocks.map(b => b.display_order), -1);
    const { error } = await supabase
      .from('content_blocks')
      .insert({
        section_id: section.id,
        block_type: blockType,
        content: 'New content',
        display_order: maxOrder + 1,
        metadata: {},
      });

    if (error) {
      console.error('Error adding content block:', error);
      alert('Failed to add content block');
    } else {
      onUpdate();
    }
    setSaving(false);
  };

  const deleteContentBlock = async (blockId: string) => {
    if (!confirm('Are you sure you want to delete this content block?')) return;

    setSaving(true);
    const { error } = await supabase
      .from('content_blocks')
      .delete()
      .eq('id', blockId);

    if (error) {
      console.error('Error deleting content block:', error);
      alert('Failed to delete content block');
    } else {
      onUpdate();
    }
    setSaving(false);
  };

  const addButton = async () => {
    setSaving(true);
    const maxOrder = Math.max(...section.buttons.map(b => b.display_order), -1);
    const { error } = await supabase
      .from('buttons')
      .insert({
        section_id: section.id,
        button_text: 'New Button',
        button_type: 'primary',
        link_type: 'internal',
        link_destination: '/contact',
        is_external: false,
        display_order: maxOrder + 1,
      });

    if (error) {
      console.error('Error adding button:', error);
      alert('Failed to add button');
    } else {
      onUpdate();
    }
    setSaving(false);
  };

  const deleteButton = async (buttonId: string) => {
    if (!confirm('Are you sure you want to delete this button?')) return;

    setSaving(true);
    const { error } = await supabase
      .from('buttons')
      .delete()
      .eq('id', buttonId);

    if (error) {
      console.error('Error deleting button:', error);
      alert('Failed to delete button');
    } else {
      onUpdate();
    }
    setSaving(false);
  };

  return (
    <>
      {showPublishModal && (
        <div className="fixed inset-0 bg-ink/50 flex items-center justify-center z-50 p-4">
          <div className="bg-trueWhite rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-ink mb-4">Publish Changes to Live Site?</h3>
            <div className="mb-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-yellow-900 mb-2">This section is currently live</p>
                <p className="text-sm text-yellow-800">
                  Your changes will be immediately visible to all website visitors after clicking "Publish Now".
                </p>
              </div>
              <p className="text-sm text-slate">
                Make sure you've reviewed your edits carefully before publishing. You can always make additional changes later.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPublishModal(false)}
                className="flex-1 px-4 py-3 border-2 border-border text-ink font-semibold rounded-lg hover:bg-surface transition-colors"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={saveAllChanges}
                disabled={saving}
                className="flex-1 px-4 py-3 bg-navy text-trueWhite font-semibold rounded-lg hover:bg-navy/90 transition-colors disabled:opacity-50"
              >
                {saving ? 'Publishing...' : 'Publish Now'}
              </button>
            </div>
          </div>
        </div>
      )}
      {showIconPicker && iconPickerTarget && (
        <IconPicker
          value={iconPickerTarget.metadata.icon || ''}
          onChange={(iconName) => {
            updateContentBlockLocal(iconPickerTarget.id, {
              metadata: { ...iconPickerTarget.metadata, icon: iconName }
            });
            setShowIconPicker(false);
            setIconPickerTarget(null);
          }}
          onClose={() => {
            setShowIconPicker(false);
            setIconPickerTarget(null);
          }}
        />
      )}
      <div className="border border-border rounded-lg p-6 mb-4 bg-trueWhite">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-ink">{section.section_type}</h3>
            <p className="text-sm text-slate">Section ID: {section.id.slice(0, 8)}</p>
          </div>
          <button
            onClick={() => setEditMode(!editMode)}
            className="btn-secondary text-sm"
          >
            {editMode ? 'Done Editing' : 'Edit Content'}
          </button>
        </div>

      {editMode && (
        <div className="space-y-6">
          {section.is_published && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <p className="text-sm font-semibold text-blue-900">
                  Editing Live Section
                </p>
              </div>
              <p className="text-sm text-blue-800 mt-2">
                This section is currently visible to website visitors. When you save changes, you'll be asked to confirm before publishing them live.
              </p>
            </div>
          )}
          {hasUnsavedChanges && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-800 text-sm font-medium">You have unsaved changes</span>
                </div>
                <button
                  onClick={handleSaveClick}
                  disabled={saving}
                  className="btn-primary flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          <div>
            <h4 className="text-sm font-semibold text-ink mb-3">Content Blocks</h4>
            <div className="space-y-3">
              {localBlocks
                .sort((a, b) => a.display_order - b.display_order)
                .map((block) => (
                  <div key={block.id} className="border border-border rounded p-3 bg-softWhite">
                    <div className="flex items-start gap-3">
                      <GripVertical className="w-4 h-4 text-slate mt-1 flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-navy bg-navy/10 px-2 py-1 rounded">
                            {block.block_type}
                          </span>
                          <button
                            onClick={() => deleteContentBlock(block.id)}
                            className="text-error hover:text-error/80 transition-colors"
                            disabled={saving}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {block.block_type === 'icon_item' ? (
                          <>
                            <div>
                              <label className="block text-sm font-semibold text-ink mb-2">Icon Selection</label>
                              <div className="flex gap-3">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setIconPickerTarget(block);
                                    setShowIconPicker(true);
                                  }}
                                  className="group flex-shrink-0 w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-border hover:border-navy rounded-xl transition-all bg-surface hover:bg-navy/5 hover:shadow-md"
                                  disabled={saving}
                                >
                                  {block.metadata.icon && (() => {
                                    const IconComponent = Icons[block.metadata.icon as keyof typeof Icons] as any;
                                    return IconComponent ? (
                                      <IconComponent className="w-12 h-12 text-navy group-hover:scale-110 transition-transform" />
                                    ) : (
                                      <ImageIcon className="w-12 h-12 text-slate" />
                                    );
                                  })()}
                                  {!block.metadata.icon && (
                                    <>
                                      <ImageIcon className="w-12 h-12 text-slate mb-1" />
                                      <span className="text-[10px] text-slate font-medium">Click to browse</span>
                                    </>
                                  )}
                                </button>
                                <div className="flex-1">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setIconPickerTarget(block);
                                      setShowIconPicker(true);
                                    }}
                                    className="w-full mb-2 px-4 py-3 bg-navy text-trueWhite rounded-lg hover:bg-navy/90 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                                    disabled={saving}
                                  >
                                    <ImageIcon className="w-4 h-4" />
                                    Browse {Object.keys(Icons).filter(k => k !== 'createLucideIcon' && k !== 'default').length}+ Icons
                                  </button>
                                  <input
                                    type="text"
                                    value={block.metadata.icon || ''}
                                    onChange={(e) => updateContentBlockLocal(block.id, {
                                      metadata: { ...block.metadata, icon: e.target.value }
                                    })}
                                    placeholder="Or type icon name (e.g., MessageCircle)"
                                    className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                                    disabled={saving}
                                  />
                                  {block.metadata.icon && (
                                    <p className="text-xs text-slate mt-1">Current: <span className="font-semibold text-navy">{block.metadata.icon}</span></p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <input
                              type="text"
                              value={block.metadata.title || ''}
                              onChange={(e) => updateContentBlockLocal(block.id, {
                                metadata: { ...block.metadata, title: e.target.value }
                              })}
                              placeholder="Title"
                              className="w-full px-3 py-2 border border-border rounded text-sm"
                              disabled={saving}
                            />
                            <textarea
                              value={block.content}
                              onChange={(e) => updateContentBlockLocal(block.id, { content: e.target.value })}
                              placeholder="Description"
                              rows={3}
                              className="w-full px-3 py-2 border border-border rounded text-sm resize-none"
                              disabled={saving}
                            />
                          </>
                        ) : block.block_type === 'background_image' ? (
                          <>
                            <input
                              type="text"
                              value={block.content}
                              onChange={(e) => updateContentBlockLocal(block.id, { content: e.target.value })}
                              placeholder="Fallback image URL"
                              className="w-full px-3 py-2 border border-border rounded text-sm"
                              disabled={saving}
                            />
                            <input
                              type="text"
                              value={block.metadata.desktop || ''}
                              onChange={(e) => updateContentBlockLocal(block.id, {
                                metadata: { ...block.metadata, desktop: e.target.value }
                              })}
                              placeholder="Desktop image URL"
                              className="w-full px-3 py-2 border border-border rounded text-sm"
                              disabled={saving}
                            />
                            <input
                              type="text"
                              value={block.metadata.tablet || ''}
                              onChange={(e) => updateContentBlockLocal(block.id, {
                                metadata: { ...block.metadata, tablet: e.target.value }
                              })}
                              placeholder="Tablet image URL"
                              className="w-full px-3 py-2 border border-border rounded text-sm"
                              disabled={saving}
                            />
                          </>
                        ) : block.block_type === 'image' ? (
                          <>
                            <input
                              type="text"
                              value={block.content}
                              onChange={(e) => updateContentBlockLocal(block.id, { content: e.target.value })}
                              placeholder="Image URL"
                              className="w-full px-3 py-2 border border-border rounded text-sm"
                              disabled={saving}
                            />
                            <input
                              type="text"
                              value={block.metadata.alt || ''}
                              onChange={(e) => updateContentBlockLocal(block.id, {
                                metadata: { ...block.metadata, alt: e.target.value }
                              })}
                              placeholder="Alt text"
                              className="w-full px-3 py-2 border border-border rounded text-sm"
                              disabled={saving}
                            />
                          </>
                        ) : (
                          <textarea
                            value={block.content}
                            onChange={(e) => updateContentBlockLocal(block.id, { content: e.target.value })}
                            placeholder="Content"
                            rows={block.block_type === 'heading' ? 2 : 4}
                            className="w-full px-3 py-2 border border-border rounded text-sm resize-none"
                            disabled={saving}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <button onClick={() => addContentBlock('heading')} className="text-xs btn-secondary" disabled={saving}>
                <Plus className="w-3 h-3 mr-1" /> Heading
              </button>
              <button onClick={() => addContentBlock('subheading')} className="text-xs btn-secondary" disabled={saving}>
                <Plus className="w-3 h-3 mr-1" /> Subheading
              </button>
              <button onClick={() => addContentBlock('paragraph')} className="text-xs btn-secondary" disabled={saving}>
                <Plus className="w-3 h-3 mr-1" /> Paragraph
              </button>
              <button onClick={() => addContentBlock('badge')} className="text-xs btn-secondary" disabled={saving}>
                <Plus className="w-3 h-3 mr-1" /> Badge
              </button>
              <button onClick={() => addContentBlock('icon_item')} className="text-xs btn-secondary" disabled={saving}>
                <Plus className="w-3 h-3 mr-1" /> Icon Item
              </button>
              <button onClick={() => addContentBlock('image')} className="text-xs btn-secondary" disabled={saving}>
                <Plus className="w-3 h-3 mr-1" /> Image
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink mb-3">Buttons</h4>
            <div className="space-y-3">
              {localButtons
                .sort((a, b) => a.display_order - b.display_order)
                .map((button) => (
                  <div key={button.id} className="border border-border rounded p-3 bg-softWhite">
                    <div className="flex items-start gap-3">
                      <GripVertical className="w-4 h-4 text-slate mt-1 flex-shrink-0" />
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={button.button_text}
                          onChange={(e) => updateButtonLocal(button.id, { button_text: e.target.value })}
                          placeholder="Button text"
                          className="px-3 py-2 border border-border rounded text-sm"
                          disabled={saving}
                        />
                        <select
                          value={button.link_type}
                          onChange={(e) => updateButtonLocal(button.id, { link_type: e.target.value })}
                          className="px-3 py-2 border border-border rounded text-sm"
                          disabled={saving}
                        >
                          <option value="internal">Internal Page</option>
                          <option value="external">External Link</option>
                          <option value="document">Document</option>
                        </select>
                        <input
                          type="text"
                          value={button.link_destination}
                          onChange={(e) => updateButtonLocal(button.id, { link_destination: e.target.value })}
                          placeholder="Destination URL/path"
                          className="px-3 py-2 border border-border rounded text-sm"
                          disabled={saving}
                        />
                        <div>
                          <label className="block text-xs font-medium text-slate mb-1">Button Priority</label>
                          <select
                            value={button.button_type}
                            onChange={(e) => updateButtonLocal(button.id, { button_type: e.target.value })}
                            className="w-full px-3 py-2 border border-border rounded text-sm"
                            disabled={saving}
                          >
                            <option value="primary">Primary - Main call-to-action (most important)</option>
                            <option value="secondary">Secondary - Additional option (less emphasis)</option>
                          </select>
                          <p className="text-xs text-slate mt-1">
                            Use secondary if it's not critical the user takes this action
                          </p>
                        </div>
                        <label className="flex items-center gap-2 col-span-2">
                          <input
                            type="checkbox"
                            checked={button.is_external}
                            onChange={(e) => updateButtonLocal(button.id, { is_external: e.target.checked })}
                            className="w-4 h-4"
                            disabled={saving}
                          />
                          <span className="text-sm text-slate">Show external link icon</span>
                        </label>
                      </div>
                      <button
                        onClick={() => deleteButton(button.id)}
                        className="text-error hover:text-error/80 transition-colors"
                        disabled={saving}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            <button onClick={addButton} className="mt-3 text-sm btn-secondary" disabled={saving}>
              <Plus className="w-4 h-4 mr-1" /> Add Button
            </button>
          </div>

          {hasUnsavedChanges && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-800 text-sm font-medium">Don't forget to save your changes!</span>
                </div>
                <button
                  onClick={handleSaveClick}
                  disabled={saving}
                  className="btn-primary flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      </div>
    </>
  );
}
