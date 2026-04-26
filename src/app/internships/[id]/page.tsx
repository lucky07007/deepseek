// src/app/internships/[id]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Building2,
  Users,
  Calendar,
  Share2,
  Bookmark,
  Shield,
  CheckCircle,
  ArrowLeft,
  ExternalLink,
  FileText,
  Star,
  TrendingUp,
  GraduationCap,
} from 'lucide-react'
import { internships } from '@/data/internships'
import { useStore } from '@/store/useStore'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function InternshipDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useStore()
  const [internship, setInternship] = useState<any>(null)
  const [isApplying, setIsApplying] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    const found = internships.find((i) => i.id === params.id)
    if (found) setInternship(found)
  }, [params.id])

  const handleApply = () => {
    if (!user) {
      router.push('/auth?redirect=' + encodeURIComponent(`/internships/${params.id}/apply`))
      return
    }
    router.push(`/internships/${params.id}/apply`)
  }

  if (!internship) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Briefcase className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Internship Not Found</h2>
          <Link href="/internships" className="text-primary-600 hover:underline">
            Browse all internships
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/30 dark:bg-gray-950/30 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-gray-500 mb-8"
        >
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <span>/</span>
          <Link href="/internships" className="hover:text-primary-600">Internships</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">{internship.title}</span>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Company Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <Image
                    src={internship.logo}
                    alt={internship.company}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                        {internship.title}
                      </h1>
                      <p className="text-lg text-gray-600 dark:text-gray-400">
                        {internship.company}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsSaved(!isSaved)}
                        className={cn(
                          'p-3 rounded-xl transition-all',
                          isSaved
                            ? 'bg-primary-100 dark:bg-primary-900 text-primary-600'
                            : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                        )}
                      >
                        <Bookmark className={cn('w-5 h-5', isSaved && 'fill-current')} />
                      </button>
                      <button className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="flex flex-wrap gap-3 mt-4">
                    {internship.trusted && (
                      <span className="trust-badge">
                        <Shield className="w-4 h-4" />
                        Verified Company
                      </span>
                    )}
                    <span className="trust-badge">
                      <CheckCircle className="w-4 h-4" />
                      Active Hiring
                    </span>
                    <span className="trust-badge">
                      <Users className="w-4 h-4" />
                      {internship.applicants.toLocaleString()}+ Applied
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: MapPin, label: 'Location', value: internship.location },
                  { icon: Briefcase, label: 'Type', value: internship.type },
                  { icon: DollarSign, label: 'Stipend', value: internship.stipend },
                  { icon: Calendar, label: 'Duration', value: internship.duration },
                ].map((detail) => (
                  <div
                    key={detail.label}
                    className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl"
                  >
                    <detail.icon className="w-5 h-5 text-primary-600 mb-2" />
                    <p className="text-xs text-gray-500 mb-1">{detail.label}</p>
                    <p className="font-semibold text-sm">{detail.value}</p>
                  </div>
                ))}
              </div>

              {/* Deadline Alert */}
              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-xl flex items-center gap-3">
                <Clock className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="font-medium text-yellow-800 dark:text-yellow-200">
                    Application Deadline: {internship.deadline}
                  </p>
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">
                    Apply before the deadline to be considered
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6">About the Internship</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                {internship.description}
              </p>

              <h3 className="text-xl font-semibold mb-4">Requirements</h3>
              <ul className="space-y-3 mb-8">
                {internship.requirements.map((req: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{req}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold mb-4">Skills Required</h3>
              <div className="flex flex-wrap gap-2">
                {internship.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300 rounded-lg font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6">About {internship.company}</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {internship.company} is a global technology leader committed to innovation and excellence.
                With thousands of employees worldwide, they offer unparalleled opportunities for
                professional growth and development.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-center">
                  <TrendingUp className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">5000+</p>
                  <p className="text-sm text-gray-500">Employees</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-center">
                  <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">4.8/5</p>
                  <p className="text-sm text-gray-500">Rating</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-6 sticky top-24"
            >
              <h3 className="text-xl font-bold mb-4">Ready to Apply?</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary-600" />
                  <span className="text-sm">One-click application</span>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-primary-600" />
                  <span className="text-sm">Perfect for students</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary-600" />
                  <span className="text-sm">Quick response</span>
                </div>
              </div>

              <button
                onClick={handleApply}
                className="w-full btn-primary text-lg mb-3"
              >
                Apply Now
              </button>

              <button className="w-full btn-outline text-sm">
                <Bookmark className="w-4 h-4 inline mr-2" />
                Save for Later
              </button>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 text-center">
                  Powered by <span className="font-semibold">Upforge.org</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
