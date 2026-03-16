import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const CategoryManager = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', slug: '' });
  const { token } = useAuth();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:7050/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.name || !newCategory.slug) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:7050/api/admin/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newCategory),
      });

      if (response.ok) {
        const added = await response.json();
        setCategories([...categories, added]);
        setNewCategory({ name: '', slug: '' });
        toast.success('Category added successfully');
      } else {
        toast.error('Failed to add category');
      }
    } catch (error) {
      toast.error('Error adding category');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const response = await fetch(`http://localhost:7050/api/admin/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setCategories(categories.filter(c => c._id !== id));
        toast.success('Category deleted');
      }
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  if (isLoading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="space-y-8 font-body">
      <div>
        <h2 className="text-2xl font-display font-bold mb-1">Manage Categories</h2>
        <p className="text-muted-foreground text-sm">Organize your store structure</p>
      </div>

      <form onSubmit={handleAddCategory} className="bg-secondary/20 p-6 rounded-lg border border-border flex flex-wrap gap-4 items-end">
        <div className="space-y-2 flex-1 min-w-[200px]">
          <Label htmlFor="catName">Category Name</Label>
          <Input 
            id="catName" 
            placeholder="e.g. Sarees" 
            value={newCategory.name} 
            onChange={(e) => {
                const name = e.target.value;
                setNewCategory({ ...newCategory, name, slug: name.toLowerCase().replace(/\s+/g, '-') });
            }}
            required 
          />
        </div>
        <div className="space-y-2 flex-1 min-w-[200px]">
          <Label htmlFor="catSlug">Slug (URL)</Label>
          <Input 
            id="catSlug" 
            placeholder="e.g. sarees" 
            value={newCategory.slug} 
            onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
            required 
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin mr-2" size={16} /> : <Plus size={16} className="mr-2" />}
          Add Category
        </Button>
      </form>

      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-secondary/30 border-b border-border">
            <tr>
              <th className="p-4 font-semibold text-sm">Name</th>
              <th className="p-4 font-semibold text-sm">Slug</th>
              <th className="p-4 font-semibold text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {categories.map((cat) => (
              <tr key={cat._id} className="hover:bg-secondary/10 transition-colors">
                <td className="p-4">{cat.name}</td>
                <td className="p-4 font-mono text-xs">{cat.slug}</td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(cat._id)} className="text-destructive hover:bg-destructive/10">
                    <Trash2 size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {categories.length === 0 && <p className="p-12 text-center text-muted-foreground">No categories found.</p>}
      </div>
    </div>
  );
};

export default CategoryManager;
