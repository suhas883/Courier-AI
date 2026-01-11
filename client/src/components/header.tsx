import { Package, Sparkles } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Link } from "wouter";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" data-testid="link-home">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
              <Package className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold tracking-tight">LiveTrackings</span>
          </div>
        </Link>
        
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Powered by AI</span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
