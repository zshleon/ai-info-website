import ComparisonTable from "@/components/ComparisonTable";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <ComparisonTable />

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-xs text-gray-400 space-y-2">
        <p>
          数据仅供参考，AI 产品政策频繁变动。发现错误？
          <a
            href="https://github.com/zshleon/ai-info-website/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline ml-1"
          >
            提交纠错 →
          </a>
        </p>
        <p>AI Pay Transparency · 独立维护 · 非商业项目</p>
      </footer>
    </main>
  );
}
