// src/components/Footer.tsx
import Link from 'next/link'
import Image from 'next/image'
import {
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.jpg"
                alt="InternAdda"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="font-display font-bold text-xl">
                <span className="text-primary-600">Intern</span>Adda
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Your gateway to professional success. Find dream internships at top companies worldwide.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Twitter, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Github, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Youtube, href: '#' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'Browse Internships', href: '/internships' },
                { label: 'ATS Checker', href: '/tools/ats-checker' },
                { label: 'Resume Builder', href: '/tools/resume-builder' },
                { label: 'Career Journal', href: '/journal' },
                { label: 'Create Account', href: '/auth' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {[
                { label: 'Career Guides', href: '/journal/category/career-guides' },
                { label: 'Interview Tips', href: '/journal/category/interview-tips' },
                { label: 'Resume Templates', href: '/tools/resume-builder/templates' },
                { label: 'Success Stories', href: '/journal/category/success-stories' },
                { label: 'FAQ', href: '/faq' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  support@internadda.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Bangalore, India
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  +91 98765 43210
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2024 InternAdda. All rights reserved. Powered by{' '}
              <a href="https://upforge.org" className="text-primary-600 font-medium hover:underline">
                Upforge.org
              </a>
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
