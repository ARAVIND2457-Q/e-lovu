import React, { useMemo, useState } from 'react';
import {
  ShoppingBag,
  Search,
  Star,
  ShieldCheck,
  Check,
  X,
  Plus,
  Minus,
  Trash2,
  Sparkles,
  Truck,
  Clock,
  Heart,
  Stethoscope,
  Activity,
} from 'lucide-react';
import type { MarketplaceItem } from '../types';
import { marketplaceItems } from '../data/mockData';

type CategoryFilter = MarketplaceItem['category'] | 'all';
type SortKey = 'recommended' | 'rating' | 'price';

interface CartLine {
  item: MarketplaceItem;
  quantity: number;
}

const categoryLabels: Record<CategoryFilter, string> = {
  all: 'All care',
  doula: 'Doula support',
  'lactation': 'Lactation',
  'mental-health': 'Mental health',
  'pelvic-floor': 'Pelvic floor',
  device: 'Devices',
  biomarker: 'Biomarkers',
};

/** Items are seeded with category keys that are not all present in the copy. */
const categoryIcon: Record<MarketplaceItem['category'], React.ElementType> = {
  doula: Heart,
  lactation: Sparkles,
  'mental-health': Stethoscope,
  'pelvic-floor': Activity,
  device: Activity,
  biomarker: Activity,
};

const formatPrice = (item: MarketplaceItem) =>
  item.price === 0 ? 'Covered' : `$${item.price.toFixed(2)}`;

