export default function Home() {
  return (
    <main className="min-h-screen p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <div className="terminal-card animate-fade-in">
          <div className="space-y-4">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 pb-4 border-b border-terminal-border">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-terminal-error"></div>
                <div className="w-3 h-3 rounded-full bg-terminal-command"></div>
                <div className="w-3 h-3 rounded-full bg-terminal-success"></div>
              </div>
              <span className="text-terminal-textMuted text-sm ml-2">neo-terminal</span>
            </div>

            {/* Welcome Message */}
            <div className="space-y-2">
              <p className="text-terminal-textMuted">
                <span className="terminal-prompt">❯</span> ./welcome.sh
              </p>
              <div className="pl-4 space-y-2">
                <h1 className="text-4xl font-bold text-gradient mb-4">
                  Neo-Terminal Portfolio
                </h1>
                <p className="text-terminal-text">
                  System initialized successfully<span className="terminal-cursor"></span>
                </p>
                <div className="pt-4 space-y-1">
                  <p className="text-terminal-textMuted">
                    <span className="text-terminal-cyan">›</span> Version: 1.0.0
                  </p>
                  <p className="text-terminal-textMuted">
                    <span className="text-terminal-cyan">›</span> Status: Development
                  </p>
                  <p className="text-terminal-textMuted">
                    <span className="text-terminal-cyan">›</span> Framework: Next.js 14
                  </p>
                </div>
              </div>
            </div>

            {/* Command Prompt */}
            <div className="pt-4 border-t border-terminal-border">
              <p className="text-terminal-textMuted">
                <span className="terminal-prompt">❯</span>{" "}
                <span className="text-terminal-text">Ready for development...</span>
                <span className="terminal-cursor"></span>
              </p>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="mt-6 text-center text-terminal-textMuted text-sm">
          <p>Next.js 14 • TypeScript • Tailwind CSS • Neo-Terminal Theme</p>
        </div>
      </div>
    </main>
  );
}
