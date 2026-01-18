import { useState } from 'react';
import { Save, Trash2, Plus, GripVertical } from 'lucide-react';
import { SectionWithContent, ContentBlock, Button } from '../../lib/supabase';
import { supabase } from '../../lib/supabase';

interface ContentEditorProps {
  section: SectionWithContent;
  onUpdate: () => void;
}

export default function ContentEditor({ section, onUpdate }: ContentEditorProps) {
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const updateContentBlock = async (block: ContentBlock, updates: Partial<ContentBlock>) => {
    setSaving(true);
    const { error } = await supabase
      .from('content_blocks')
      .update({
        content: updates.content !== undefined ? updates.content : block.content,
        metadata: updates.metadata !== undefined ? updates.metadata : block.metadata,
      })
      .eq('id', block.id);

    if (error) {
      console.error('Error updating content block:', error);
      alert('Failed to update content');
    } else {
      onUpdate();
    }
    setSaving(false);
  };

  const updateButton = async (button: Button, updates: Partial<Button>) => {
    setSaving(true);
    const { error } = await supabase
      .from('buttons')
      .update(updates)
      .eq('id', button.id);

    if (error) {
      console.error('Error updating button:', error);
      alert('Failed to update button');
    } else {
      onUpdate();
    }
    setSaving(false);
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
        style_variant: 'btn-primary',
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
          <div>
            <h4 className="text-sm font-semibold text-ink mb-3">Content Blocks</h4>
            <div className="space-y-3">
              {section.content_blocks
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
                            <input
                              type="text"
                              value={block.metadata.icon || ''}
                              onChange={(e) => updateContentBlock(block, {
                                metadata: { ...block.metadata, icon: e.target.value }
                              })}
                              placeholder="Icon name (e.g., MessageCircle)"
                              className="w-full px-3 py-2 border border-border rounded text-sm"
                              disabled={saving}
                            />
                            <input
                              type="text"
                              value={block.metadata.title || ''}
                              onChange={(e) => updateContentBlock(block, {
                                metadata: { ...block.metadata, title: e.target.value }
                              })}
                              placeholder="Title"
                              className="w-full px-3 py-2 border border-border rounded text-sm"
                              disabled={saving}
                            />
                            <textarea
                              value={block.content}
                              onChange={(e) => updateContentBlock(block, { content: e.target.value })}
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
                              onChange={(e) => updateContentBlock(block, { content: e.target.value })}
                              placeholder="Fallback image URL"
                              className="w-full px-3 py-2 border border-border rounded text-sm"
                              disabled={saving}
                            />
                            <input
                              type="text"
                              value={block.metadata.desktop || ''}
                              onChange={(e) => updateContentBlock(block, {
                                metadata: { ...block.metadata, desktop: e.target.value }
                              })}
                              placeholder="Desktop image URL"
                              className="w-full px-3 py-2 border border-border rounded text-sm"
                              disabled={saving}
                            />
                            <input
                              type="text"
                              value={block.metadata.tablet || ''}
                              onChange={(e) => updateContentBlock(block, {
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
                              onChange={(e) => updateContentBlock(block, { content: e.target.value })}
                              placeholder="Image URL"
                              className="w-full px-3 py-2 border border-border rounded text-sm"
                              disabled={saving}
                            />
                            <input
                              type="text"
                              value={block.metadata.alt || ''}
                              onChange={(e) => updateContentBlock(block, {
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
                            onChange={(e) => updateContentBlock(block, { content: e.target.value })}
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
              {section.buttons
                .sort((a, b) => a.display_order - b.display_order)
                .map((button) => (
                  <div key={button.id} className="border border-border rounded p-3 bg-softWhite">
                    <div className="flex items-start gap-3">
                      <GripVertical className="w-4 h-4 text-slate mt-1 flex-shrink-0" />
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={button.button_text}
                          onChange={(e) => updateButton(button, { button_text: e.target.value })}
                          placeholder="Button text"
                          className="px-3 py-2 border border-border rounded text-sm"
                          disabled={saving}
                        />
                        <select
                          value={button.link_type}
                          onChange={(e) => updateButton(button, { link_type: e.target.value })}
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
                          onChange={(e) => updateButton(button, { link_destination: e.target.value })}
                          placeholder="Destination URL/path"
                          className="px-3 py-2 border border-border rounded text-sm"
                          disabled={saving}
                        />
                        <select
                          value={button.style_variant}
                          onChange={(e) => updateButton(button, { style_variant: e.target.value })}
                          className="px-3 py-2 border border-border rounded text-sm"
                          disabled={saving}
                        >
                          <option value="btn-primary">Primary</option>
                          <option value="btn-primary-on-dark">Primary on Dark</option>
                          <option value="btn-secondary">Secondary</option>
                          <option value="btn-secondary-on-dark">Secondary on Dark</option>
                        </select>
                        <label className="flex items-center gap-2 col-span-2">
                          <input
                            type="checkbox"
                            checked={button.is_external}
                            onChange={(e) => updateButton(button, { is_external: e.target.checked })}
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

          {saving && (
            <div className="text-sm text-slate flex items-center gap-2">
              <Save className="w-4 h-4 animate-pulse" />
              Saving changes...
            </div>
          )}
        </div>
      )}
    </div>
  );
}
