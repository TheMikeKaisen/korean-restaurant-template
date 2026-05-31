import { PageTransition } from '@/components/animations/PageTransition'

export default function SlugTemplate({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>
}