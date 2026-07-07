import { useMockData } from "@/hooks/useMockData";
import { api } from "@/mock/api";
import { cities, developers, properties } from "@/mock/data";
import { PropertyCard } from "@/components/property/PropertyCard";
import { LocationCard } from "@/components/property/LocationCard";
import { DeveloperCard } from "@/components/property/DeveloperCard";
import { SectionHeader } from "@/components/common/SectionHeader";


function WatchlistPage() {
  const { data } = useMockData(() => api.getWatchlist());
  const locs = cities.filter((c) => data?.locations.includes(c.id));
  const props = properties.filter((p) => data?.properties.includes(p.id));
  const devs = developers.filter((d) => data?.developers.includes(d.id));

  return (
    <div className="space-y-10">
      <SectionHeader title="Watchlist" subtitle="Signals across everything you're tracking." />

      <div>
        <h3 className="mb-3 font-display text-lg font-semibold">Locations</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {locs.map((c, i) => <LocationCard key={c.id} c={c} index={i} />)}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-display text-lg font-semibold">Properties</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {props.map((p, i) => <PropertyCard key={p.id} p={p} index={i} />)}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-display text-lg font-semibold">Developers</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {devs.map((d, i) => <DeveloperCard key={d.id} d={d} index={i} />)}
        </div>
      </div>
    </div>
  );
}

export default WatchlistPage;
