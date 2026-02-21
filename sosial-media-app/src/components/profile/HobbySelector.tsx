import { HOBBY_OPTIONS, type Hobby } from "../../constant/hobbies";
import Icon from "../ui/Icon";

type HobbySelectorProps = {
  selected: string[];
  // ✅ Fix: pakai Hobby agar konsisten dengan HOBBY_OPTIONS
  onToggle: (hobby: Hobby) => void;
  error?: string;
};

const HobbySelector = ({ selected, onToggle, error }: HobbySelectorProps) => {
  return (
    <div>
      <div className="flex flex-wrap gap-2 mt-1">
        {HOBBY_OPTIONS.map((hobby) => {
          const isActive = selected.includes(hobby);
          return (
            <button
              key={hobby}
              type="button"
              onClick={() => onToggle(hobby)}
              aria-pressed={isActive}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
                border transition-all duration-150
                ${
                  isActive
                    ? "bg-[#137fec]/20 border-[#137fec]/40 text-[#137fec] hover:bg-[#137fec]/30"
                    : "bg-slate-100 dark:bg-[#1e2e3e] border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }
              `}
            >
              {hobby}
              {isActive && <Icon name="check" className="w-3.5 h-3.5" />}
            </button>
          );
        })}
      </div>

      {error && (
        <p className="mt-1.5 text-xs text-red-500 dark:text-red-400 flex items-center gap-1">
          <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default HobbySelector;