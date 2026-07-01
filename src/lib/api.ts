import { supabase } from './supabase';
import imageCompression from 'browser-image-compression';

export type NewArrivalItem = {
  id: string;
  img_url: string;
  created_at?: string;
};

export type AccessoryItemDB = {
  id: string;
  category: string;
  name: string;
  img_url: string;
  created_at?: string;
};

// Admin Check
export const isAdmin = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  const email = session?.user?.email;
  return email === 'idchomedecor@gmail.com' || email === 'darwin2007p@gmail.com';
};

export type ServiceItemDB = {
  id: string;
  category: string;
  subcategory: string;
  type: string;
  name: string;
  file_url: string;
  file_size?: string;
  created_at?: string;
};

// --- Storage Upload ---
export const uploadFile = async (file: File): Promise<string | null> => {
  try {
    let fileToUpload = file;
    
    // Compress if it's an image
    if (file.type.startsWith('image/')) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      fileToUpload = await imageCompression(file, options);
    }

    const fileExt = fileToUpload.name.split('.').pop() || 'png';
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('public_images')
      .upload(filePath, fileToUpload);

    if (uploadError) {
      console.error('Upload Error:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from('public_images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (err) {
    console.error('Error uploading image:', err);
    return null;
  }
};

// --- New Arrivals ---
export const getNewArrivals = async (): Promise<NewArrivalItem[]> => {
  const { data, error } = await supabase
    .from('new_arrivals')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching new arrivals:', error);
    return [];
  }
  return data || [];
};

export const addNewArrival = async (item: Omit<NewArrivalItem, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('new_arrivals')
    .insert([item])
    .select();
    
  if (error) throw error;
  return data;
};

export const removeNewArrival = async (id: string) => {
  const { error } = await supabase
    .from('new_arrivals')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
};

// --- Accessories ---
export const getAccessoriesByCategory = async (category: string): Promise<AccessoryItemDB[]> => {
  const { data, error } = await supabase
    .from('accessories_items')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching accessories:', error);
    return [];
  }
  return data || [];
};

export const addAccessory = async (item: Omit<AccessoryItemDB, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('accessories_items')
    .insert([item])
    .select();
    
  if (error) throw error;
  return data;
};

export const removeAccessory = async (id: string) => {
  const { error } = await supabase
    .from('accessories_items')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
};

// --- Services ---
export const getServiceItems = async (category: string, subcategory: string): Promise<ServiceItemDB[]> => {
  const { data, error } = await supabase
    .from('service_items')
    .select('*')
    .eq('category', category)
    .eq('subcategory', subcategory)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching service items:', error);
    return [];
  }
  return data || [];
};

export const addServiceItem = async (item: Omit<ServiceItemDB, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('service_items')
    .insert([item])
    .select();
    
  if (error) throw error;
  return data;
};

export const removeServiceItem = async (id: string) => {
  const { error } = await supabase
    .from('service_items')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
};

// --- Newsletter Subscription ---
export const subscribeToNewsletter = async (email: string) => {
  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert([{ email }]);
    
  if (error) {
    if (error.code === '23505') {
      throw new Error('This email is already subscribed!');
    }
    throw error;
  }
};
