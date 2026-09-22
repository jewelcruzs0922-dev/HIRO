export interface Faq {
  q: string;
  a: string;
  category: string;
}

export const faqs: Faq[] = [
  {
    q: "How far can I ride on a single charge?",
    a: "Real-world range depends on terrain, weather, rider weight, and how much assist you use. In ideal conditions, the HIRO Trail delivers up to 100 km, the City up to 80 km, and the Fold up to 60 km. Riding in eco mode on flat ground will always get you closest to these figures — full-power hill sessions will naturally use more.",
    category: "Battery & charging",
  },
  {
    q: "How long does charging take, and how should I treat the battery?",
    a: "A full charge takes roughly 4–6 hours from empty. The Samsung lithium cells inside every HIRO handle top-ups well, so you can plug in whenever it's convenient rather than waiting for empty. For day-to-day care, charge to 100% before a long ride, avoid leaving the battery fully depleted for weeks at a time, and store the bike somewhere cool and dry.",
    category: "Battery & charging",
  },
  {
    q: "What does the warranty actually cover?",
    a: "Every HIRO includes a 2-year warranty covering the frame, motor, battery (including capacity retention above 70%), display, and electronics against manufacturing defects. Wear items — brake pads, tires, chains — are covered for 90 days, since they naturally consume with riding. Crash damage, corrosion from neglect, and modifications by non-certified shops aren't covered; we'll still help you get parts at standard rates.",
    category: "Warranty",
  },
  {
    q: "Can I ride in the rain?",
    a: "Yes. HIRO e-bikes are designed for everyday commuting, rain included — sealed electronics, covered ports, and corrosion-resistant hardware come as standard. You can confidently ride through showers and puddles. What we don't recommend is pressure-washing the bike or submerging it — rinse with a gentle stream and dry the drivetrain after very wet rides.",
    category: "Everyday riding",
  },
  {
    q: "How often does my bike need servicing?",
    a: "Every 3 months or 500 km — whichever comes first — for riders using their HIRO daily; once a year for weekend riders. Between visits, spend five minutes a month checking tire pressure, brake feel, and that everything's tight — those small habits prevent most roadside surprises. Support can match you with a certified workshop or walk you through a home service checklist.",
    category: "Everyday riding",
  },
  {
    q: "Do you ship internationally, and what about returns?",
    a: "We currently ship across the EU, with delivery typically 3–5 business days and tracking from the moment your bike leaves our workshop. If you change your mind, unused bikes can be returned within 14 days of delivery for a full refund — just contact support to arrange collection. Anything that has been ridden is inspected before refund to keep things fair for everyone.",
    category: "Orders & delivery",
  },
  {
    q: "How do I track or change an order?",
    a: "You'll receive a confirmation email with your order ID the moment you check out, followed by tracking when the bike ships. Need to change an address or pause an order? Write to support@hiro.bike with your order ID within 24 hours of placing it, and we'll do everything we can before the bike leaves the workshop.",
    category: "Orders & delivery",
  },
  {
    q: "Something's wrong out of the box — what now?",
    a: "That's what we're here for. Email support@hiro.bike with your order ID, a short description, and photos or a video of the issue. Most out-of-the-box faults are resolved with remote guidance within one business day; if a part needs replacing, we ship it immediately under warranty at no cost to you.",
    category: "Faults & fixes",
  },
];

export interface FaqGroup {
  category: string;
  items: Faq[];
}

export const faqGroups: FaqGroup[] = faqs.reduce<FaqGroup[]>((groups, faq) => {
  const last = groups[groups.length - 1];
  if (last && last.category === faq.category) {
    last.items.push(faq);
  } else {
    groups.push({ category: faq.category, items: [faq] });
  }
  return groups;
}, []);
