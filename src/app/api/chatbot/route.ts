// src/app/api/chatbot/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { message, context } = await req.json()

    const systemPrompt = `You are a helpful career assistant for InternAdda, a platform powered by Upforge.org that helps students find internships. 

Available internships context:
${JSON.stringify(context.internships, null, 2)}

Your role:
1. Help students find relevant internships from our listings
2. Provide career guidance and advice
3. Explain application processes
4. Give tips for interviews and resume building
5. Answer questions about specific companies or roles
6. Recommend skills to learn for specific career paths

Be friendly, professional, and encouraging. Keep responses concise but helpful. 
If you don't know something, be honest and suggest where they can find the information.
Always promote InternAdda's tools (ATS checker, resume builder) when relevant.`

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        ...context.history.map((msg: any) => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content,
        })),
        { role: 'user', content: message },
      ],
      model: 'mixtral-8x7b-32768',
      temperature: 0.7,
      max_tokens: 500,
    })

    return NextResponse.json({
      response: completion.choices[0]?.message?.content || 'I apologize, but I couldn\'t process that. Please try again.',
    })
  } catch (error) {
    console.error('Chatbot error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
