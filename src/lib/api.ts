import { supabase } from './supabase';

export type NewArrivalItem = {
  id: string;
  name: string;
  price: string;
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

// --- Storage Upload ---
export const uploadImage = async (file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('public_images')
      .upload(filePath, file);

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
