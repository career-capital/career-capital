import { useState, useEffect } from 'react';
import { Plus, Trash2, Eye, EyeOff, ChevronUp, ChevronDown } from 'lucide-react';
import { supabase, Page, SectionWithContent, SectionTemplate } from '../../lib/supabase';
import ContentEditor from './ContentEditor';
import LivePreview from './LivePreview';

export default function CMSInterface() {
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [sections, setSections] = useState<SectionWithContent[]>([]);
  const [templates, setTemplates] = useState<SectionTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTemplates, setShowTemplates] = useState(false);

  useEffect(() => {
    fetchPages();
    fetchTemplates();
  }, []);

  useEffect(() => {
    if (selectedPage) {
      fetchSections();
    }
  }, [selectedPage]);

  const fetchPages = async () => {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching pages:', error);
    } else if (data) {
      setPages(data);
      if (data.length > 0 && !selectedPage) {
        setSelectedPage(data[0]);
      }
    }
    setLoading(false);
  };

  const fetchSections = async () => {
    if (!selectedPage) return;

    const { data: sectionsData, error: sectionsError } = await supabase
      .from('sections')
      .select('*')
      .eq('page_id', selectedPage.id)
      .order('display_order', { ascending: true });

    if (sectionsError) {
      console.error('Error fetching sections:', sectionsError);
      return;
    }

    const sectionsWithContent: SectionWithContent[] = [];

    for (const section of sectionsData || []) {
      const { data: blocks, error: blocksError } = await supabase
        .from('content_blocks')
        .select('*')
        .eq('section_id', section.id)
        .order('display_order', { ascending: true });

      const { data: buttons, error: buttonsError } = await supabase
        .from('buttons')
        .select('*')
        .eq('section_id', section.id)
        .order('display_order', { ascending: true });

      if (!blocksError && !buttonsError) {
        sectionsWithContent.push({
          ...section,
          content_blocks: blocks || [],
          buttons: buttons || [],
        });
      }
    }

    setSections(sectionsWithContent);
  };

  const fetchTemplates = async () => {
    const { data, error } = await supabase
      .from('section_templates')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching templates:', error);
    } else if (data) {
      setTemplates(data);
    }
  };

  const createPage = async () => {
    const slug = prompt('Enter page slug (e.g., "about", "services"):');
    if (!slug) return;

    const title = prompt('Enter page title:');
    if (!title) return;

    const { data, error } = await supabase
      .from('pages')
      .insert({
        slug,
        title,
        meta_description: '',
        is_published: false,
        display_order: pages.length,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating page:', error);
      alert('Failed to create page');
    } else if (data) {
      setPages([...pages, data]);
      setSelectedPage(data);
    }
  };

  const togglePagePublished = async (page: Page) => {
    const { error } = await supabase
      .from('pages')
      .update({ is_published: !page.is_published })
      .eq('id', page.id);

    if (error) {
      console.error('Error updating page:', error);
      alert('Failed to update page');
    } else {
      fetchPages();
    }
  };

  const createSectionFromTemplate = async (template: SectionTemplate) => {
    if (!selectedPage) return;

    const config = template.default_config as any;

    const { data: newSection, error: sectionError } = await supabase
      .from('sections')
      .insert({
        page_id: selectedPage.id,
        section_type: template.section_type,
        display_order: sections.length,
        is_published: true,
        background_color: config.background_color || 'bg-softWhite',
        text_color: config.text_color || 'text-ink',
        padding: config.padding || 'py-24',
      })
      .select()
      .single();

    if (sectionError) {
      console.error('Error creating section:', sectionError);
      alert('Failed to create section');
      return;
    }

    switch (template.section_type) {
      case 'hero_banner':
        await supabase.from('content_blocks').insert([
          { section_id: newSection.id, block_type: 'heading', content: 'New Hero Heading', display_order: 0, metadata: {} },
          { section_id: newSection.id, block_type: 'subheading', content: 'Hero subheading', display_order: 1, metadata: {} },
          { section_id: newSection.id, block_type: 'paragraph', content: 'Hero description text', display_order: 2, metadata: {} },
        ]);
        break;

      case 'icon_grid_3':
        await supabase.from('content_blocks').insert([
          { section_id: newSection.id, block_type: 'section_heading', content: 'Section Heading', display_order: 0, metadata: {} },
          { section_id: newSection.id, block_type: 'icon_item', content: 'Description for item 1', display_order: 1, metadata: { icon: 'Circle', title: 'Item 1' } },
          { section_id: newSection.id, block_type: 'icon_item', content: 'Description for item 2', display_order: 2, metadata: { icon: 'Circle', title: 'Item 2' } },
          { section_id: newSection.id, block_type: 'icon_item', content: 'Description for item 3', display_order: 3, metadata: { icon: 'Circle', title: 'Item 3' } },
        ]);
        break;

      case 'cta':
        await supabase.from('content_blocks').insert([
          { section_id: newSection.id, block_type: 'heading', content: 'Call to Action Heading', display_order: 0, metadata: {} },
          { section_id: newSection.id, block_type: 'paragraph', content: 'CTA description text', display_order: 1, metadata: {} },
        ]);
        await supabase.from('buttons').insert([
          { section_id: newSection.id, button_text: 'Get Started', button_type: 'primary', link_type: 'internal', link_destination: '/contact', is_external: false, display_order: 0 },
        ]);
        break;

      case 'text_block':
        await supabase.from('content_blocks').insert([
          { section_id: newSection.id, block_type: 'heading', content: 'Section Heading', display_order: 0, metadata: {} },
          { section_id: newSection.id, block_type: 'paragraph', content: 'Paragraph text goes here', display_order: 1, metadata: {} },
        ]);
        break;

      case 'image_text':
        await supabase.from('content_blocks').insert([
          { section_id: newSection.id, block_type: 'heading', content: 'Image + Text Heading', display_order: 0, metadata: {} },
          { section_id: newSection.id, block_type: 'paragraph', content: 'Content text goes here', display_order: 1, metadata: {} },
          { section_id: newSection.id, block_type: 'image', content: '/placeholder-image.jpg', display_order: 2, metadata: { alt: 'Image description', image_position: 'left' } },
        ]);
        break;
    }

    setShowTemplates(false);
    fetchSections();
  };

  const deleteSection = async (sectionId: string, sectionType: string) => {
    const confirmed = window.confirm(
      `Delete this ${sectionType} section?\n\n` +
      `This will permanently delete:\n` +
      `• All content blocks in this section\n` +
      `• All buttons in this section\n\n` +
      `This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      await supabase.from('content_blocks').delete().eq('section_id', sectionId);
      await supabase.from('buttons').delete().eq('section_id', sectionId);

      const { error } = await supabase
        .from('sections')
        .delete()
        .eq('id', sectionId);

      if (error) throw error;

      alert('Section deleted successfully');
      fetchSections();
    } catch (error) {
      console.error('Error deleting section:', error);
      alert('Failed to delete section. Please try again.');
    }
  };

  const toggleSectionPublished = async (section: SectionWithContent) => {
    const { error } = await supabase
      .from('sections')
      .update({ is_published: !section.is_published })
      .eq('id', section.id);

    if (error) {
      console.error('Error updating section:', error);
      alert('Failed to update section');
    } else {
      fetchSections();
    }
  };

  const moveSectionUp = async (index: number) => {
    if (index === 0) return;

    const newSections = [...sections];
    [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];

    await supabase.from('sections').update({ display_order: index - 1 }).eq('id', newSections[index - 1].id);
    await supabase.from('sections').update({ display_order: index }).eq('id', newSections[index].id);

    fetchSections();
  };

  const moveSectionDown = async (index: number) => {
    if (index === sections.length - 1) return;

    const newSections = [...sections];
    [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];

    await supabase.from('sections').update({ display_order: index }).eq('id', newSections[index].id);
    await supabase.from('sections').update({ display_order: index + 1 }).eq('id', newSections[index + 1].id);

    fetchSections();
  };

  if (loading) {
    return <div className="text-slate">Loading CMS...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-trueWhite border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-ink">Content Management System</h2>
          <button onClick={createPage} className="btn-primary text-sm">
            <Plus className="w-4 h-4 mr-1" /> New Page
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => setSelectedPage(page)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                selectedPage?.id === page.id
                  ? 'bg-navy text-trueWhite'
                  : 'bg-surface text-ink hover:bg-border'
              }`}
            >
              {page.title}
              {page.is_published ? (
                <Eye className="w-3 h-3" />
              ) : (
                <EyeOff className="w-3 h-3" />
              )}
            </button>
          ))}
        </div>
      </div>

      {selectedPage && (
        <>
          <div className="bg-trueWhite border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-ink">{selectedPage.title}</h3>
                <p className="text-sm text-slate">Slug: /{selectedPage.slug}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => togglePagePublished(selectedPage)}
                  className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                    selectedPage.is_published
                      ? 'bg-success/10 text-success hover:bg-success/20'
                      : 'bg-slate/10 text-slate hover:bg-slate/20'
                  }`}
                >
                  {selectedPage.is_published ? 'Published' : 'Draft'}
                </button>
                <button
                  onClick={() => setShowTemplates(!showTemplates)}
                  className="btn-primary text-sm"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Section
                </button>
              </div>
            </div>

            {showTemplates && (
              <div className="mt-6 p-6 bg-surface rounded-lg border-2 border-dashed border-border">
                <h4 className="text-base font-semibold text-ink mb-4">Choose a section template:</h4>
                {templates.length === 0 ? (
                  <p className="text-slate">Loading templates...</p>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {templates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => createSectionFromTemplate(template)}
                        className="text-left p-5 bg-trueWhite border-2 border-border rounded-lg hover:border-navy hover:shadow-md transition-all group"
                      >
                        <h5 className="font-semibold text-navy group-hover:text-navy/80 mb-2">{template.name}</h5>
                        <p className="text-sm text-slate leading-relaxed">{template.description}</p>
                        <p className="text-xs text-navy font-medium mt-3">Click to add →</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-ink">Page Sections ({sections.length})</h3>
            {sections.length === 0 ? (
              <p className="text-slate">No sections yet. Add a section using the templates above.</p>
            ) : (
              sections.map((section, index) => (
                <div
                  key={section.id}
                  className={`bg-trueWhite border-2 rounded-lg p-4 transition-all ${
                    section.is_published
                      ? 'border-border'
                      : 'border-dashed border-slate/30 bg-slate/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => moveSectionUp(index)}
                          disabled={index === 0}
                          className="text-slate hover:text-navy disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => moveSectionDown(index)}
                          disabled={index === sections.length - 1}
                          className="text-slate hover:text-navy disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className={`font-semibold ${section.is_published ? 'text-ink' : 'text-slate'}`}>
                            {section.section_type}
                          </h4>
                          {!section.is_published && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate/20 text-slate text-xs font-medium rounded">
                              <EyeOff className="w-3 h-3" />
                              Hidden from visitors
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate">Order: {index + 1}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleSectionPublished(section)}
                        className={`px-3 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                          section.is_published
                            ? 'bg-success/10 text-success hover:bg-success/20'
                            : 'bg-slate/10 text-slate hover:bg-slate/20 border-2 border-dashed border-slate/30'
                        }`}
                        title={section.is_published ? 'Hide this section from visitors' : 'Show this section to visitors'}
                      >
                        {section.is_published ? (
                          <>
                            <Eye className="w-4 h-4" />
                            Visible
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-4 h-4" />
                            Hidden
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => deleteSection(section.id, section.section_type)}
                        className="p-2 hover:bg-error/10 rounded transition-colors text-error"
                        title="Delete section permanently"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <ContentEditor section={section} onUpdate={fetchSections} />
                </div>
              ))
            )}
          </div>
        </>
      )}

      {selectedPage && <LivePreview page={selectedPage} />}
    </div>
  );
}
