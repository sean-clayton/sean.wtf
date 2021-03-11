import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";

export default function PostLayout({ children }) {
  return (
    <main className="min-h-screen flex flex-col">
      <GlobalHeader />
      <div className="flex-1 p-4">{children}</div>
      <GlobalFooter />
    </main>
  );
}
