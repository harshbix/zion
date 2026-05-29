'use client';

import { motion } from 'framer-motion';
import { aboutContent } from '@/lib/data';
import { Heart, Leaf, Sparkles, Award } from 'lucide-react';

const icons = [Heart, Leaf, Sparkles, Award];

export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-premium">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
            {aboutContent.title}
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Dedication to quality, community, and exceptional experiences
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {aboutContent.values.map((value, idx) => {
            const Icon = icons[idx];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="card-premium text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full">
                    <Icon className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-stone-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-stone-600 text-sm">{value.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {aboutContent.sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 md:p-10"
            >
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mb-4">
                {section.title}
              </h3>
              <p className="text-stone-700 text-lg leading-relaxed">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl">
            <p className="text-3xl md:text-4xl font-bold text-gradient mb-2">4.0⭐</p>
            <p className="text-stone-600">Customer Rating</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl">
            <p className="text-3xl md:text-4xl font-bold text-gradient mb-2">82+</p>
            <p className="text-stone-600">Happy Customers</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl">
            <p className="text-3xl md:text-4xl font-bold text-gradient mb-2">100%</p>
            <p className="text-stone-600">Fresh Ingredients</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl">
            <p className="text-3xl md:text-4xl font-bold text-gradient mb-2">24/7</p>
            <p className="text-stone-600">Open to Serve</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
