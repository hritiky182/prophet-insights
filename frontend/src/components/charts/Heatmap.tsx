export function Heatmap({ data, xLabels, yLabels }: {
  data: number[][];
  xLabels?: string[];
  yLabels?: string[];
}) {
  const max = Math.max(...data.flat());
  const min = Math.min(...data.flat());
  const norm = (v: number) => (v - min) / (max - min || 1);

  return (
    <div className="overflow-x-auto scrollbar-thin">
      <table className="w-full min-w-[520px] border-separate border-spacing-1">
        <thead>
          <tr>
            <th />
            {xLabels?.map((l, i) => (
              <th key={i} className="text-[10px] font-medium text-muted-foreground">{l}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, r) => (
            <tr key={r}>
              <th className="pr-2 text-right text-[10px] font-medium text-muted-foreground">
                {yLabels?.[r] ?? `R${r + 1}`}
              </th>
              {row.map((v, c) => {
                const n = norm(v);
                return (
                  <td
                    key={c}
                    title={`${v}`}
                    className="h-8 rounded-md text-center text-[10px] font-semibold text-white"
                    style={{
                      background: `oklch(${0.85 - n * 0.5} ${0.05 + n * 0.18} 250)`,
                    }}
                  >
                    {v}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
