// src/app/internships/[id]/apply/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  FileText,
  Upload,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react'
import { useStore } from '@/store/useStore'
import { internships } from '@/data/internships'
import toast from 'react-hot-toast'
import Link from 'next/link'

const applicationSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Valid phone number required'),
  education: z.string().min(2, 'Education details required'),
  skills: z.string().min(2, 'At least one skill required'),
  coverLetter: z.string().min(50, 'Cover letter must be at least 50 characters'),
  resumeLink: z.string().url('Valid resume link required').optional(),
  linkedinProfile: z.string().url('Valid LinkedIn URL required').optional(),
  portfolioLink: z.string().url('Valid portfolio URL required').optional(),
  availability: z.string().min(2, 'Availability required'),
  whyThisRole: z.string().min(50, 'Please explain why you want this role'),
})

type ApplicationFormData = z.infer<typeof applicationSchema>

export default function ApplyPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useStore()
  const [internship, setInternship] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  })

  useEffect(() => {
    const found = internships.find((i) => i.id === params.id)
    if (found) setInternship(found)

    // Pre-fill user data
    if (user) {
      setValue('fullName', user.name || '')
      setValue('email', user.email || '')
      setValue('phone', user.phone || '')
      setValue('education', user.education || '')
      setValue('skills', user.skills?.join(', ') || '')
    }

    // Redirect to login if not authenticated
    if (!user) {
      router.push('/auth?redirect=' + encodeURIComponent(window.location.pathname))
    }
  }, [user, params.id])

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          internship: internship,
          application: data,
          userId: user?.id,
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
        toast.success('Application submitted successfully!')
      } else {
        throw new Error('Failed to submit')
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-2xl p-12 text-center max-w-md mx-auto"
        >
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Application Submitted!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your application for {internship?.title} at {internship?.company} has been submitted.
            Check your email for confirmation.
          </p>
          <div className="space-y-3">
            <Link href="/internships" className="btn-primary block text-center">
              Browse More Internships
            </Link>
            <Link href="/profile" className="btn-outline block text-center">
              View My Applications
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  if (!internship) return null

  return (
    <div className="min-h-screen bg-gray-50/30 dark:bg-gray-950/30 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            href={`/internships/${params.id}`}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to internship
          </Link>

          <div className="glass-card rounded-2xl p-8 mb-6">
            <h1 className="text-2xl font-bold mb-2">Apply for {internship.title}</h1>
            <p className="text-gray-500">{internship.company} • {internship.location}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-8"
            >
              <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    {...register('fullName')}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Education</label>
                  <input
                    {...register('education')}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="B.Tech Computer Science"
                  />
                  {errors.education && (
                    <p className="text-red-500 text-sm mt-1">{errors.education.message}</p>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-8"
            >
              <h2 className="text-xl font-semibold mb-6">Professional Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Skills</label>
                  <input
                    {...register('skills')}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Python, React, Machine Learning..."
                  />
                  {errors.skills && (
                    <p className="text-red-500 text-sm mt-1">{errors.skills.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Resume Link</label>
                  <input
                    {...register('resumeLink')}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="https://drive.google.com/your-resume"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">LinkedIn Profile</label>
                  <input
                    {...register('linkedinProfile')}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="https://linkedin.com/in/your-profile"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Portfolio (Optional)</label>
                  <input
                    {...register('portfolioLink')}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="https://your-portfolio.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Availability</label>
                  <select
                    {...register('availability')}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select availability</option>
                    <option value="immediate">Immediate</option>
                    <option value="2weeks">Within 2 weeks</option>
                    <option value="1month">Within 1 month</option>
                    <option value="2months">Within 2 months</option>
                  </select>
                  {errors.availability && (
                    <p className="text-red-500 text-sm mt-1">{errors.availability.message}</p>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-2xl p-8"
            >
              <h2 className="text-xl font-semibold mb-6">Application Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Why do you want this role?
                  </label>
                  <textarea
                    {...register('whyThisRole')}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                    placeholder="Explain why you're interested in this role and what you can bring to the team..."
                  />
                  {errors.whyThisRole && (
                    <p className="text-red-500 text-sm mt-1">{errors.whyThisRole.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Cover Letter (Optional)
                  </label>
                  <textarea
                    {...register('coverLetter')}
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                    placeholder="Write a brief cover letter..."
                  />
                  {errors.coverLetter && (
                    <p className="text-red-500 text-sm mt-1">{errors.coverLetter.message}</p>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4"
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
              <Link
                href={`/internships/${params.id}`}
                className="btn-outline"
              >
                Cancel
              </Link>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
