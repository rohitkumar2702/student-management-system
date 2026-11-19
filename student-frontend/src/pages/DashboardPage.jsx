import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Building2,
  CalendarDays,
  GraduationCap,
  ArrowRight,
  RefreshCw,
  ServerCrash,
} from "lucide-react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Skeleton from "../components/ui/Skeleton";
import EmptyState from "../components/ui/EmptyState";
import { getAllStudents } from "../api/studentApi";
import { getErrorMessage } from "../utils/apiErrors";

export default function DashboardPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllStudents();
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const stats = useMemo(() => {
    if (!students.length) {
      return { total: 0, departments: 0, avgAge: 0 };
    }
    const deptSet = new Set(
      students.map((s) => (s.department || "").trim().toLowerCase())
    );
    const totalAge = students.reduce((sum, s) => sum + (s.age || 0), 0);
    return {
      total: students.length,
      departments: deptSet.size,
      avgAge: Math.round(totalAge / students.length),
    };
  }, [students]);

  const deptBreakdown = useMemo(() => {
    const map = new Map();
    students.forEach((s) => {
      const key = (s.department || "Unassigned").trim();
      map.set(key, (map.get(key) || 0) + 1);
    });
    const arr = Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
    const max = arr[0]?.count || 1;
    return { items: arr, max };
  }, [students]);

  const recent = useMemo(
    () => [...students].sort((a, b) => b.id - a.id).slice(0, 5),
    [students]
  );

  return (
    <div className="dashboard">
      <div className="dashboard__intro">
        <p className="eyebrow">Overview</p>
        <h2 className="dashboard__heading">Welcome back</h2>
        <p className="dashboard__sub">
          A quick snapshot of your student management system.
        </p>
      </div>

      {error ? (
        <Card>
          <EmptyState
            icon={<ServerCrash size={26} />}
            title="Could not load dashboard"
            description={error}
            action={
              <Button
                variant="secondary"
                iconLeft={<RefreshCw size={16} />}
                onClick={load}
              >
                Retry
              </Button>
            }
          />
        </Card>
      ) : (
        <>
          {/* Stats */}
          <div className="dashboard__stats">
            <StatCard
              icon={<Users size={20} />}
              label="Total Students"
              value={stats.total}
              loading={loading}
            />
            <StatCard
              icon={<Building2 size={20} />}
              label="Departments"
              value={stats.departments}
              loading={loading}
            />
            <StatCard
              icon={<CalendarDays size={20} />}
              label="Average Age"
              value={stats.avgAge}
              loading={loading}
            />
            <StatCard
              icon={<GraduationCap size={20} />}
              label="Latest ID"
              value={students.length ? Math.max(...students.map((s) => s.id)) : 0}
              loading={loading}
            />
          </div>

          <div className="dashboard__grid">
            {/* Department breakdown */}
            <Card
              title="Departments"
              subtitle="Student distribution"
              className="dashboard__dept-card"
            >
              {loading ? (
                <div className="dashboard__dept-skeleton">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="dashboard__dept-row">
                      <Skeleton variant="text" width="40%" />
                      <Skeleton variant="text" width="100%" height="8px" />
                    </div>
                  ))}
                </div>
              ) : deptBreakdown.items.length === 0 ? (
                <EmptyState
                  variant="compact"
                  icon={<Building2 size={22} />}
                  title="No departments yet"
                  description="Add students to see department distribution."
                />
              ) : (
                <ul className="dept-list">
                  {deptBreakdown.items.map(({ name, count }) => (
                    <li key={name} className="dept-list__item">
                      <div className="dept-list__head">
                        <span className="dept-list__name">{name}</span>
                        <Badge variant="sage" size="sm">
                          {count}
                        </Badge>
                      </div>
                      <div className="dept-list__bar">
                        <div
                          className="dept-list__bar-fill"
                          style={{
                            width: `${Math.round(
                              (count / deptBreakdown.max) * 100
                            )}%`,
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            {/* Recent students */}
            <Card
              title="Recent Students"
              subtitle="Latest additions"
              action={
                <Link to="/students" className="dashboard__link">
                  View all <ArrowRight size={14} />
                </Link>
              }
            >
              {loading ? (
                <div className="recent-list">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="recent-list__item">
                      <Skeleton variant="circle" />
                      <div style={{ flex: 1 }}>
                        <Skeleton variant="text" width="50%" />
                        <Skeleton
                          variant="text"
                          width="70%"
                          style={{ marginTop: 6 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : recent.length === 0 ? (
                <EmptyState
                  variant="compact"
                  icon={<Users size={22} />}
                  title="No students yet"
                  description="Add your first student to get started."
                  action={
                    <Link to="/students">
                      <Button size="sm" variant="primary">
                        Go to Students
                      </Button>
                    </Link>
                  }
                />
              ) : (
                <ul className="recent-list">
                  {recent.map((s) => (
                    <li key={s.id} className="recent-list__item">
                      <div className="recent-list__avatar" aria-hidden="true">
                        {initials(s.name)}
                      </div>
                      <div className="recent-list__info">
                        <span className="recent-list__name">{s.name}</span>
                        <span className="recent-list__meta">
                          {s.department} &middot; {s.email}
                        </span>
                      </div>
                      <Badge variant="neutral" size="sm">
                        #{s.id}
                      </Badge>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>
        </>
      )}

      <style>{dashboardStyles}</style>
    </div>
  );
}

function StatCard({ icon, label, value, loading }) {
  return (
    <div className="stat-card">
      <div className="stat-card__icon" aria-hidden="true">
        {icon}
      </div>
      <div className="stat-card__body">
        <p className="stat-card__label">{label}</p>
        {loading ? (
          <Skeleton variant="title" width="60%" />
        ) : (
          <p className="stat-card__value">{value}</p>
        )}
      </div>
    </div>
  );
}

function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");
}

const dashboardStyles = `
.dashboard { display: flex; flex-direction: column; gap: var(--space-6); }
.dashboard__intro { display: flex; flex-direction: column; gap: var(--space-1); }
.dashboard__heading { font-size: var(--fs-2xl); margin: 0; }
.dashboard__sub { color: var(--color-text-muted); font-size: var(--fs-sm); margin: 0; }

.dashboard__stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--space-4);
}

.stat-card {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  background: var(--surface-glass-strong);
  border: 1px solid var(--border-hairline);
  border-radius: var(--radius-lg);
  padding: var(--space-4) var(--space-5);
  box-shadow: var(--shadow-soft);
}

.stat-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: rgba(163, 170, 152, 0.18);
  color: var(--color-sage-deeper);
  flex-shrink: 0;
}

.stat-card__body { display: flex; flex-direction: column; gap: 2px; min-width: 0; flex: 1; }
.stat-card__label { font-size: var(--fs-xs); color: var(--color-text-muted); margin: 0; }
.stat-card__value { font-size: var(--fs-xl); font-weight: var(--fw-semibold); color: var(--color-text-dark); margin: 0; line-height: 1.1; }

.dashboard__grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: var(--space-5);
  align-items: start;
}

.dashboard__link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
  color: var(--color-sage-deeper);
}
.dashboard__link:hover { color: var(--color-sage-deeper); text-decoration: underline; }

.dashboard__dept-skeleton { display: flex; flex-direction: column; gap: var(--space-4); }
.dashboard__dept-row { display: flex; flex-direction: column; gap: var(--space-2); }

.dept-list { display: flex; flex-direction: column; gap: var(--space-4); }
.dept-list__item { display: flex; flex-direction: column; gap: var(--space-2); }
.dept-list__head { display: flex; align-items: center; justify-content: space-between; gap: var(--space-3); }
.dept-list__name { font-size: var(--fs-sm); color: var(--color-text-body); font-weight: var(--fw-medium); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dept-list__bar { height: 8px; background: var(--color-grey-soft); border-radius: var(--radius-pill); overflow: hidden; }
.dept-list__bar-fill { height: 100%; background: var(--color-sage); border-radius: var(--radius-pill); transition: width var(--dur-slow) var(--ease-emphasis); }

.recent-list { display: flex; flex-direction: column; gap: var(--space-3); }
.recent-list__item { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-2) 0; }
.recent-list__avatar {
  width: 36px; height: 36px; border-radius: 50%;
  background: var(--color-sage-deep); color: var(--color-text-invert);
  display: inline-flex; align-items: center; justify-content: center;
  font-size: var(--fs-sm); font-weight: var(--fw-semibold); flex-shrink: 0;
}
.recent-list__info { display: flex; flex-direction: column; gap: 2px; min-width: 0; flex: 1; }
.recent-list__name { font-size: var(--fs-sm); font-weight: var(--fw-medium); color: var(--color-text-dark); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.recent-list__meta { font-size: var(--fs-xs); color: var(--color-text-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

@media (max-width: 1100px) {
  .dashboard__stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .dashboard__grid { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .dashboard__stats { grid-template-columns: 1fr; }
}
`;

export { dashboardStyles };