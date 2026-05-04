"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Package,
  Calculator,
  Wand2,
  Rocket,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Download,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const nicheTemplates = {
  pet: {
    examples: ["Mist spray grooming brush", "Pet hair remover glove", "Slow feeder bowl", "Travel water bottle"],
    keywords: ["pet grooming brush", "dog grooming brush", "cat grooming brush", "deshedding tool", "pet hair remover", "dog brush for loose hair"],
    risks: ["Weak product quality can cause bad reviews", "Avoid misleading claims like real steam", "Check battery safety for rechargeable items"],
    branding: ["PawMist", "FurEase", "PetGlow", "ShedLess"],
  },
  kitchen: {
    examples: ["Drawer organiser", "Reusable food wraps", "Air fryer liners", "Under-sink organiser"],
    keywords: ["kitchen organiser", "drawer organiser", "air fryer accessories", "food storage", "plastic free kitchen"],
    risks: ["Watch bulky shipping costs", "Avoid fragile glass products", "Differentiate from generic listings"],
    branding: ["HomeNest", "KlearKitchen", "EcoTidy", "Nestora"],
  },
  fitness: {
    examples: ["Resistance bands", "Grip strength trainer", "Yoga blocks", "Massage ball set"],
    keywords: ["resistance bands", "home workout kit", "fitness accessories", "exercise bands", "yoga accessories"],
    risks: ["High competition", "Product durability is critical", "Avoid medical claims"],
    branding: ["FlexCore", "FitEase", "HomeForm", "PulseGear"],
  },
  baby: {
    examples: ["Silicone night light", "Nappy caddy", "White noise machine", "Pram organiser"],
    keywords: ["baby night light", "nappy organiser", "baby sleep aid", "portable baby organiser", "baby gift"],
    risks: ["Higher compliance expectations", "Avoid unsafe materials", "Parents read reviews carefully"],
    branding: ["LittleGlow", "Nurtura", "BabyNest", "TinyEase"],
  },
  car: {
    examples: ["Boot organiser", "Car cleaning gel", "Phone holder", "Seat gap filler"],
    keywords: ["car accessories", "car organiser", "car phone holder", "boot organiser", "car cleaning"],
    risks: ["Phone holders can have compatibility issues", "Avoid products that distract drivers", "Check returns risk"],
    branding: ["AutoNest", "DriveEase", "RoadTidy", "GearMate"],
  },
  generic: {
    examples: ["Low-cost accessory", "Problem-solving bundle", "Giftable item", "Reusable household product"],
    keywords: ["best seller", "problem solving product", "low competition product", "gift for", "accessory"],
    risks: ["Validate demand before ordering", "Avoid saturated products", "Check compliance and returns risk"],
    branding: ["EaseCo", "NovaGoods", "SimpleNest", "PrimeCraft"],
  },
};

function detectTemplate(niche: string) {
  const n = niche.toLowerCase();

  if (n.includes("pet") || n.includes("dog") || n.includes("cat")) return nicheTemplates.pet;
  if (n.includes("kitchen") || n.includes("home") || n.includes("organ")) return nicheTemplates.kitchen;
  if (n.includes("fit") || n.includes("gym") || n.includes("yoga")) return nicheTemplates.fitness;
  if (n.includes("baby") || n.includes("parent")) return nicheTemplates.baby;
  if (n.includes("car") || n.includes("auto")) return nicheTemplates.car;

  return nicheTemplates.generic;
}

function currency(n: number | string) {
  return `£${Number(n || 0).toFixed(2)}`;
}

