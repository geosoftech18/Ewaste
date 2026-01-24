import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('admin_session')

    console.log('Checking session, cookies:', cookieStore.getAll())
    console.log('Session token:', sessionToken)

    if (!sessionToken) {
      return NextResponse.json(
        { success: true, authenticated: false }
      )
    }

    try {
      // Decode and verify session token
      const sessionData = JSON.parse(
        Buffer.from(sessionToken.value, 'base64').toString()
      )

      console.log('Session data:', sessionData)

      if (sessionData.authenticated) {
        return NextResponse.json({
          success: true,
          authenticated: true,
          email: sessionData.email,
        })
      }
    } catch (error) {
      console.error('Error parsing session token:', error)
    }

    return NextResponse.json(
      { success: true, authenticated: false }
    )
  } catch (error) {
    console.error('Error in check-session:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}

