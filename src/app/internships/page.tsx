// src/app/internships/page.tsx
'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  Search,
  Filter,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Building2,
  TrendingUp,
  Bookmark,
  ChevronRight,
  SlidersHorizontal,
  X,
  Grid3X3,
  List,
} from 'lucide-react'
import { internships, categories, locations } from '@/data/internships'
import { cn } from '@/lib/utils'

type ViewMode = 'grid' | 'list'
type SortBy = 'recent' | 'stipend' | 'deadline'

export default function InternshipsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [selectedType, setSelectedType] = useState('All')
  const [sortBy, setSortBy] = useState<SortBy>('recent')
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [showFilters, setShowFilters] = useState(false)
  const [savedInternships, setSavedInternships] = useState<string[]>([])

  const filteredInternships = useMemo(() => {
    let filtered = [...internships]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (intern) =>
          intern.title.toLowerCase().includes(query) ||
          intern.company.toLowerCase().includes(query) ||
          intern.skills.some((skill) => skill.toLowerCase().includes(query)) ||
          intern.category.toLowerCase().includes(query)
      )
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((intern) => intern.category === selectedCategory)
    }

    if (selectedLocation !== 'All') {
      filtered = filtered.filter((intern) => intern.location === selectedLocation)
    }

    if (selectedType !== 'All') {
      filtered = filtered.filter((intern) => intern.type === selectedType)
    }

    switch (sortBy) {
      case 'stipend':
        filtered.sort((a, b) => {
          const aStipend = parseInt(a.stipend.replace(/[^0-9]/g, ''))
          const bStipend = parseInt(b.stipend.replace(/[^0-9]/g, ''))
          return bStipend - aStipend
        })
        break
      case 'deadline':
        filtered.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
        break
      default:
        filtered.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
    }

    return filtered
  }, [searchQuery, selectedCategory, selectedLocation, selectedType, sortBy])

  const toggleSave = (id: string) => {
    setSavedInternships((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/30 dark:bg-gray-950/30 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-gray-500 mb-4"
          >
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white">Internships</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold mb-2"
          >
            Find Your <span className="gradient-text">Perfect Internship</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 dark:text-gray-400"
          >
            {filteredInternships.length} internships available
          </motion.p>
        </div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-4 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, company, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  'px-4 py-3 rounded-xl flex items-center gap-2 transition-all',
                  showFilters
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                )}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className="px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl outline-none cursor-pointer"
              >
                <option value="recent">Most Recent</option>
                <option value="stipend">Highest Stipend</option>
                <option value="deadline">Deadline Soon</option>
              </select>

              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-2 rounded-lg transition-all',
                    viewMode === 'list' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-2 rounded-lg transition-all',
                    viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''
                  )}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Extended Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="grid sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl outline-none"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Location Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl outline-none"
                    >
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>

                  {/* Type Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Work Type</label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl outline-none"
                    >
                      <option value="All">All Types</option>
                      <option value="Remote">Remote</option>
                      <option value="On-site">On-site</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Internships List */}
        <div className={cn(
          viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'
        )}>
          <AnimatePresence>
            {filteredInternships.map((internship, index) => (
              <motion.div
                key={internship.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                {viewMode === 'list' ? (
                  /* List View - Forbes Style */
                  <Link href={`/internships/${internship.id}`}>
                    <div className="glass-card rounded-2xl p-6 hover-card group relative overflow-hidden">
                      {/* Featured Badge */}
                      {internship.featured && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-semibold rounded-full">
                          Featured
                        </div>
                      )}

                      <div className="flex items-start gap-4">
                        {/* Company Logo */}
                        <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <Image
                            src={internship.logo}
                            alt={internship.company}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-lg font-semibold mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                {internship.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 font-medium">
                                {internship.company}
                              </p>
                            </div>
                            
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                toggleSave(internship.id)
                              }}
                              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                              <Bookmark
                                className={cn(
                                  'w-5 h-5',
                                  savedInternships.includes(internship.id)
                                    ? 'fill-primary-600 text-primary-600'
                                    : 'text-gray-400'
                                )}
                              />
                            </button>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {internship.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              {internship.type}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              {internship.stipend}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {internship.duration}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-2 mt-4">
                            {internship.skills.slice(0, 3).map((skill) => (
                              <span
                                key={skill}
                                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-xs font-medium rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                            {internship.skills.length > 3 && (
                              <span className="px-3 py-1 text-xs text-gray-500">
                                +{internship.skills.length - 3} more
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <span className="text-xs text-gray-500">
                              Posted {internship.postedDate}
                            </span>
                            <div className="flex items-center gap-4">
                              <span className="text-xs text-gray-500">
                                {internship.applicants.toLocaleString()} applicants
                              </span>
                              <span className="text-sm font-medium text-primary-600 dark:text-primary-400 flex items-center gap-1">
                                Apply Now
                                <ChevronRight className="w-4 h-4" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  /* Grid View */
                  <Link href={`/internships/${internship.id}`}>
                    <div className="glass-card rounded-2xl p-6 hover-card group h-full">
                      <div className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                        <Image
                          src={internship.logo}
                          alt={internship.company}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                      
                      <h3 className="font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                        {internship.title}
                      </h3>
                      <p className="
