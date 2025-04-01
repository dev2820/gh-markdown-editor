import type { Route } from "./+types/dashboard";

import { cn } from "@/utils/cn";
import { SiteLogo } from "@/components/SiteLogo";
import { Spacer } from "@/components/ui/Spacer";
import { UserProfile } from "@/components/UserProfile";
import { NavLink, redirect } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({ context,request }: Route.LoaderArgs) {
  function getTokenFromCookie(cookieHeader: string | null): string | null {
    if (!cookieHeader) return null;
    const cookies = Object.fromEntries(cookieHeader.split('; ').map(c => c.split('=')));
    return cookies.token || null;
  }
  
  const token = getTokenFromCookie(request.headers.get("Cookie"));
  if (token) {
    return { message: "Hello from Vercel" };
  } else {
    return redirect("/login");
  }
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  return (
    <main className={cn("flex flex-col w-dvw h-dvh overflow-auto")}>
    <header className="h-12">
      <div
        className={cn(
          "h-full flex flex-row place-items-center mx-auto w-full max-w-desktop px-4 items-stretch"
        )}
      >
        <NavLink to="/">
          <SiteLogo className="h-full" />
        </NavLink>
        <Spacer />
        <UserProfile />
      </div>
    </header>
    <div className="w-full max-w-desktop mx-auto px-4">
      dashboard
    </div>
  </main>
  )
}