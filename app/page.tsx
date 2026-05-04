"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Package, Calculator, Wand2, Rocket, AlertTriangle, CheckCircle2, Copy, Download, Sparkles } from "lucide-react";
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

function detectTemplate(niche) {
  const n = niche.toLowerCase();
  if (n.includes("pet") || n.includes("dog") || n.includes("cat")) return nicheTemplates.pet;
  if (n.includes("kitchen") || n.includes("home") || n.includes("organ")) return nicheTemplates.kitchen;
  if (n.includes("fit") || n.includes("gym") || n.includes("yoga")) return nicheTemplates.fitness;
  if (n.includes("baby") || n.includes("parent")) return nicheTemplates.baby;
  if (n.includes("car") || n.includes("auto")) return nicheTemplates.car;
  return nicheTemplates.generic;
}

function currency(n) {
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
    const totalCost = Number(unitCost) + Number(shippingPerUnit) + Number(amazonFees) + Number(adCost);
    const unitProfit = Number(sellPrice) - totalCost;
    const landedCost = Number(unitCost) + Number(shippingPerUnit);
    const estimatedUnits = Math.max(0, Math.floor(Number(budget) / Math.max(landedCost, 0.01)));
    const projectedProfit = unitProfit * estimatedUnits;
    const margin = sellPrice > 0 ? (unitProfit / Number(sellPrice)) * 100 : 0;
    return { totalCost, unitProfit, landedCost, estimatedUnits, projectedProfit, margin };
  }, [budget, sellPrice, unitCost, shippingPerUnit, amazonFees, adCost]);

  const productIdea = template.examples[0];
  const brandName = template.branding[0];

}