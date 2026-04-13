import { useI18n, LANGUAGES } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  return (
    <div className="flex gap-1">
      {LANGUAGES.map((l) => (
        <Button
          key={l.value}
          variant={lang === l.value ? "default" : "outline"}
          size="sm"
          className="px-3 py-1 text-xs font-semibold"
          onClick={() => setLang(l.value)}
        >
          {l.label}
        </Button>
      ))}
    </div>
  );
}
