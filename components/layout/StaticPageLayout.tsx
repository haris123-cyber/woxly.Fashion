import { ReactNode } from "react";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/shared/Breadcrumbs";

interface StaticPageLayoutProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  children: ReactNode;
}

export function StaticPageLayout({ title, breadcrumbs, children }: StaticPageLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="mb-6" />}
      <h1 className="text-3xl font-fraunces font-bold mb-8">{title}</h1>
      <div className="prose prose-neutral dark:prose-invert max-w-none">{children}</div>
    </div>
  );
}
