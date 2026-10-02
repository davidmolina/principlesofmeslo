'use client';

import { useMemo, useState } from 'react';

function toNumber(value: string): number {
  const n = Number.parseFloat(value);
  return Number.isFinite(n) ? n : 0;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);
}

function formatPercent(value: number): string {
  return `${Number.isFinite(value) ? value.toFixed(2) : '0.00'}%`;
}

export default function MarkupMarginCalculator() {
  const [cost, setCost] = useState('100000');
  const [markupPercent, setMarkupPercent] = useState('25');
  const [targetMarginPercent, setTargetMarginPercent] = useState('20');

  const costValue = toNumber(cost);
  const markupValue = toNumber(markupPercent) / 100;
  const targetMarginValue = toNumber(targetMarginPercent) / 100;

  const markupMode = useMemo(() => {
    const revenue = costValue * (1 + markupValue);
    const profit = revenue - costValue;
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;

    return {
      revenue,
      profit,
      margin,
    };
  }, [costValue, markupValue]);

  const marginMode = useMemo(() => {
    const safeMargin = targetMarginValue >= 1 ? 0.9999 : targetMarginValue;
    const requiredMarkup = safeMargin >= 0 ? (safeMargin / (1 - safeMargin)) * 100 : 0;
    const revenue = safeMargin < 1 ? costValue / (1 - safeMargin) : 0;
    const profit = revenue - costValue;

    return {
      requiredMarkup,
      revenue,
      profit,
    };
  }, [costValue, targetMarginValue]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          MESLO Markup vs Margin Calculator
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-300">
          Use this calculator to understand the difference between markup and margin. In estimating,
          markup is applied to cost. Margin is measured against revenue.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-neutral-950/40 p-5">
          <label className="block text-sm font-medium text-neutral-200">Total Cost</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-white/20"
          />

          <div className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/10 p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-amber-200">
              Key formulas
            </div>
            <div className="mt-3 space-y-2 text-sm text-neutral-200">
              <p>
                <strong className="text-white">Markup</strong> = Profit ÷ Cost
              </p>
              <p>
                <strong className="text-white">Margin</strong> = Profit ÷ Revenue
              </p>
              <p>
                <strong className="text-white">Price</strong> = Cost × (1 + Markup)
              </p>
              <p>
                <strong className="text-white">Required Markup</strong> = Margin ÷ (1 − Margin)
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-neutral-950/40 p-5">
          <h3 className="text-lg font-semibold text-white">If you know your markup</h3>
          <p className="mt-1 text-sm text-neutral-300">
            Apply markup to cost, then see the resulting revenue, profit, and margin.
          </p>

          <label className="mt-4 block text-sm font-medium text-neutral-200">Markup %</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={markupPercent}
            onChange={(e) => setMarkupPercent(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-white/20"
          />

          <div className="mt-5 space-y-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-neutral-400">Bid Price</div>
              <div className="mt-1 text-xl font-semibold text-white">
                {formatCurrency(markupMode.revenue)}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-neutral-400">Profit</div>
              <div className="mt-1 text-xl font-semibold text-white">
                {formatCurrency(markupMode.profit)}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-neutral-400">Resulting Margin</div>
              <div className="mt-1 text-xl font-semibold text-amber-300">
                {formatPercent(markupMode.margin)}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-neutral-950/40 p-5">
          <h3 className="text-lg font-semibold text-white">If you know your target margin</h3>
          <p className="mt-1 text-sm text-neutral-300">
            Enter the margin you want, then see the markup required to hit it.
          </p>

          <label className="mt-4 block text-sm font-medium text-neutral-200">Target Margin %</label>
          <input
            type="number"
            min="0"
            max="99.99"
            step="0.01"
            value={targetMarginPercent}
            onChange={(e) => setTargetMarginPercent(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-white/20"
          />

          <div className="mt-5 space-y-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-neutral-400">Required Markup</div>
              <div className="mt-1 text-xl font-semibold text-amber-300">
                {formatPercent(marginMode.requiredMarkup)}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-neutral-400">Required Bid Price</div>
              <div className="mt-1 text-xl font-semibold text-white">
                {formatCurrency(marginMode.revenue)}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-neutral-400">Profit</div>
              <div className="mt-1 text-xl font-semibold text-white">
                {formatCurrency(marginMode.profit)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-neutral-950/40 p-5">
        <h3 className="text-base font-semibold text-white">Quick reference</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-neutral-400">
                <th className="px-3 py-2 font-medium">Markup</th>
                <th className="px-3 py-2 font-medium">Equivalent Margin</th>
              </tr>
            </thead>
            <tbody className="text-neutral-200">
              {[
                { markup: '10%', margin: '9.09%' },
                { markup: '20%', margin: '16.67%' },
                { markup: '25%', margin: '20.00%' },
                { markup: '50%', margin: '33.33%' },
                { markup: '100%', margin: '50.00%' },
              ].map((row) => (
                <tr key={row.markup} className="border-b border-white/10">
                  <td className="px-3 py-2">{row.markup}</td>
                  <td className="px-3 py-2">{row.margin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

