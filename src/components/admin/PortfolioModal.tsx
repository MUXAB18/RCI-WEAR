import React, { useState, useEffect } from 'react';
type PortfolioProject = any;

type PortfolioModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<PortfolioProject>) => Promise<void>;
  project?: PortfolioProject | null;
};

export function PortfolioModal({ isOpen, onClose, onSave, project }: PortfolioModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    imageUrl: '',
    isFeatured: false,
    order: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        category: project.category,
        imageUrl: project.imageUrl,
        isFeatured: project.isFeatured,
        order: project.order,
      });
    } else {
      setFormData({
        title: '',
        category: '',
        imageUrl: '',
        isFeatured: false,
        order: 0,
      });
    }
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSave(formData);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">{project ? 'Edit Project' : 'Add New Project'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-black outline-none transition"
              placeholder="e.g. Dead Snake Custom"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-black outline-none transition"
              placeholder="e.g. Hoodies"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-black outline-none transition"
              placeholder="e.g. /portfolio/IMG_5442.PNG"
            />
            {formData.imageUrl && (
              <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                Preview: 
                <img src={formData.imageUrl} alt="Preview" className="w-10 h-10 object-cover rounded" />
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-black outline-none transition"
              />
            </div>
            
            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                />
                <span className="text-sm font-medium text-gray-700">Feature on Home</span>
              </label>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-md transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
