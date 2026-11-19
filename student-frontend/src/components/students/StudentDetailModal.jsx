import { User, Mail, CalendarDays, Building2, Hash } from "lucide-react";
import Modal from "../ui/Modal";
import Badge from "../ui/Badge";

export default function StudentDetailModal({ open, onClose, student, onEdit }) {
  if (!student) return null;
  const s = student;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Student Details"
      subtitle={`Record #${s.id}`}
      size="md"
      footer={
        <button
          type="button"
          className="btn btn--primary btn--md"
          onClick={onEdit}
        >
          Edit Student
        </button>
      }
    >
      <div className="detail-modal">
        <div className="detail-modal__hero">
          <div className="detail-modal__avatar" aria-hidden="true">
            {initials(s.name)}
          </div>
          <div className="detail-modal__identity">
            <h3 className="detail-modal__name">{s.name}</h3>
            <Badge variant="sage" size="sm">{s.department}</Badge>
          </div>
        </div>

        <div className="detail-modal__grid">
          <DetailRow icon={<Mail size={16} />} label="Email" value={s.email} />
          <DetailRow icon={<CalendarDays size={16} />} label="Age" value={`${s.age} years`} />
          <DetailRow icon={<Building2 size={16} />} label="Department" value={s.department} />
          <DetailRow icon={<Hash size={16} />} label="Student ID" value={`#${s.id}`} />
        </div>

        <style>{`
          .detail-modal { display: flex; flex-direction: column; gap: var(--space-5); }
          .detail-modal__hero { display: flex; align-items: center; gap: var(--space-4); }
          .detail-modal__avatar {
            width: 56px; height: 56px; border-radius: 50%;
            background: var(--color-sage-deep); color: var(--color-text-invert);
            display: inline-flex; align-items: center; justify-content: center;
            font-size: var(--fs-lg); font-weight: var(--fw-semibold); flex-shrink: 0;
          }
          .detail-modal__identity { display: flex; flex-direction: column; gap: var(--space-1); min-width: 0; }
          .detail-modal__name { font-size: var(--fs-lg); font-weight: var(--fw-semibold); color: var(--color-text-dark); margin: 0; letter-spacing: var(--tracking-tight); }
          .detail-modal__grid {
            display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);
            padding: var(--space-4); background: var(--color-cream);
            border-radius: var(--radius-md); border: 1px solid var(--border-hairline);
          }
          .detail-modal__row { display: flex; align-items: flex-start; gap: var(--space-2); min-width: 0; }
          .detail-modal__row-icon { color: var(--color-sage-deeper); flex-shrink: 0; margin-top: 2px; }
          .detail-modal__row-body { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
          .detail-modal__row-label { font-size: 11px; text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-text-subtle); }
          .detail-modal__row-value { font-size: var(--fs-sm); color: var(--color-text-dark); word-break: break-word; }
          @media (max-width: 520px) { .detail-modal__grid { grid-template-columns: 1fr; } }
        `}</style>
      </div>
    </Modal>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="detail-modal__row">
      <span className="detail-modal__row-icon" aria-hidden="true">{icon}</span>
      <div className="detail-modal__row-body">
        <span className="detail-modal__row-label">{label}</span>
        <span className="detail-modal__row-value">{value}</span>
      </div>
    </div>
  );
}

function initials(name = "") {
  return name.split(" ").filter(Boolean).slice(0, 2).map((n) => n[0].toUpperCase()).join("");
}