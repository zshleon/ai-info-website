import ToolDetail from "@/components/ToolDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <ToolDetail slug={slug} />
      <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-xs text-gray-400">
        <p>
          AI Pay Transparency · 独立维护 ·
          <a
            href="https://github.com/zshleon/ai-info-website/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline ml-1"
          >
            提交纠错
          </a>
        </p>
      </footer>
    </main>
  );
}

export async function generateStaticParams() {
  return [
    { slug: "claude-pro" },
    { slug: "chatgpt-plus" },
    { slug: "google-ai-pro" },
    { slug: "cursor-pro" },
    { slug: "github-copilot" },
  ];
}
