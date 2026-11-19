import { Search, SlidersHorizontal, X } from "lucide-react";

export default function StudentFilters({
  search,
  onSearchChange,
  departments,
  department,
  onDepartmentChange,
  onClear,
  hasActiveFilters,
}) {
  return (
    <div className="student-filters">
      <div className="student-filters__search">
        <Search size={16} className="student-filters__search-icon" />
        <input
          type="search"
          className="student-filters__input"
          placeholder="Search by name, email, or department"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search students"
        />
        {search && (
          <button
            type="button"
            className="student-filters__clear-input"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <div className="student-filters__select">
        <SlidersHorizontal size={15} className="student-filters__select-icon" />
        <select
          className="student-filters__select-input"
          value={department}
          onChange={(e) => onDepartmentChange(e.target.value)}
          aria-label="Filter by department"
        >
          <option value="">All departments</option>
          {departments.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          className="student-filters__reset"
          onClick={onClear}
        >
          <X size={14} /> Clear
        </button>
      )}

      <style>{`
        .student-filters {
          display: flex; align-items: center; gap: var(--space-3);
          flex-wrap: wrap;
        }
        .student-filters__search {
          position: relative; display: flex; align-items: center;
          flex: 1; min-width: 240px;
          background: var(--color-white);
          border: 1px solid var(--border-soft);
          border-radius: var(--radius-sm);
          height: 40px; padding: 0 var(--space-3);
          transition: border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard);
        }
        .student-filters__search:focus-within {
          border-color: var(--color-sage-deep);
          box-shadow: var(--shadow-focus);
        }
        .student-filters__search-icon { color: var(--color-text-muted); flex-shrink: 0; }
        .student-filters__input {
          flex: 1; border: none; outline: none; background: transparent;
          padding: 0 var(--space-2); font-size: var(--fs-sm); color: var(--color-text-dark); height: 100%;
        }
        .student-filters__input::placeholder { color: var(--color-text-subtle); }
        .student-filters__clear-input {
          width: 22px; height: 22px; border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
          color: var(--color-text-muted);
        }
        .student-filters__clear-input:hover { background: var(--color-grey-soft); color: var(--color-text-dark); }
        .student-filters__select {
          display: flex; align-items: center; gap: var(--space-2);
          background: var(--color-white);
          border: 1px solid var(--border-soft);
          border-radius: var(--radius-sm);
          height: 40px; padding: 0 var(--space-3);
        }
        .student-filters__select:focus-within {
          border-color: var(--color-sage-deep);
          box-shadow: var(--shadow-focus);
        }
        .student-filters__select-icon { color: var(--color-text-muted); flex-shrink: 0; }
        .student-filters__select-input {
          border: none; outline: none; background: transparent;
          font-size: var(--fs-sm); color: var(--color-text-dark);
          height: 100%; cursor: pointer; padding-right: var(--space-2);
        }
        .student-filters__reset {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: var(--fs-sm); font-weight: var(--fw-medium);
          color: var(--color-burgundy);
          padding: 0 var(--space-3); height: 40px;
          border-radius: var(--radius-sm); border: 1px solid var(--border-danger);
          background: var(--color-burgundy-soft);
        }
        .student-filters__reset:hover { background: var(--color-danger-soft); }
      `}</style>
    </div>
  );
}