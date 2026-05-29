'use client';

import { motion } from 'framer-motion';
import { aboutContent } from '@/lib/data';
import { Heart, Leaf, Sparkles, Award } from 'lucide-react';

const icons = [Heart, Leaf, Sparkles, Award];

export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-premium">
        {/* Premium Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4"
          >
            <span
              className="text-sm font-black text-orange-600 tracking-widest"
              style={{ fontFamily: 'Montserrat' }}
            >
              OUR STORY
            </span>
          </motion.div>
          <h2
            className="text-5xl md:text-6xl font-black text-stone-900 mb-6 leading-tight"
            style={{ fontFamily: 'Playfair Display', letterSpacing: '-0.02em' }}
          >
            {aboutContent.title}
          </h2>
          <p
            className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Roboto', fontWeight: 300 }}
          >
            Dedication to quality, community, and exceptional experiences
          </p>
        </motion.div>

        {/* Premium Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {aboutContent.values.map((value, idx) => {
            const Icon = icons[idx];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white to-amber-50 border border-amber-100 p-8 shadow-lg hover:shadow-2xl transition-all duration-500">
                  {/* Animated background */}
                  <motion.div className="absolute inset-0 bg-gradient-to-br from-orange-400/0 to-yellow-400/0 hover:from-orange-400/5 hover:to-yellow-400/5 transition-all duration-500" />

                  <div className="relative z-10 flex flex-col items-center">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      className="mb-6"
                    >
                      <div className="p-4 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl">
                        <Icon className="w-7 h-7 text-orange-600" />
                      </div>
                    </motion.div>
                    <h3
                      className="text-xl font-bold text-stone-900 mb-3 text-center"
                      style={{ fontFamily: 'Montserrat' }}
                    >
                      {value.title}
                    </h3>
                    <p
                      className="text-stone-600 text-sm text-center leading-relaxed"
                      style={{ fontFamily: 'Roboto', fontWeight: 300 }}
                    >
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Premium Content Sections */}
        <div className="space-y-8 mb-20">
          {aboutContent.sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="rounded-2xl overflow-hidden bg-gradient-to-br from-white to-amber-50 border border-amber-100 shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="p-10 md:p-12">
                <h3
                  className="text-3xl md:text-4xl font-bold text-stone-900 mb-6"
                  style={{ fontFamily: 'Montserrat' }}
                >
                  {section.title}
                </h3>
                <p
                  className="text-stone-700 text-lg leading-relaxed"
                  style={{ fontFamily: 'Roboto', fontWeight: 300 }}
                >
                  {section.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Premium Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: '4.0⭐', label: 'Customer Rating' },
            { number: '82+', label: 'Happy Customers' },
            { number: '100%', label: 'Fresh Ingredients' },
            { number: '24/7', label: 'Open to Serve' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-100 p-8 shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <motion.div className="absolute inset-0 bg-gradient-to-br from-orange-400/0 to-yellow-400/0 hover:from-orange-400/5 hover:to-yellow-400/5 transition-all duration-500" />
              <div className="relative z-10 text-center">
                <p
                  className="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text mb-3"
                  style={{ fontFamily: 'Montserrat' }}
                >
                  {stat.number}
                </p>
                <p
                  className="text-stone-600 font-semibold"
                  style={{ fontFamily: 'Montserrat' }}
                >
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
