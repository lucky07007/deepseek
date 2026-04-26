// src/app/api/apply/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@/lib/supabase/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { internship, application, userId } = body

    // Store application in Supabase
    const supabase = createClient()
    const { data, error } = await supabase
      .from('applications')
      .insert({
        user_id: userId,
        internship_id: internship.id,
        internship_title: internship.title,
        company: internship.company,
        full_name: application.fullName,
        email: application.email,
        phone: application.phone,
        education: application.education,
        skills: application.skills,
        resume_link: application.resumeLink,
        linkedin: application.linkedinProfile,
        portfolio: application.portfolioLink,
        availability: application.availability,
        cover_letter: application.coverLetter,
        why_this_role: application.whyThisRole,
        status: 'pending',
      })
      .select()

    if (error) throw error

    // Send confirmation email to candidate
    await resend.emails.send({
      from: 'InternAdda <applications@internadda.com>',
      to: application.email,
      subject: `Application Received - ${internship.title} at ${internship.company}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Application Confirmation</title>
        </head>
        <body style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://internadda.com/logo.jpg" alt="InternAdda" style="width: 60px; height: 60px; border-radius: 12px;">
            <h1 style="color: #2563eb; margin-top: 10px;">InternAdda</h1>
          </div>
          
          <div style="background: linear-gradient(135deg, #eff6ff, #dbeafe); padding: 30px; border-radius: 16px;">
            <h2 style="color: #1e40af; margin-bottom: 10px;">Application Submitted Successfully! 🎉</h2>
            <p>Dear ${application.fullName},</p>
            <p>Your application for <strong>${internship.title}</strong> at <strong>${internship.company}</strong> has been received.</p>
            
            <div style="background: white; padding: 20px; border-radius: 12px; margin: 20px 0;">
              <h3 style="color: #059669; margin-bottom: 15px;">Application Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">Position</td>
                  <td style="padding: 8px 0; font-weight: 600;">${internship.title}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">Company</td>
                  <td style="padding: 8px 0; font-weight: 600;">${internship.company}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">Location</td>
                  <td style="padding: 8px 0; font-weight: 600;">${internship.location}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">Stipend</td>
                  <td style="padding: 8px 0; font-weight: 600;">${internship.stipend}</td>
                </tr>
              </table>
            </div>
            
            <p style="color: #6b7280;">The company will review your application and reach out to you directly if shortlisted.</p>
            <p style="color: #6b7280;">You can track your application status from your InternAdda profile.</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 14px;">Powered by <strong>Upforge.org</strong></p>
            <p style="color: #9ca3af; font-size: 12px;">InternAdda - Your Gateway to Professional Success</p>
          </div>
        </body>
        </html>
      `,
    })

    // Send notification to admin
    await resend.emails.send({
      from: 'InternAdda <notifications@internadda.com>',
      to: process.env.ADMIN_EMAIL!,
      subject: `New Application - ${internship.title} at ${internship.company}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2>New Application Received</h2>
          <p><strong>Position:</strong> ${internship.title}</p>
          <p><strong>Company:</strong> ${internship.company}</p>
          <p><strong>Applicant:</strong> ${application.fullName}</p>
          <p><strong>Email:</strong> ${application.email}</p>
          <p><strong>Phone:</strong> ${application.phone}</p>
        </div>
      `,
    })

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: data[0].id,
    })
  } catch (error) {
    console.error('Application error:', error)
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    )
  }
}
