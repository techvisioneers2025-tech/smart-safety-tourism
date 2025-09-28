
"use client";

import { useI18n } from "@/context/i18n";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LanguageSelector() {
  const { setLocale, locale } = useI18n();

  const handleValueChange = (value: string) => {
    setLocale(value as 'en' | 'hi' | 'bn' | 'te' | 'mr' | 'ta' | 'ur' | 'gu' | 'kn' | 'or' | 'ml' | 'pa');
  };

  return (
    <Select value={locale} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[150px] bg-card border-border">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
        <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
        <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
        <SelectItem value="mr">मराठी (Marathi)</SelectItem>
        <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
        <SelectItem value="ur">اردو (Urdu)</SelectItem>
        <SelectItem value="gu">ગુજરાતી (Gujarati)</SelectItem>
        <SelectItem value="kn">ಕನ್ನಡ (Kannada)</SelectItem>
        <SelectItem value="or">ଓଡ଼ିଆ (Odia)</SelectItem>
        <SelectItem value="ml">മലയാളം (Malayalam)</SelectItem>
        <SelectItem value="pa">ਪੰਜਾਬੀ (Punjabi)</SelectItem>
      </SelectContent>
    </Select>
  );
}
