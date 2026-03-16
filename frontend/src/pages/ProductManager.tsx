import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Edit, Plus, Loader2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { API_URL } from '@/data/products';

const ProductManager = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({
    name: '',
    category: '',
    price: '',
    originalPrice: '',
    image: '',
    fabric: '',
    description: '',
    badge: ''
  });
  const { token } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [pRes, cRes] = await Promise.all([
        fetch(`${API_URL}/api/products`),
        fetch(`${API_URL}/api/categories`)
      ]);
      const [pData, cData] = await Promise.all([pRes.json(), cRes.json()]);
      setProducts(pData);
      setCategories(cData);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing 
      ? `${API_URL}/api/admin/products/${formData._id}` 
      : `${API_URL}/api/admin/products`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(isEditing ? 'Product updated' : 'Product added');
        setIsEditing(false);
        setFormData({ name: '', category: '', price: '', originalPrice: '', image: '', fabric: '', description: '', badge: '' });
        fetchData();
      }
    } catch (error) {
      toast.error('Error saving product');
    }
  };

  const handleEdit = (product: any) => {
    setFormData(product);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const response = await fetch(`${API_URL}/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setProducts(products.filter(p => p._id !== id));
        toast.success('Product deleted');
      }
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  if (isLoading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="space-y-10 font-body">
      <div>
        <h2 className="text-2xl font-display font-bold mb-1">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
        <p className="text-muted-foreground text-sm">Manage your inventory items</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-secondary/20 p-8 rounded-xl border border-border grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input id="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={v => setFormData({...formData, category: v})}>
             <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
             <SelectContent>
                {categories.map(c => <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>)}
             </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (₹)</Label>
          <Input id="price" type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="originalPrice">Original Price (optional)</Label>
          <Input id="originalPrice" type="number" value={formData.originalPrice} onChange={e => setFormData({...formData, originalPrice: e.target.value})} />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="image">Product Image</Label>
          <div className="flex items-center gap-4">
            {formData.image && (
              <div className="w-20 h-20 rounded-lg overflow-hidden border border-border">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-1">
              <Input 
                id="image" 
                type="file" 
                accept="image/*" 
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  
                  const uploadFormData = new FormData();
                  uploadFormData.append('image', file);
                  
                  try {
                    toast.loading('Uploading image...');
                    const response = await fetch(`${API_URL}/api/admin/upload`, {
                      method: 'POST',
                      headers: {
                        'Authorization': `Bearer ${token}`
                      },
                      body: uploadFormData,
                    });
                    
                    const data = await response.json();
                    toast.dismiss();
                    
                    if (response.ok) {
                      setFormData({ ...formData, image: data.imageUrl });
                      toast.success('Image uploaded successfully');
                    } else {
                      toast.error(data.message || 'Upload failed');
                    }
                  } catch (error) {
                    toast.dismiss();
                    toast.error('Upload error');
                  }
                }} 
              />
              <p className="text-[10px] text-muted-foreground mt-1">Upload a product photo (PNG, JPG up to 5MB)</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fabric">Fabric</Label>
          <Input id="fabric" value={formData.fabric} onChange={e => setFormData({...formData, fabric: e.target.value})} placeholder="e.g. Pure Silk" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="badge">Badge</Label>
          <Input id="badge" value={formData.badge} onChange={e => setFormData({...formData, badge: e.target.value})} placeholder="e.g. New Arrival" />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} />
        </div>

        <div className="md:col-span-2 flex gap-3 pt-2">
          <Button type="submit" className="px-8">
            {isEditing ? 'Update Product' : 'Add Product'}
          </Button>
          {isEditing && (
            <Button variant="outline" type="button" onClick={() => {
              setIsEditing(false);
              setFormData({ name: '', category: '', price: '', originalPrice: '', image: '', fabric: '', description: '', badge: '' });
            }}>
              Cancel
            </Button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p._id} className="group relative bg-background border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className="aspect-[4/5] overflow-hidden bg-secondary">
              {p.image ? (
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground"><ImageIcon size={48} /></div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-display font-bold text-sm line-clamp-1">{p.name}</h3>
                <span className="text-[10px] uppercase tracking-wider bg-secondary px-1.5 py-0.5 rounded font-medium text-accent">{p.category}</span>
              </div>
              <p className="font-body font-bold text-primary">₹{p.price.toLocaleString()}</p>
              
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => handleEdit(p)}>
                  <Edit size={14} className="mr-1" /> Edit
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10 text-xs px-2" onClick={() => handleDelete(p._id)}>
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {products.length === 0 && <p className="text-center py-20 text-muted-foreground border-2 border-dashed border-border rounded-xl">No products added yet.</p>}
    </div>
  );
};

export default ProductManager;
