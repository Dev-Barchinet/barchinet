'use client';

export default function UnderConstructionPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-muted/50">
      <div className="text-center">
        <div className="text-5xl font-bold text-primary">
          🚧 Under Construction 🚧
        </div>
        <p className="mt-4 text-lg text-muted-foreground">
          We&apos;re working hard to get this page ready for you.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Check back soon for updates!
        </p>
        <div className="mt-6">
          <div className="h-4 w-48 mx-auto rounded-full bg-muted">
            <div className="h-4 w-1/4 animate-pulse rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
