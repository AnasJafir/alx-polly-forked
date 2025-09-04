'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function VerifyEmailPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Verify your email</CardTitle>
          <CardDescription className="text-center">
            We sent a verification link to your email. Please verify your account to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-600 text-center">
            After verifying, return here and proceed to the app.
          </p>
          <div className="flex justify-center">
            <Link href="/login">
              <Button variant="default">Back to login</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


