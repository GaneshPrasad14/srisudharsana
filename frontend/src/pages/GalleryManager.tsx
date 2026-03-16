import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, Loader2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

const GalleryManager = () => {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await fetch('http://localhost:7050/api/gallery');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      toast.error('Failed to load gallery');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setIsUploading(true);
      toast.loading('Uploading to gallery...');
      
      // 1. Upload file to server
      const uploadRes = await fetch('http://localhost:7050/api/admin/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });
      const uploadData = await uploadRes.json();
      
      if (!uploadRes.ok) throw new Error(uploadData.message || 'Upload failed');

      // 2. Save to gallery collection
      const galleryRes = await fetch('http://localhost:7050/api/admin/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          image: uploadData.imageUrl,
          caption: file.name
        }),
      });

      if (galleryRes.ok) {
        toast.dismiss();
        toast.success('Added to gallery');
        fetchGallery();
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message || 'Gallery update failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this image from gallery?')) return;
    try {
      const response = await fetch(`http://localhost:7050/api/admin/gallery/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setItems(items.filter(item => item._id !== id));
        toast.success('Removed from gallery');
      }
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  if (isLoading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="space-y-10 font-body">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-display font-bold mb-1">Gallery Manager</h2>
          <p className="text-muted-foreground text-sm">Update the "Follow Our Journey" section</p>
        </div>
        <div className="relative">
          <Input 
            type="file" 
            id="gallery-upload" 
            className="hidden" 
            accept="image/*"
            onChange={handleUpload}
            disabled={isUploading}
          />
          <Button asChild disabled={isUploading}>
            <label htmlFor="gallery-upload" className="cursor-pointer">
              <Plus size={18} className="mr-2" /> {isUploading ? 'Uploading...' : 'Add Image'}
            </label>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {items.map((item) => (
          <div key={item._id} className="group relative aspect-square bg-secondary rounded-lg overflow-hidden border border-border">
            <img src={item.image} alt={item.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button 
                variant="destructive" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => handleDelete(item._id)}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed border-border rounded-xl">
          <ImageIcon size={48} className="mx-auto text-muted-foreground mb-4 opacity-20" />
          <p className="text-muted-foreground">Your gallery is empty. Upload some journey photos!</p>
        </div>
      )}
    </div>
  );
};

export default GalleryManager;
