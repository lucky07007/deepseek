// src/app/profile/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/useStore'
import { createClient } from '@/lib/supabase/client'
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  FileText,
  Settings,
  Edit3,
  Save,
  X,
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const { user, setUser } = useStore()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    education: '',
    skills: '',
    resume_url: '',
    linkedin_url: '',
    portfolio_url: '',
  })
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    if (!user) {
      router.push('/auth?redirect=/profile')
      return
    }
    loadProfile()
  }, [user])

  const loadProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user?.id)
      .single()

    if (data) {
      setProfile({
        name: data.name || '',
        phone: data.phone || '',
        education: data.education || '',
        skills: data.skills?.join(', ') || '',
        resume_url: data.resume_url || '',
        linkedin_url: data.linkedin_url || '',
        portfolio_url: data.portfolio_url || '',
      })
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          name: profile.name,
          phone: profile.phone,
          education: profile.education,
          skills: profile.skills.split(',').map((s: string) => s.trim()),
          resume_url: profile.resume_url,
          linkedin_url: profile.linkedin_url,
          portfolio_url: profile.portfolio_url,
          updated_at: new Date(),
        })

      if (error) throw error

      setUser({
        ...user!,
        name: profile.name,
        phone: profile.phone,
        education: profile.education,
        skills: profile.skills.split(',').map((s: string) => s.trim()),
      })

      toast.success('Profile updated successfully!')
      setIsEditing(false)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950/50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-4xl font-bold mb-2">My Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your personal information and preferences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="glass-card rounded-2xl p-8 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
              </div>
              <h2 className="text-xl font-semibold mb-1">{user.name || 'User'}</h2>
              <p className="text-sm text-gray-500 mb-4">{user.email}</p>
              
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {user.phone && (
                  <div className="flex items-center gap-2 justify-center">
                    <Phone className="w-4 h-4" />
                    <span>{user.phone}</span>
                  </div>
                )}
                {user.education && (
                  <div className="flex items-center gap-2 justify-center">
                    <GraduationCap className="w-4 h-4" />
                    <span>{user.education}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="mt-6 w-full btn-primary"
              >
                <Edit3 className="w-4 h-4 inline mr-2" />
                Edit Profile
              </button>
            </div>
          </motion.div>

          {/* Profile Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="glass-card rounded-2xl p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl outline-none opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <GraduationCap className="w-4 h-4 inline mr-2" />
                    Education
                  </label>
                  <input
                    type="text"
                    value={profile.education}
                    onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
                    placeholder="B.Tech Computer Science, IIT Delhi"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Briefcase className="w-4 h-4 inline mr-2" />
                    Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    value={profile.skills}
                    onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
                    placeholder="Python, React, Machine Learning, SQL"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Resume URL
                  </label>
                  <input
                    type="url"
                    value={profile.resume_url}
                    onChange={(e) => setProfile({ ...profile, resume_url: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
                    placeholder="https://drive.google.com/your-resume"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    value={profile.linkedin_url}
                    onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
                    placeholder="https://linkedin.com/in/your-profile"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Portfolio URL
                  </label>
                  <input
                    type="url"
                    value={profile.portfolio_url}
                    onChange={(e) => setProfile({ ...profile, portfolio_url: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
                    placeholder="https://your-portfolio.com"
                  />
                </div>

                {isEditing && (
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="btn-primary flex-1 disabled:opacity-50"
                    >
                      <Save className="w-4 h-4 inline mr-2" />
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="btn-outline"
                    >
                      <X className="w-4 h-4 inline mr-2" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* My Applications */}
            <div className="glass-card rounded-2xl p-8 mt-6">
              <h3 className="text-xl font-semibold mb-6">My Applications</h3>
              <ApplicationsList />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// Applications List Component
function ApplicationsList() {
  const [applications, setApplications] = useState<any[]>([])
  const { user } = useStore()
  const supabase = createClient()

  useEffect(() => {
    loadApplications()
  }, [])

  const loadApplications = async () => {
    const { data } = await supabase
      .from('applications')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false })

    if (data) setApplications(data)
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-8">
        <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">No applications yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <div
          key={app.id}
          className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl"
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold">{app.internship_title}</h4>
              <p className="text-sm text-gray-500">{app.company}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              app.status === 'pending' 
                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                : app.status === 'accepted'
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
            }`}>
              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Applied on {new Date(app.created_at).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  )
}
