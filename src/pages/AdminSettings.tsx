

import React, { useState, useEffect, useTransition } from 'react';
import { Save } from 'lucide-react';
import { businessData, heroContent, aboutContent } from '@/services/data';
import ConflictBanner from '@/components/admin/ConflictBanner';

interface SettingsState {
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  landmark: string;
  description: string;
  heroHeadline: string;
  heroSubheadline: string;
  hours: Record<string, string>;
}

export default function SettingsCMSPage() {
  const [dataValues, setDataValues] = useState<SettingsState>({
    tagline: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    landmark: '',
    description: '',
    heroHeadline: '',
    heroSubheadline: '',
    hours: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: '',
    }
  });

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Read local storage values if they exist, else load default data
    const storedData = localStorage.getItem('zion_business_data');
    const storedHero = localStorage.getItem('zion_hero_content');
    
    let parsedData = businessData;
    let parsedHero = heroContent;

    if (storedData) {
      try { parsedData = JSON.parse(storedData); } catch (e) {}
    }
    if (storedHero) {
      try { parsedHero = JSON.parse(storedHero); } catch (e) {}
    }

    setDataValues({
      tagline: parsedData.tagline,
      phone: parsedData.contact.phone,
      whatsapp: parsedData.contact.whatsapp,
      email: parsedData.contact.email,
      address: parsedData.location.address,
      landmark: parsedData.location.landmark,
      description: parsedData.description,
      heroHeadline: parsedHero.headline,
      heroSubheadline: parsedHero.subheadline,
      hours: { ...parsedData.hours }
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDataValues((prev: SettingsState) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleHoursChange = (day: string, value: string) => {
    setDataValues((prev: SettingsState) => ({
      ...prev,
      hours: {
        ...prev.hours,
        [day]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Map fields back 1:1 to businessData & heroContent shapes without extending schemas
    const updatedBusinessData = {
      ...businessData,
      tagline: dataValues.tagline,
      description: dataValues.description,
      location: {
        ...businessData.location,
        address: dataValues.address,
        landmark: dataValues.landmark,
      },
      contact: {
        ...businessData.contact,
        phone: dataValues.phone,
        phoneLink: `tel:${dataValues.phone.replace(/\s+/g, '')}`,
        whatsapp: dataValues.whatsapp,
        whatsappLink: `https://wa.me/${dataValues.whatsapp.replace(/[^0-9]/g, '')}`,
        email: dataValues.email,
      },
      hours: { ...dataValues.hours }
    };

    const updatedHeroContent = {
      ...heroContent,
      headline: dataValues.heroHeadline,
      subheadline: dataValues.heroSubheadline,
    };

    startTransition(async () => {
      await new Promise(resolve => setTimeout(resolve, 800));

      localStorage.setItem('zion_business_data', JSON.stringify(updatedBusinessData));
      localStorage.setItem('zion_hero_content', JSON.stringify(updatedHeroContent));

      // Append edit log
      const log = {
        id: String(Date.now()),
        action: 'Updated Settings',
        target: 'Business Data Configurations',
        user: 'You (Admin)',
        time: 'Just now',
      };
      const storedLogs = localStorage.getItem('zion_recent_edits');
      const logs = storedLogs ? JSON.parse(storedLogs) : [];
      localStorage.setItem('zion_recent_edits', JSON.stringify([log, ...logs]));

      window.location.reload();
    });
  };

  return (
    <div className="max-w-4xl space-y-6">
      <ConflictBanner resourceName="business settings" />

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section: Hero Configurations */}
        <div className="bg-white border border-stone-200/50 p-6 space-y-6">
          <h4 className="font-sans-luxury text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-100 pb-3">
            Hero Section Copy (Homepage)
          </h4>
          <div className="grid grid-cols-1 gap-5">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">
                Main Headline
              </label>
              <input 
                type="text" 
                name="heroHeadline"
                value={dataValues.heroHeadline}
                onChange={handleInputChange}
                className="w-full bg-white border border-stone-200 px-4 py-3 text-xs focus:outline-none focus:border-amber-600 rounded-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">
                Subheadline
              </label>
              <textarea 
                name="heroSubheadline"
                rows={2}
                value={dataValues.heroSubheadline}
                onChange={handleInputChange}
                className="w-full bg-white border border-stone-200 px-4 py-3 text-xs focus:outline-none focus:border-amber-600 rounded-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Section: Profile & Slogan details */}
        <div className="bg-white border border-stone-200/50 p-6 space-y-6">
          <h4 className="font-sans-luxury text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-100 pb-3">
            Business Profile & Contact info
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">
                Tagline / Slogan
              </label>
              <input 
                type="text" 
                name="tagline"
                value={dataValues.tagline}
                onChange={handleInputChange}
                className="w-full bg-white border border-stone-200 px-4 py-3 text-xs focus:outline-none focus:border-amber-600 rounded-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">
                Contact Phone
              </label>
              <input 
                type="text" 
                name="phone"
                value={dataValues.phone}
                onChange={handleInputChange}
                className="w-full bg-white border border-stone-200 px-4 py-3 text-xs focus:outline-none focus:border-amber-600 rounded-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">
                WhatsApp Phone Link
              </label>
              <input 
                type="text" 
                name="whatsapp"
                value={dataValues.whatsapp}
                onChange={handleInputChange}
                className="w-full bg-white border border-stone-200 px-4 py-3 text-xs focus:outline-none focus:border-amber-600 rounded-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">
                Email Address
              </label>
              <input 
                type="email" 
                name="email"
                value={dataValues.email}
                onChange={handleInputChange}
                className="w-full bg-white border border-stone-200 px-4 py-3 text-xs focus:outline-none focus:border-amber-600 rounded-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">
                Hospital Address (Mbeya)
              </label>
              <input 
                type="text" 
                name="address"
                value={dataValues.address}
                onChange={handleInputChange}
                className="w-full bg-white border border-stone-200 px-4 py-3 text-xs focus:outline-none focus:border-amber-600 rounded-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">
                Landmark Description
              </label>
              <input 
                type="text" 
                name="landmark"
                value={dataValues.landmark}
                onChange={handleInputChange}
                className="w-full bg-white border border-stone-200 px-4 py-3 text-xs focus:outline-none focus:border-amber-600 rounded-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">
                Long Business Description
              </label>
              <textarea 
                name="description"
                rows={4}
                value={dataValues.description}
                onChange={handleInputChange}
                className="w-full bg-white border border-stone-200 px-4 py-3 text-xs focus:outline-none focus:border-amber-600 rounded-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Section: Opening hours */}
        <div className="bg-white border border-stone-200/50 p-6 space-y-6">
          <h4 className="font-sans-luxury text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-100 pb-3">
            Opening Hours Schedule
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {Object.keys(dataValues.hours).map((day) => (
              <div key={day}>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">
                  {day}
                </label>
                <input 
                  type="text" 
                  value={dataValues.hours[day]}
                  onChange={(e) => handleHoursChange(day, e.target.value)}
                  className="w-full bg-white border border-stone-200 px-4 py-3 text-xs focus:outline-none focus:border-amber-600 rounded-none"
                 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Save Triggers */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-stone-950 hover:bg-amber-600 text-white font-bold uppercase tracking-wider text-[10px] px-8 py-4 transition-colors rounded-none disabled:opacity-60"
          >
            {isPending ? (
              <>
                <span className="w-3.5 h-3.5 border border-white border-t-transparent animate-spin inline-block" />
                Commiting Overwrite...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Configuration
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
