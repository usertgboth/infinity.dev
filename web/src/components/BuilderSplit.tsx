"use client";
import { useState } from "react";
import { MessageSquare, Workflow as WorkflowIcon } from "lucide-react";

type Tab = "chat" | "canvas";

export default function BuilderSplit({
  chat,
  canvas,
  toolbar,
}: {
  chat: React.ReactNode;
  canvas: React.ReactNode;
  toolbar?: React.ReactNode;
}) {
  const [tab, setTab] = useState<Tab>("chat");

  return (
    <div className="h-full flex flex-col md:grid md:grid-cols-[440px_1fr]">
      {/* Mobile tab bar */}
      <div className="md:hidden flex items-center gap-1 px-3 pt-3 pb-2 border-b border-border bg-bg">
        <button
          onClick={() => setTab("chat")}
          className={`flex-1 flex items-center justify-center gap-2 text-sm py-2 rounded-xl transition-colors press ${
            tab === "chat" ? "bg-white/[0.06] text-text border border-border" : "text-muted"
          }`}
        >
          <MessageSquare className="size-3.5 icon-thin" /> Chat
        </button>
        <button
          onClick={() => setTab("canvas")}
          className={`flex-1 flex items-center justify-center gap-2 text-sm py-2 rounded-xl transition-colors press ${
            tab === "canvas" ? "bg-white/[0.06] text-text border border-border" : "text-muted"
          }`}
        >
          <WorkflowIcon className="size-3.5 icon-thin" /> Canvas
        </button>
      </div>

      {/* Chat panel */}
      <div className={`${tab === "chat" ? "flex" : "hidden"} md:flex flex-col min-h-0 flex-1 md:flex-none md:h-full`}>
        {chat}
      </div>

      {/* Canvas panel */}
      <div className={`${tab === "canvas" ? "flex" : "hidden"} md:flex flex-col min-h-0 flex-1 md:flex-none md:h-full`}>
        {toolbar}
        <div className="flex-1 min-h-0">{canvas}</div>
      </div>
    </div>
  );
}
