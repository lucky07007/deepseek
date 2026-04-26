// src/app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Briefcase,
  Users,
  Building2,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  Award,
  Star,
  ChevronRight,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const stats = [
  { icon: Briefcase, label: 'Active Internships', value: '10,000+', suffix: '' },
  { icon: Building2, label: 'Partner Companies', value: '500+', suffix: '' },
  { icon: Users, label: 'Students Placed', value: '50,000+', suffix: '' },
  { icon: TrendingUp, label: 'Success Rate', value: '94', suffix: '%' },
]

const features = [
  {
    icon: Shield,
    title: 'Verified Companies',
    description: 'Every internship is manually verified by our team to ensure authenticity and quality.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Zap,
    title: 'Instant Apply',
    description: 'One-click applications with pre-filled profiles. Save time and apply faster.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Globe,
    title: 'Global Opportunities',
    description: 'Access internships from top companies worldwide. Remote, hybrid, and on-site.',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Award,
    title: 'Career Growth',
    description: 'Free tools, mentorship, and resources to accelerate your professional journey.',
    color: 'from-orange-500 to-orange-600',
  },
]

const trustedCompanies = [
  '/companies/google.svg',
  '/companies/microsoft.svg',
  '/companies/amazon.svg',
  '/companies/meta.svg',
  '/companies/apple.svg',
  '/companies/netflix.svg',
]

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Data Science Intern at Google',
    image: '/testimonials/priya.jpg',
    quote: 'InternAdda helped me land my dream internship at Google. The application process was seamless!',
    rating: 5,
  },
  {
    name: 'Rahul Verma',
    role: 'SDE Intern at Microsoft',
    image: '/testimonials/rahul.jpg',
    quote: 'The ATS checker and resume builder are game-changers. Got 3 interview calls in a week!',
    rating: 5,
  },
  {
    name: 'Ananya Patel',
    role: 'Product Intern at Amazon',
    image: '/testimonials/ananya.jpg',
    quote: 'Best platform for students. The career guidance chatbot is incredibly helpful.',
    rating: 5,
  },
]

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  if (!mounted) return null

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary-500/5 to-accent-500/5 rounded-full blur-3xl" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        <div className="relative max-w-7xl mx-auto text-center">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border border-green-200 dark:border-green-800 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              Powered by Upforge.org - Trusted by 50,000+ Students
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            Find Your
            <span className="gradient-text"> Dream Internship </span>
            <br />
            Launch Your Career
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Discover 10,000+ verified internships from top companies worldwide.
            Apply with one click, get hired faster with our AI-powered tools and expert guidance.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/internships" className="btn-primary text-lg px-8 py-4 group">
              Explore Internships
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/tools" className="btn-outline text-lg px-8 py-4 group">
              Try Free Tools
              <ChevronRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="glass-card rounded-2xl p-6 hover-card"
              >
                <stat.icon className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-3 mx-auto" />
                <div className="text-3xl font-bold font-display mb-1">
                  {stat.value}
                  <span className="text-primary-600">{stat.suffix}</span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trusted Companies Section */}
      <section className="py-16 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 mb-8">
            TRUSTED BY LEADING COMPANIES WORLDWIDE
          </p>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60 hover:opacity-100 transition-opacity duration-500">
            {trustedCompanies.map((company, index) => (
              <motion.div
                key={company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="w-32 h-12 relative grayscale hover:grayscale-0 transition-all duration-300"
              >
                <Image
                  src={company}
                  alt="Company logo"
                  fill
                  className="object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Why Choose <span className="gradient-text">InternAdda?</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We provide everything you need to land your dream internship
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="glass-card rounded-2xl p-8 h-full hover-card">
                  <div className={cn(
                    'w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center mb-6',
                    feature.color
                  )}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-950 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Get started in 3 simple steps
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Create Profile',
                description: 'Sign up and complete your profile with skills, education, and resume.',
                icon: User,
              },
              {
                step: '02',
                title: 'Find Internships',
                description: 'Browse thousands of verified internships and filter by your preferences.',
                icon: Search,
              },
              {
                step: '03',
                title: 'Apply & Get Hired',
                description: 'One-click apply with pre-filled details. Track applications and get hired!',
                icon: CheckCircle,
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="glass-card rounded-2xl p-8 text-center hover-card">
                  <div className="text-6xl font-bold font-display text-primary-600/10 dark:text-primary-400/10 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Success <span className="gradient-text">Stories</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Hear from students who landed their dream internships
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-8 hover-card"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-semibold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 opacity-90" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Launch Your Career?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join 50,000+ students who have found their dream internships through InternAdda
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth"
                className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Get Started Free
              </Link>
              <Link
                href="/internships"
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Browse Internships
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
