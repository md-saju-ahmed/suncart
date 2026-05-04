import React from "react";
import SectionTitle from "../shared/SectionTitle";
import Container from "../shared/Container";

const SummerCare = () => {
  const tips = [
    {
      id: 1,
      icon: "💧",
      title: "Hydration First",
      desc: "Maintain your internal glow. Aim for 3 liters of water to keep your skin supple and energy high."
    },
    {
      id: 2,
      icon: "☀️",
      title: "Shield Your Skin",
      desc: "Broad-spectrum SPF isn't optional. Reapply every two hours to defend against UV fatigue."
    },
    {
      id: 3,
      icon: "🌿",
      title: "Breathable Layers",
      desc: "Opt for linen and lightweight cotton. Protect your body without compromising on comfort."
    }
  ];

  return (
    <section className="w-full py-5 lg:py-10 animate__animated animate__fadeIn">
      <Container>
        <SectionTitle
          title="Summer Care"
          subtitle="Essential rituals for the warmer months"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {tips.map((tip, index) => (
            <div
              key={tip.id}
              className="group p-8 rounded-2xl border border-slate-100 bg-slate-50/30 transition-all duration-300 hover:bg-white hover:border-transparent hover:ring-1 hover:ring-slate-200 hover:-translate-y-1 animate__animated animate__fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl mb-6 inline-block group-hover:scale-110 transition-transform">
                {tip.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3 tracking-tight">
                {tip.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                {tip.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default SummerCare;