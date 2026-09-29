import React, { useEffect } from 'react';
import { GISIntelligenceMap } from '../GISIntelligenceMap';
import { useAppStore } from '../../store/store';
import { MapPin, Info, ArrowRight } from 'lucide-react';

interface PublicMapPageProps {
  onNavigate: (path: string) => void;
}

export function PublicMapPage({ onNavigate }: PublicMapPageProps) {
  const {
    activeHouse,
    setActiveHouse,
    loadDatasets,
    loadRajyaSabhaDatasets,
    lokSabhaProjects,
    rajyaSabhaProjects
  } = useAppStore();

  useEffect(() => {
    if (activeHouse === 'Rajya Sabha') {
      if (rajyaSabhaProjects.length === 0) {
        loadRajyaSabhaDatasets();
      }
    } else {
      if (lokSabhaProjects.length === 0) {
        loadDatasets();
      }
    }
  }, [activeHouse, loadDatasets, loadRajyaSabhaDatasets, lokSabhaProjects.length, rajyaSabhaProjects.length]);

  return (
    <div className="space-y-4 animate-fade-in">
      {/* ── Page Header ──────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#E9ECEF] pb-3">
        <div>
          <div className="flex items-center gap-1.5 mb-1 text-[11px] font-bold text-[#005eb2] uppercase tracking-wider">
            <MapPin size={14} />
            <span>Spatial Intelligence & Mapping</span>
          </div>
          <h1
            className="text-2xl font-bold text-[#000a1f]"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {activeHouse === 'Rajya Sabha' ? 'Rajya Sabha State Geospatial GIS' : 'Lok Sabha Constituency GIS Map'}
          </h1>
          <p className="text-xs text-[#747780]">
            {activeHouse === 'Rajya Sabha'
              ? 'Interactive geospatial mapping across states and administrative units for Rajya Sabha MPLADS works.'
              : 'Interactive geospatial mapping across all 543 Parliamentary Constituencies. Click any constituency to inspect public works and expenditures.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* House Selector */}
          <div className="inline-flex items-center rounded border border-slate-300 bg-slate-100/80 p-0.5 text-xs font-semibold shadow-2xs">
            <button
              onClick={() => setActiveHouse('Lok Sabha')}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                activeHouse === 'Lok Sabha'
                  ? 'bg-[#00204a] text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Lok Sabha
            </button>
            <button
              onClick={() => setActiveHouse('Rajya Sabha')}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                activeHouse === 'Rajya Sabha'
                  ? 'bg-[#00204a] text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Rajya Sabha
            </button>
          </div>

          <button
            onClick={() => onNavigate(`/projects?house=${activeHouse === 'Rajya Sabha' ? 'Rajya+Sabha' : 'Lok+Sabha'}`)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white border border-[#E9ECEF] hover:bg-[#f6faff] text-xs font-semibold text-[#141d23] shadow-xs cursor-pointer"
          >
            <span>Open Table View</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* ── Map Component ────────────────────────────────────── */}
      <div className="bg-white border border-[#E9ECEF] rounded-sm shadow-xs overflow-hidden">
        <GISIntelligenceMap />
      </div>
    </div>
  );
}
