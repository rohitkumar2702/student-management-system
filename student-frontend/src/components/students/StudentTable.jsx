import { Eye, Pencil, Trash2 } from "lucide-react";
import Badge from "../ui/Badge";
import Skeleton from "../ui/Skeleton";

export default function StudentTable({
  students,
  loading,
  onView,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="student-table-wrap">
        <table className="student-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Email</th>
              <th>Age</th>
              <th>Department</th>
              <th className="col-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, i) => (
              <tr key={i}>
                <td>
                  <div className="student-table__identity">
                    <Skeleton variant="circle" />
                    <Skeleton variant="text" width="120px" />
                  </div>
                </td>
                <td><Skeleton variant="text" width="180px" /></td>
                <td><Skeleton variant="text" width="40px" /></td>
                <td><Skeleton variant="text" width="120px" /></td>
                <td><Skeleton variant="text" width="100px" /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <style>{tableStyles}</style>
      </div>
    );
  }

  return (
    <div className="student-table-wrap">
      <table className="student-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Email</th>
            <th>Age</th>
            <th>Department</th>
            <th className="col-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td data-label="Student">
                <div className="student-table__identity">
                  <div className="student-table__avatar" aria-hidden="true">
                    {initials(s.name)}
                  </div>
                  <div className="student-table__identity-text">
                    <span className="student-table__name">{s.name}</span>
                    <span className="student-table__id">#{s.id}</span>
                  </div>
                </div>
              </td>
              <td data-label="Email">
                <span className="student-table__email">{s.email}</span>
              </td>
              <td data-label="Age">{s.age}</td>
              <td data-label="Department">
                <Badge variant="sage" size="sm">{s.department}</Badge>
              </td>
              <td data-label="Actions" className="col-actions">
                <div className="student-table__actions">
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => onView(s)}
                    aria-label={`View ${s.name}`}
                    title="View"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => onEdit(s)}
                    aria-label={`Edit ${s.name}`}
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    type="button"
                    className="icon-btn icon-btn--danger"
                    onClick={() => onDelete(s)}
                    aria-label={`Delete ${s.name}`}
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style>{tableStyles}</style>
    </div>
  );
}

function initials(name = "") {
  return name.split(" ").filter(Boolean).slice(0, 2).map((n) => n[0].toUpperCase()).join("");
}

const tableStyles = `
.student-table-wrap { width: 100%; overflow-x: auto; }
.student-table { width: 100%; border-collapse: collapse; font-size: var(--fs-sm); }
.student-table thead th {
  text-align: left; padding: var(--space-3) var(--space-4);
  font-size: 11px; font-weight: var(--fw-semibold);
  letter-spacing: var(--tracking-wider); text-transform: uppercase;
  color: var(--color-text-muted);
  border-bottom: 1px solid var(--border-hairline);
  background: rgba(247, 243, 234, 0.6);
  white-space: nowrap;
}
.student-table tbody td {
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--border-hairline);
  color: var(--color-text-body);
  vertical-align: middle;
}
.student-table tbody tr { transition: background var(--dur-fast) var(--ease-standard); }
.student-table tbody tr:hover { background: rgba(163, 170, 152, 0.08); }
.student-table tbody tr:last-child td { border-bottom: none; }
.student-table__identity { display: flex; align-items: center; gap: var(--space-3); min-width: 0; }
.student-table__avatar {
  width: 36px; height: 36px; border-radius: 50%;
  background: var(--color-sage-deep); color: var(--color-text-invert);
  display: inline-flex; align-items: center; justify-content: center;
  font-size: var(--fs-xs); font-weight: var(--fw-semibold); flex-shrink: 0;
}
.student-table__identity-text { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.student-table__name { font-weight: var(--fw-medium); color: var(--color-text-dark); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.student-table__id { font-size: 11px; color: var(--color-text-subtle); }
.student-table__email { color: var(--color-text-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: inline-block; max-width: 240px; }
.col-actions { text-align: right; }
.student-table__actions { display: inline-flex; align-items: center; gap: var(--space-1); justify-content: flex-end; }
.icon-btn {
  display: inline-flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; border-radius: var(--radius-sm);
  color: var(--color-text-muted);
  transition: background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard);
}
.icon-btn:hover { background: var(--color-grey-soft); color: var(--color-text-dark); }
.icon-btn:focus-visible { box-shadow: var(--shadow-focus); }
.icon-btn--danger:hover { background: var(--color-burgundy-soft); color: var(--color-burgundy); }

@media (max-width: 720px) {
  .student-table thead { display: none; }
  .student-table, .student-table tbody, .student-table tr, .student-table td { display: block; width: 100%; }
  .student-table tbody tr {
    border: 1px solid var(--border-hairline);
    border-radius: var(--radius-md);
    margin-bottom: var(--space-3);
    background: var(--color-white);
    padding: var(--space-3);
  }
  .student-table tbody td {
    display: flex; justify-content: space-between; align-items: center;
    border: none; padding: var(--space-2) 0;
    gap: var(--space-3);
  }
  .student-table tbody td::before {
    content: attr(data-label);
    font-size: 11px; text-transform: uppercase; letter-spacing: var(--tracking-wider);
    color: var(--color-text-subtle); font-weight: var(--fw-semibold);
  }
  .col-actions { justify-content: flex-end; }
  .student-table__email { max-width: 100%; }
}
`;