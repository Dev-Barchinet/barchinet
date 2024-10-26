import { withAuth } from 'next-auth/middleware'

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { Locale, routing } from './config/i18n/routing'

const protectedPaths = ['/']

function getProtectedRoutes(protectedPaths: string[], locales: Locale[]) {
  let protectedPathsWithLocale = [...protectedPaths]

  protectedPaths.forEach(route => {
    locales.forEach(
      locale =>
        (protectedPathsWithLocale = [
          ...protectedPathsWithLocale,
          `/${locale}${route}`
        ])
    )
  })

  return protectedPathsWithLocale
}

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  const locales: readonly[Locale] = routing.locales
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  const locale = matchLocale(languages, locales, routing.defaultLocale)
  return locale
}

const middleware = withAuth(
  function middleware(request) {
    const token = request.nextauth?.token
    const pathname = request.nextUrl.pathname

    if (pathname.startsWith('/assets')) {
      return NextResponse.next()
    }
    
    const pathnameIsMissingLocale = routing.locales.every(
      locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    const protectedPathsWithLocale = getProtectedRoutes(protectedPaths, [
      ...routing.locales
    ])

    // If the user is not authenticated and the path is protected, redirect to login
    const callbackUrl = pathname || '/'
    const locale = getLocale(request)
    if (!token && protectedPathsWithLocale.includes(pathname+'/')) {
      return NextResponse.redirect(
        new URL(
          `/${locale}/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`,
          request.url
        )
      )
    }

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
      return NextResponse.redirect(
        new URL(
          `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
          request.url
        )
      )
    }
  },
  {
    callbacks: {
      authorized: () => true
    }
  }
)

export default middleware