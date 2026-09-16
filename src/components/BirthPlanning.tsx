import React, { useMemo, useState } from 'react';
import {
  FileText,
  Briefcase,
  CheckCircle2,
  Circle,
  Printer,
  Heart,
  Baby,
  Users,
  FolderOpen,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import type { BirthPlanItem, HospitalBagItem } from '../types';
import { defaultBirthPlan, defaultHospitalBag } from '../data/mockData';

type Tab = 'plan' | 'bag';

const bagCategories: {
  key: HospitalBagItem['category'];
  label: string;
  icon: React.ElementType;
  tone: string;
}[] = [
  { key: 'mom', label: 'For Mom', icon: Heart, tone: 'text-rose-600 bg-rose-50' },
  { key: 'baby', label: 'For Baby', icon: Baby, tone: 'text-pink-600 bg-pink-50' },
  { key: 'partner', label: 'For Partner', icon: Users, tone: 'text-indigo-600 bg-indigo-50' },
  {
    key: 'documents',
    label: 'Documents',
    icon: FolderOpen,
    tone: 'text-amber-600 bg-amber-50',
  },
];

export const BirthPlanning: React.FC = () => {
  const [tab, setTab] = useState<Tab>('plan');
  const [plan, setPlan] = useState<BirthPlanItem[]>(defaultBirthPlan);
  const [bag, setBag] = useState<HospitalBagItem[]>(defaultHospitalBag);
  const [savedNotice, setSavedNotice] = useState(false);

  const planStats = useMemo(() => {
    const all = plan.flatMap((section) => section.options);
    return { total: all.length, chosen: all.filter((o) => o.selected).length };
  }, [plan]);

  const bagStats = useMemo(() => {
    return { total: bag.length, packed: bag.filter((i) => i.checked).length };
  }, [bag]);

  const toggleOption = (sectionId: string, optionId: string) => {
    setPlan((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              options: section.options.map((option) =>
                option.id === optionId ? { ...option, selected: !option.selected } : option,
              ),
            }
          : section,
      ),
    );
  };

  const toggleBagItem = (id: string) => {
    setBag((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)),
    );
  };

  const selectAllInSection = (sectionId: string, selected: boolean) => {
    setPlan((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, options: section.options.map((o) => ({ ...o, selected })) }
          : section,
      ),
    );
  };

  const handlePrint = () => {
    setSavedNotice(true);
    window.setTimeout(() => setSavedNotice(false), 3500);
    window.print();
  };

  const unselectedImportant = plan.flatMap((section) =>
    section.options.filter((o) => !o.selected).map((o) => ({ section: section.category, label: o.label })),
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-[11px] font-bold uppercase tracking-wider border-white/20">
              <FileText className="w-3.5 h-3.5" />
              Birth Plan & Hospital Bag
            </span>
            <h1 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight">
              Plan the birth you want
            </h1>
            <p className="mt-1.5 text-sm text-violet-100 max-w-2xl leading-relaxed">
              Document your preferences to share with your Caduceus OB team and doula, then track
              everything you need to pack before the big day.
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-violet-700 font-bold text-sm hover:bg-violet-50 shadow-lg transition shrink-0 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Export & print
          </button>
        </div>
      </div>

      {savedNotice && (
        <div className="flex items-start gap-2.5 p-4 rounded-2xl bg-violet-50 border-violet-200">
          <CheckCircle2 className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
          <p className="text-xs font-semibold text-violet-900">
            Birth plan saved to your chart and shared with {planStats.chosen} of {planStats.total}{' '}
            preferences selected. A copy has been prepared for printing.
          </p>
        </div>
      )}

      {/* Progress summary */}
      <div className="grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl border-rose-100 p-5">
          <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
            Birth plan progress
          </p>
          <p className="text-2xl font-black text-slate-900 mt-1">
            {planStats.chosen}
            <span className="text-sm text-slate-400 font-bold">/{planStats.total}</span>
          </p>
          <div className="mt-2.5 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${(planStats.chosen / planStats.total) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl border-rose-100 p-5">
          <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
            Hospital bag packed
          </p>
          <p className="text-2xl font-black text-slate-900 mt-1">
            {bagStats.packed}
            <span className="text-sm text-slate-400 font-bold">/{bagStats.total}</span>
          </p>
          <div className="mt-2.5 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-500"
              style={{ width: `${(bagStats.packed / bagStats.total) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-5 text-white">
          <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Still to pack
          </p>
          <p className="text-2xl font-black text-white mt-1">
            {bag.filter((i) => !i.checked && i.essential).length}
          </p>
          <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            Essential items not yet checked off
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100 w-full sm:w-fit">
        <button
          onClick={() => setTab('plan')}
          className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            tab === 'plan' ? 'bg-white text-violet-700 shadow-xs' : 'text-slate-600'
          }`}
        >
          <FileText className="w-4 h-4" /> Birth plan preferences
        </button>
        <button
          onClick={() => setTab('bag')}
          className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            tab === 'bag' ? 'bg-white text-violet-700 shadow-xs' : 'text-slate-600'
          }`}
        >
          <Briefcase className="w-4 h-4" /> Hospital bag checklist
        </button>
      </div>

      {/* Birth plan */}
      {tab === 'plan' && (
        <div className="space-y-5">
          {plan.map((section) => {
            const chosen = section.options.filter((o) => o.selected).length;
            return (
              <div key={section.id} className="bg-white rounded-3xl border-rose-100 overflow-hidden">
                <div className="p-5 border-b border-rose-100/80 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-violet-700">
                      {section.category}
                    </p>
                    <h2 className="text-base font-bold text-slate-900 mt-0.5">{section.title}</h2>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-bold text-slate-500">
                      {chosen}/{section.options.length}
                    </span>
                    <button
                      onClick={() =>
                        selectAllInSection(section.id, chosen !== section.options.length)
                      }
                      className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-violet-700 bg-violet-50 hover:bg-violet-100 transition cursor-pointer"
                    >
                      {chosen === section.options.length ? 'Clear' : 'Select all'}
                    </button>
                  </div>
                </div>

                <div className="p-3 space-y-1">
                  {section.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => toggleOption(section.id, option.id)}
                      className={`w-full flex items-start gap-3 p-3 rounded-2xl text-left transition cursor-pointer ${
                        option.selected
                          ? 'bg-violet-50/70 border-violet-200'
                          : 'bg-white border-transparent hover:bg-slate-50'
                      }`}
                    >
                      {option.selected ? (
                        <CheckCircle2 className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                      )}
                      <span
                        className={`text-xs sm:text-sm font-medium leading-relaxed ${
                          option.selected ? 'text-slate-800' : 'text-slate-500'
                        }`}
                      >
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="bg-white rounded-3xl border-rose-100 p-5">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-600" /> Preferences not selected
            </h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Your care team will default to standard hospital practice for anything left
              unselected. Review these before sharing.
            </p>
            {unselectedImportant.length === 0 ? (
              <p className="mt-3 text-xs font-semibold text-emerald-700">
                Every preference is selected — your plan is fully specified.
              </p>
            ) : (
              <ul className="mt-3 space-y-1.5">
                {unselectedImportant.map((entry) => (
                  <li
                    key={`${entry.section}-${entry.label}`}
                    className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border-slate-200/80 text-[11px] text-slate-600 font-medium"
                  >
                    <Circle className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-700">{entry.section}:</strong> {entry.label}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Hospital bag */}
      {tab === 'bag' && (
        <div className="space-y-5">
          {bagCategories.map((category) => {
            const items = bag.filter((i) => i.category === category.key);
            const packed = items.filter((i) => i.checked).length;
            return (
              <div key={category.key} className="bg-white rounded-3xl border-rose-100 overflow-hidden">
                <div className="p-5 border-b border-rose-100/80 flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center ${category.tone}`}
                  >
                    <category.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-base font-bold text-slate-900">{category.label}</h2>
                    <p className="text-[11px] text-slate-500">
                      {packed} of {items.length} packed
                    </p>
                  </div>
                  <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-500"
                      style={{ width: `${(packed / items.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="p-3 space-y-1">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => toggleBagItem(item.id)}
                      className="w-full flex items-start gap-3 p-3 rounded-2xl text-left hover:bg-slate-50 transition cursor-pointer"
                    >
                      <span
                        className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition ${
                          item.checked
                            ? 'bg-emerald-500 border-emerald-500'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {item.checked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </span>
                      <span
                        className={`text-xs sm:text-sm font-medium leading-relaxed flex-1 ${
                          item.checked ? 'text-slate-400 line-through' : 'text-slate-700'
                        }`}
                      >
                        {item.item}
                      </span>
                      {item.essential && !item.checked && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-700 shrink-0">
                          Essential
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
