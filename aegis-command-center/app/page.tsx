import { ModulePageLayout } from '@/components/layout/module-page-layout';
import AegisDashboard from '../components/AegisDashboard';
import { ShieldCheck } from 'lucide-react';

export default function AegisCommandCenterPage() {
  return (
    <ModulePageLayout
      title="Aegis Command Center"
      description="Orchestrate your local OpenClaw agent fleet directly from your workspace."
      icon={<ShieldCheck className="w-5 h-5" />}
    >
      <div className="w-full h-[calc(100vh-120px)] mt-4 bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden shadow-2xl">
        <AegisDashboard />
      </div>
    </ModulePageLayout>
  );
}