export const Marketplace: React.FC = () => {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('recommended');
  const [insuranceOnly, setInsuranceOnly] = useState(false);
  const [detail, setDetail] = useState<MarketplaceItem | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [confirmed, setConfirmed] = useState<string | null>(null);

  const counts = useMemo(() => {
    const base: Record<string, number> = { all: marketplaceItems.length };
    marketplaceItems.forEach((item) => {
      base[item.category] = (base[item.category] ?? 0) + 1;
    });
    return base;
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return marketplaceItems
      .filter((item) => (category === 'all' ? true : item.category === category))
      .filter((item) => (insuranceOnly ? item.isInsuranceCovered : true))
      .filter((item) =>
        q
          ? item.title.toLowerCase().includes(q) ||
            item.provider.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q)
          : true,
      )
      .sort((a, b) => {
        if (sortKey === 'rating') return b.rating - a.rating;
        if (sortKey === 'price') return a.price - b.price;
        // "Recommended" surfaces the clinically flagged items first.
        const aFlagged = a.badge ? 1 : 0;
        const bFlagged = b.badge ? 1 : 0;
        if (aFlagged !== bFlagged) return bFlagged - aFlagged;
        return b.rating - a.rating;
      });
  }, [category, query, sortKey, insuranceOnly]);

  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const cartTotal = cart.reduce((sum, line) => sum + line.item.price * line.quantity, 0);
  const cartOriginalTotal = cart.reduce(
    (sum, line) => sum + (line.item.originalPrice ?? line.item.price) * line.quantity,
    0,
  );

  const addToCart = (item: MarketplaceItem) => {
    setCart((prev) => {
      const existing = prev.find((line) => line.item.id === item.id);
      if (existing) {
        return prev.map((line) =>
          line.item.id === item.id ? { ...line, quantity: line.quantity + 1 } : line,
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    setConfirmed(`${item.title} added to your care plan`);
    window.setTimeout(() => setConfirmed(null), 2600);
  };

  const changeQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((line) =>
          line.item.id === id ? { ...line, quantity: line.quantity + delta } : line,
        )
        .filter((line) => line.quantity > 0),
    );
  };

  const removeLine = (id: string) =>
    setCart((prev) => prev.filter((line) => line.item.id !== id));

  const checkout = () => {
    setCart([]);
    setCartOpen(false);
    setConfirmed('Request submitted — your care team will confirm coverage within 24 hours.');
    window.setTimeout(() => setConfirmed(null), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-[11px] font-bold uppercase tracking-wider border-white/20">
              <ShoppingBag className="w-3.5 h-3.5" />
              eLovu Care Marketplace
            </span>
            <h1 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight">
              Book maternal care, covered upfront
            </h1>
            <p className="mt-1.5 text-sm text-emerald-50 max-w-2xl leading-relaxed">
              Doulas, lactation consultants, perinatal mental health and prescribed monitoring
              devices — with your insurance coverage shown before you book.
            </p>
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-emerald-700 font-bold text-sm hover:bg-emerald-50 shadow-lg transition shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            Care plan
            {cartCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {confirmed && (
        <div className="flex items-start gap-2.5 p-4 rounded-2xl bg-emerald-50 border-emerald-200">
          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p className="text-xs font-semibold text-emerald-900">{confirmed}</p>
        </div>
      )}

      {/* Controls */}
      <div className="bg-white rounded-3xl border-rose-100 p-4 flex-col lg:flex-row lg:-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {(Object.keys(categoryLabels) as CategoryFilter[])
            .filter((key) => key === 'all' || counts[key])
            .map((key) => (
              <button
                key={key}
                onClick={() => setCategory(key)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  category === key
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                }`}
              >
                {categoryLabels[key]}
                <span className="ml-1 opacity-70">{counts[key] ?? 0}</span>
              </button>
            ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services"
              className="pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-50 border-slate-200 focus:border-emerald-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100 transition placeholder:text-slate-400 w-full sm:w-48"
            />
          </div>
          <button
            onClick={() => setInsuranceOnly((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
              insuranceOnly
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-emerald-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Insurance covered
          </button>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-50 border-slate-200 focus:border-emerald-400 focus:outline-none cursor-pointer"
          >
            <option value="recommended">Recommended</option>
            <option value="rating">Highest rated</option>
            <option value="price">Lowest cost</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {visible.map((item) => {
          const Icon = categoryIcon[item.category];
          return (
            <div
              key={item.id}
              className="group bg-white rounded-3xl border-rose-100 overflow-hidden hover:shadow-lg hover:shadow-emerald-100/50 hover:border-emerald-200 transition flex-col"
            >
              <div className="relative h-40 bg-slate-100 overflow-hidden">
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy"
                />
                {item.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-sm text-[10px] font-bold text-emerald-700 border-emerald-200">
                    {item.badge}
                  </span>
                )}
                {item.isInsuranceCovered && (
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-600 text-white text-[10px] font-bold">
                    <ShieldCheck className="w-3 h-3" /> Covered
                  </span>
                )}
              </div>

              <div className="p-5 flex-1 flex-col">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    {categoryLabels[item.category]}
                  </span>
                  <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-bold text-slate-700">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    {item.rating}
                    <span className="text-slate-400 font-medium">({item.reviewCount})</span>
                  </span>
                </div>

                <h3 className="mt-2.5 text-sm font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">{item.provider}</p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                {item.availability && (
                  <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                    <Clock className="w-3.5 h-3.5" />
                    {item.availability}
                  </p>
                )}

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-end justify-between gap-3">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black text-slate-900">
                        {formatPrice(item)}
                      </span>
                      {item.originalPrice !== undefined && (
                        <span className="text-xs text-slate-400 line-through">
                          ${item.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5 max-w-[11rem] leading-snug">
                      {item.insuranceNote}
                    </p>
                  </div>
                </div>

                <div className="mt-3 grid-cols-2 gap-2">
                  <button
                    onClick={() => setDetail(item)}
                    className="py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => addToCart(item)}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {visible.length === 0 && (
        <div className="bg-white rounded-3xl border-rose-100 p-12 text-center">
          <Search className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="mt-3 text-sm font-bold text-slate-800">No services match those filters</p>
          <p className="text-xs text-slate-500 mt-1">
            Try clearing the search or turning off the insurance filter.
          </p>
        </div>
      )}

      {/* Detail modal */}
      {detail && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl max-h-[90vh] flex-col">
            <div className="relative h-44 bg-slate-100 shrink-0">
              <img src={detail.image} alt="" className="w-full h-full object-cover" />
              <button
                onClick={() => setDetail(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/95 hover:bg-white text-slate-700 transition cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    {categoryLabels[detail.category]}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    {detail.rating} ({detail.reviewCount} reviews)
                  </span>
                </div>
                <h2 className="mt-2 text-lg font-black text-slate-900 leading-snug">
                  {detail.title}
                </h2>
                <p className="text-xs text-slate-500 mt-1 font-medium">{detail.provider}</p>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">{detail.description}</p>

              <div className="p-4 rounded-2xl bg-emerald-50 border-emerald-200">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <p className="text-xs font-bold text-emerald-900">
                    {detail.isInsuranceCovered ? 'Insurance covered' : 'Self-pay'}
                  </p>
                  <span className="ml-auto text-sm font-black text-emerald-800">
                    {formatPrice(detail)}
                  </span>
                </div>
                {detail.insuranceNote && (
                  <p className="text-[11px] text-emerald-800 mt-1.5">{detail.insuranceNote}</p>
                )}
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  What's included
                </h3>
                <ul className="mt-2 space-y-1.5">
                  {detail.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border-slate-200/80 text-xs font-medium text-slate-700"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {detail.availability && (
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                  <Truck className="w-3.5 h-3.5 text-slate-400" />
                  {detail.availability}
                </p>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setDetail(null)}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    addToCart(detail);
                    setDetail(null);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add to care plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-md h-full flex-col shadow-2xl">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-600" />
                <h2 className="text-base font-bold text-slate-900">Your care plan</h2>
                <span className="text-[11px] font-semibold text-slate-500">
                  {cartCount} item{cartCount === 1 ? '' : 's'}
                </span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 transition cursor-pointer"
                aria-label="Close care plan"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="p-10 text-center">
                  <ShoppingBag className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="mt-3 text-sm font-bold text-slate-800">Nothing added yet</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Add services from the marketplace to build your care plan.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-slate-50">
                  {cart.map((line) => (
                    <li key={line.item.id} className="p-4 flex gap-3">
                      <img
                        src={line.item.image}
                        alt=""
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900 leading-snug">
                          {line.item.title}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5">{line.item.provider}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => changeQuantity(line.item.id, -1)}
                            className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3 text-slate-600" />
                          </button>
                          <span className="text-xs font-bold text-slate-800 w-4 text-center">
                            {line.quantity}
                          </span>
                          <button
                            onClick={() => changeQuantity(line.item.id, 1)}
                            className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3 text-slate-600" />
                          </button>
                          <span className="ml-auto text-sm font-black text-slate-900">
                            {line.item.price === 0
                              ? 'Covered'
                              : `$${(line.item.price * line.quantity).toFixed(2)}`}
                          </span>
                          <button
                            onClick={() => removeLine(line.item.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                            aria-label={`Remove ${line.item.title}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-5 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Standard price</span>
                  <span className="text-slate-400 line-through">
                    ${cartOriginalTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">Your cost</span>
                  <span className="text-xl font-black text-emerald-700">
                    {cartTotal === 0 ? 'Fully covered' : `$${cartTotal.toFixed(2)}`}
                  </span>
                </div>
                <p className="text-[11px] text-emerald-800 bg-emerald-50 border-emerald-200 rounded-xl p-3 leading-relaxed">
                  Estimated coverage applied. Final eligibility is confirmed by your plan before any
                  charge.
                </p>
                <button
                  onClick={checkout}
                  className="w-full py-3 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition cursor-pointer"
                >
                  Submit request
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
