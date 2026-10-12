"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BlogFilter({ initialFilter }: { initialFilter: string }) {
  const [value, setValue] = useState(initialFilter);
  const router = useRouter();

  const apply = () => {
    const params = new URLSearchParams();
    if (value) {
      params.set("filter", value);
    }
    router.push(`/blogs${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        data-testid="filter-input"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Filter blogs..."
        className="border rounded px-3 py-2 flex-1"
      />
      <button
        data-testid="search-button"
        onClick={apply}
        className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600"
      >
        Search
      </button>
    </div>
  );
}