export default function AmazonNicheLauncherApp() {
  const [niche, setNiche] = useState("Pet grooming");
  const [budget, setBudget] = useState(500);
  const [sellPrice, setSellPrice] = useState(14.99);
  const [unitCost, setUnitCost] = useState(2.2);
  const [shippingPerUnit, setShippingPerUnit] = useState(1.0);
  const [amazonFees, setAmazonFees] = useState(5.8);
  const [adCost, setAdCost] = useState(1.2);

  const template = useMemo(() => detectTemplate(niche), [niche]);

  const profit = useMemo(() => {
    const totalCost =
      Number(unitCost) +
      Number(shippingPerUnit) +
      Number(amazonFees) +
      Number(adCost);

    const unitProfit = Number(sellPrice) - totalCost;
    const landedCost = Number(unitCost) + Number(shippingPerUnit);
    const estimatedUnits = Math.max(
      0,
      Math.floor(Number(budget) / Math.max(landedCost, 0.01))
    );

    const projectedProfit = unitProfit * estimatedUnits;
    const margin =
      Number(sellPrice) > 0 ? (unitProfit / Number(sellPrice)) * 100 : 0;

    return {
      totalCost,
      unitProfit,
      landedCost,
      estimatedUnits,
      projectedProfit,
      margin,
    };
  }, [budget, sellPrice, unitCost, shippingPerUnit, amazonFees, adCost]);

  const productIdea = template.examples[0];
  const brandName = template.branding[0];

  const title = `${productIdea} for ${niche} – 2-in-1 Problem Solving Tool – Easy to Use, Lightweight & Beginner Friendly`;

  const bullets = [
    `Solves a common ${niche.toLowerCase()} problem quickly and simply.`,
    "Designed for everyday use with a lightweight, practical design.",
    "Easy to clean, store, and reuse, helping customers save time.",
    "Ideal for buyers looking for a useful, affordable upgrade.",
    "Great giftable product with strong branding and bundle potential.",
  ];

  const supplierMessage = `Hello, I am interested in your ${productIdea}.

I want to order 80–100 units first. Please confirm:
1. Best unit price for 100 pcs
2. DDP shipping cost to the UK including taxes
3. Product dimensions, weight and packaging details
4. Can you provide logo or custom packaging?
5. Can I order 1 sample first?

I am planning long-term orders if quality is good. Thank you.`;

  const exportText = `NICHE LAUNCH PLAN

Niche: ${niche}
Recommended product: ${productIdea}
Brand idea: ${brandName}
Budget: ${currency(budget)}
Estimated units: ${profit.estimatedUnits}
Unit profit: ${currency(profit.unitProfit)}
Projected batch profit: ${currency(profit.projectedProfit)}
Margin: ${profit.margin.toFixed(1)}%

Amazon title:
${title}

Bullets:
${bullets.map((b, i) => `${i + 1}. ${b}`).join("\n")}

Keywords:
${template.keywords.join(", ")}

Supplier message:
${supplierMessage}`;

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const download = () => {
    const blob = new Blob([exportText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `${niche.replace(/\s+/g, "-").toLowerCase()}-launch-plan.txt`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 text-slate-900">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-white p-6 md:p-8 shadow-sm border"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm mb-3">
                <Sparkles className="h-4 w-4" />
                Amazon UK Product Launch Automator
              </div>

              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                Find, validate, source, brand & launch any niche.
              </h1>

              <p className="mt-3 text-slate-600 max-w-2xl">
                Enter a niche and budget. The app generates product ideas,
                keyword angles, supplier outreach, profit estimates, listing
                copy, risks, and a launch plan.
              </p>
            </div>

            <Button onClick={download} className="rounded-2xl px-5 py-6">
              <Download className="mr-2 h-4 w-4" />
              Export Plan
            </Button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="rounded-3xl shadow-sm lg:col-span-1">
            <CardContent className="p-6 space-y-5">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Search className="h-5 w-5" />
                Inputs
              </h2>

              <label className="block text-sm font-medium">Niche</label>
              <input
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full rounded-2xl border p-3"
                placeholder="e.g. Pet grooming, kitchen, fitness"
              />

              <label className="block text-sm font-medium">Budget</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full rounded-2xl border p-3"
              />

              <div className="grid grid-cols-2 gap-3">
                <NumberInput label="Sell price" value={sellPrice} onChange={setSellPrice} />
                <NumberInput label="Unit cost" value={unitCost} onChange={setUnitCost} />
                <NumberInput label="Ship/unit" value={shippingPerUnit} onChange={setShippingPerUnit} />
                <NumberInput label="Amazon fees" value={amazonFees} onChange={setAmazonFees} />
              </div>

              <NumberInput label="Ad cost per sale" value={adCost} onChange={setAdCost} />
            </CardContent>
          </Card>

          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            <Card className="rounded-3xl shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Product Ideas
                </h2>

                <div className="mt-4 space-y-3">
                  {template.examples.map((x) => (
                    <div key={x} className="rounded-2xl bg-slate-100 p-4 font-medium">
                      {x}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Profit Snapshot
                </h2>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <Stat label="Landed cost" value={currency(profit.landedCost)} />
                  <Stat label="Unit profit" value={currency(profit.unitProfit)} />
                  <Stat label="Margin" value={`${profit.margin.toFixed(1)}%`} />
                  <Stat label="Est. units" value={profit.estimatedUnits.toString()} />
                  <Stat label="Batch profit" value={currency(profit.projectedProfit)} wide />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl shadow-sm md:col-span-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Wand2 className="h-5 w-5" />
                    Amazon Listing Generator
                  </h2>

                  <Button
                    variant="outline"
                    className="rounded-2xl"
                    onClick={() => copy(`${title}\n\n${bullets.join("\n")}`)}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                </div>

                <div className="mt-4 rounded-2xl bg-slate-100 p-4">
                  <p className="font-semibold">{title}</p>

                  <ul className="mt-3 space-y-2 text-slate-700">
                    {bullets.map((b) => (
                      <li key={b}>• {b}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="rounded-3xl shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">Brand Kit</h2>
              <p className="mt-3 text-3xl font-bold">{brandName}</p>
              <p className="text-slate-600 mt-2">
                Positioning: simple, useful, problem-solving product for{" "}
                {niche.toLowerCase()} buyers.
              </p>

              <div className="mt-4 flex gap-2 flex-wrap">
                {template.branding.map((b) => (
                  <span key={b} className="rounded-full bg-slate-100 px-3 py-2 text-sm">
                    {b}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">Keywords</h2>

              <div className="mt-4 flex gap-2 flex-wrap">
                {template.keywords.map((k) => (
                  <span key={k} className="rounded-full border px-3 py-2 text-sm">
                    {k}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Risk Checks
              </h2>

              <div className="mt-4 space-y-3">
                {template.risks.map((r) => (
                  <div key={r} className="flex gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 mt-0.5" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-3xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Rocket className="h-5 w-5" />
                Supplier Outreach & Launch Plan
              </h2>

              <Button
                variant="outline"
                className="rounded-2xl"
                onClick={() => copy(supplierMessage)}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy Supplier Message
              </Button>
            </div>

            <pre className="mt-4 whitespace-pre-wrap rounded-2xl bg-slate-900 text-white p-5 text-sm">
              {supplierMessage}
            </pre>

            <div className="mt-6 grid md:grid-cols-4 gap-3">
              {[
                "Message 5 suppliers",
                "Order 1 sample",
                "Test quality",
                "Launch low price + PPC",
              ].map((s) => (
                <div key={s} className="rounded-2xl bg-slate-100 p-4 flex gap-2 items-center">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-medium">{s}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function NumberInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        type="number"
        step="0.01"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-2xl border p-3"
      />
    </div>
  );
}

function Stat({
  label,
  value,
  wide,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div className={`rounded-2xl bg-slate-100 p-4 ${wide ? "col-span-2" : ""}`}>
      <div className="text-slate-500">{label}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}