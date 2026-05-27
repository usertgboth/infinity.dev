import {
  Mail, MessageSquare, Database, Globe, Filter, GitBranch, Bot, Calendar, Zap, FileText,
  Send, Image as ImageIcon, Settings, Code, Webhook, Cog, Cloud, ShoppingCart, CreditCard,
  Sparkles,
} from "lucide-react";

const map: Record<string, { label: string; icon: any; color: string }> = {
  "n8n-nodes-base.scheduleTrigger": { label: "Schedule", icon: Calendar, color: "#22c55e" },
  "n8n-nodes-base.cron": { label: "Cron", icon: Calendar, color: "#22c55e" },
  "n8n-nodes-base.webhook": { label: "Webhook", icon: Webhook, color: "#22c55e" },
  "n8n-nodes-base.manualTrigger": { label: "Manual", icon: Zap, color: "#22c55e" },
  "n8n-nodes-base.httpRequest": { label: "HTTP", icon: Globe, color: "#3b82f6" },
  "n8n-nodes-base.set": { label: "Set", icon: Settings, color: "#a78bfa" },
  "n8n-nodes-base.if": { label: "Branch", icon: GitBranch, color: "#f59e0b" },
  "n8n-nodes-base.switch": { label: "Switch", icon: GitBranch, color: "#f59e0b" },
  "n8n-nodes-base.filter": { label: "Filter", icon: Filter, color: "#f59e0b" },
  "n8n-nodes-base.code": { label: "Code", icon: Code, color: "#a78bfa" },
  "n8n-nodes-base.function": { label: "Function", icon: Code, color: "#a78bfa" },
  "n8n-nodes-base.gmail": { label: "Gmail", icon: Mail, color: "#ef4444" },
  "n8n-nodes-base.slack": { label: "Slack", icon: MessageSquare, color: "#7c5cff" },
  "n8n-nodes-base.telegram": { label: "Telegram", icon: Send, color: "#3b82f6" },
  "n8n-nodes-base.discord": { label: "Discord", icon: MessageSquare, color: "#5865F2" },
  "n8n-nodes-base.googleSheets": { label: "Google Sheets", icon: Database, color: "#0F9D58" },
  "n8n-nodes-base.notion": { label: "Notion", icon: FileText, color: "#ffffff" },
  "n8n-nodes-base.airtable": { label: "Airtable", icon: Database, color: "#FCB400" },
  "n8n-nodes-base.openAi": { label: "OpenAI", icon: Bot, color: "#10a37f" },
  "@n8n/n8n-nodes-langchain.agent": { label: "AI Agent", icon: Sparkles, color: "#10a37f" },
  "@n8n/n8n-nodes-langchain.chainLlm": { label: "LLM", icon: Sparkles, color: "#10a37f" },
  "n8n-nodes-base.dallE": { label: "DALL·E", icon: ImageIcon, color: "#10a37f" },
  "n8n-nodes-base.stripe": { label: "Stripe", icon: CreditCard, color: "#635bff" },
  "n8n-nodes-base.shopify": { label: "Shopify", icon: ShoppingCart, color: "#95BF47" },
  "n8n-nodes-base.googleDrive": { label: "Drive", icon: Cloud, color: "#4285F4" },
};

export function iconForType(type: string) {
  return map[type]?.icon ?? Cog;
}
export function colorForType(type: string) {
  return map[type]?.color ?? "#7c5cff";
}
export function labelForType(type: string) {
  return map[type]?.label ?? type.split(".").pop() ?? type;
}
