import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Search, ClipboardList, User, Calendar, Stethoscope, Download, LogOut } from 'lucide-react';

interface SurveySummary {
  id: string;
  survey_type: string;
  status: string;
  user_name: string | null;
  diagnosis: string | null;
  professional: string | null;
  application_date: string | null;
  created_at: string;
}

interface DashboardProps {
  onNewSurvey: () => void;
  onViewSurvey: (surveyData: any) => void;
  onExportCSV: (surveys: SurveySummary[], filename?: string) => void;
  authToken?: string;
  userName?: string;
  onSignOut?: () => void;
}

type FilterType = 'all' | 'adult' | 'child';

const FILTER_TABS: { label: string; value: FilterType }[] = [
  { label: 'Todas', value: 'all' },
  { label: 'Adulto', value: 'adult' },
  { label: 'Infantil', value: 'child' },
];

function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function SkeletonCard() {
  return (
    <div className="bg-white p-5 rounded-2xl border border-zinc-200 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-zinc-200 rounded w-2/5" />
          <div className="h-3 bg-zinc-100 rounded w-3/5" />
        </div>
        <div className="h-5 w-16 bg-zinc-100 rounded-full ml-4" />
      </div>
      <div className="flex items-center gap-4 mt-3">
        <div className="h-3 bg-zinc-100 rounded w-24" />
        <div className="h-3 bg-zinc-100 rounded w-20" />
      </div>
    </div>
  );
}

export function Dashboard({ onNewSurvey, onViewSurvey, onExportCSV, authToken, userName, onSignOut }: DashboardProps) {
  const [surveys, setSurveys] = useState<SurveySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const headers: Record<string, string> = authToken
    ? { Authorization: 'Bearer ' + authToken }
    : {};

  async function fetchSurveys(searchTerm: string, filterType: FilterType) {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm.trim()) params.set('search', searchTerm.trim());
      if (filterType !== 'all') params.set('type', filterType);
      const qs = params.toString() ? '?' + params.toString() : '';
      const res = await fetch('/api/surveys' + qs, { headers });
      if (!res.ok) throw new Error('Erro ao buscar pesquisas');
      const data = await res.json();
      setSurveys(Array.isArray(data) ? data : data.surveys ?? []);
    } catch {
      setSurveys([]);
    } finally {
      setLoading(false);
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchSurveys(search, filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchSurveys(search, filter);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  async function handleCardClick(survey: any) {
    try {
      const res = await fetch('/api/surveys?id=' + survey.id, { headers });
      if (!res.ok) throw new Error();
      const full = await res.json();
      onViewSurvey(full);
    } catch {
      onViewSurvey(survey);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Pesquisas Realizadas</h1>
            {userName && (
              <p className="text-sm text-zinc-500 mt-0.5">Ola, {userName}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {surveys.length > 0 && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => onExportCSV(surveys)}
                className="flex items-center gap-2 bg-white border border-zinc-200 text-zinc-700 px-4 py-2.5 rounded-full text-sm font-medium hover:bg-zinc-50 transition-colors"
              >
                <Download size={14} />
                CSV
              </motion.button>
            )}
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              onClick={onNewSurvey}
              className="flex items-center gap-2 bg-apae-blue text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-sm hover:bg-apae-blue/90 transition-colors"
            >
              <Plus size={16} strokeWidth={2.5} />
              Nova Pesquisa
            </motion.button>
            {onSignOut && (
              <button
                onClick={onSignOut}
                title="Sair"
                className="flex items-center gap-1.5 px-3 py-2.5 text-sm text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Search bar */}
        <div role="search" className="relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="text"
            aria-label="Buscar pesquisas por nome do paciente"
            placeholder="Buscar por nome do paciente…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-zinc-200 bg-white text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 transition"
          />
        </div>

        {/* Filter tabs */}
        <div role="tablist" aria-label="Filtrar pesquisas por tipo" className="flex gap-2">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              role="tab"
              aria-selected={filter === tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === tab.value
                  ? 'bg-apae-blue text-white'
                  : 'bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Survey list */}
        <div role="list" aria-label="Lista de pesquisas" className="space-y-3">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          ) : surveys.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 gap-4 text-zinc-400"
            >
              <ClipboardList size={48} strokeWidth={1.2} />
              <p className="text-base font-medium">Nenhuma pesquisa encontrada</p>
              <p className="text-sm text-zinc-400">
                {search
                  ? 'Tente um nome diferente ou limpe a busca.'
                  : 'Clique em "Nova Pesquisa" para começar.'}
              </p>
            </motion.div>
          ) : (
            <AnimatePresence initial={false}>
              {surveys.map((survey, idx) => {
                const isChild =
                  survey.survey_type === 'child' ||
                  survey.survey_type === 'infantil';
                const typeLabel = isChild ? 'Infantil' : 'Adulto';
                const typeBadge = isChild
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-zinc-100 text-zinc-600';

                const statusColors: Record<string, string> = {
                  completed: 'bg-green-100 text-green-700',
                  pending: 'bg-yellow-100 text-yellow-700',
                  draft: 'bg-zinc-100 text-zinc-500',
                };
                const statusLabels: Record<string, string> = {
                  completed: 'Concluída',
                  pending: 'Pendente',
                  draft: 'Rascunho',
                };
                const statusKey = survey.status ?? 'completed';
                const statusClass =
                  statusColors[statusKey] ?? 'bg-zinc-100 text-zinc-500';
                const statusLabel =
                  statusLabels[statusKey] ?? statusKey;

                return (
                  <motion.div
                    key={survey.id ?? idx}
                    role="listitem"
                    aria-label={`Pesquisa de ${survey.user_name ?? 'paciente desconhecido'}, tipo ${typeLabel}, status ${statusLabel}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={() => handleCardClick(survey)}
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick(survey); } }}
                    className="bg-white p-5 rounded-2xl border border-zinc-200 hover:border-zinc-400 transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-apae-blue"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-zinc-900 truncate">
                          {survey.user_name ?? '—'}
                        </h3>
                        <p className="text-sm text-zinc-500 mt-1 line-clamp-1">
                          {survey.diagnosis ?? '—'}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${typeBadge}`}
                      >
                        {typeLabel}
                      </span>
                    </div>

                    <div className="flex items-center flex-wrap gap-4 mt-3 text-xs text-zinc-400">
                      <span className="flex items-center gap-1">
                        <User size={12} />
                        {survey.professional ?? '—'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(survey.application_date ?? survey.created_at)}
                      </span>
                      <span
                        className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full ${statusClass}`}
                      >
                        {statusLabel}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
