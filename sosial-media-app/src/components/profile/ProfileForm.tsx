import type { ProfileFormValues} from "../../type/schema/profileSchema";
import type { Hobby } from "../../constant/hobbies";
import AvatarUpload from "./AvatarUpload";
import HobbySelector from "./HobbySelector";
import Icon from "../ui/Icon";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProfileFormProps = {
  form: ProfileFormValues;
  /**
   * ✅ Fix: type yang proper menggantikan (v: any)
   * Setiap field teks mengembalikan handler yang menerima ChangeEvent standar.
   */
  setField: (
    field: keyof Omit<ProfileFormValues, "hobbies" | "avatarUrl">
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  // ✅ Fix: pakai Hobby bukan string, sesuai dengan z.enum(HOBBY_OPTIONS) di schema
  toggleHobby: (hobby: Hobby) => void;
  setAvatarUrl: (url: string) => void;
  errors: Partial<Record<keyof ProfileFormValues, string>>;
  onSubmit: () => Promise<void> | void;
  loading?: boolean;
  /** Label tombol submit, default "Continue" */
  submitLabel?: string;
};

// ─── Field wrapper ─────────────────────────────────────────────────────────────

type FieldProps = {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
};

const Field = ({ label, error, hint, children }: FieldProps) => (
  <div>
    <div className="flex justify-between items-baseline mb-1.5">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      {hint && <span className="text-xs text-slate-400">{hint}</span>}
    </div>

    {children}

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

// ─── Input styles ──────────────────────────────────────────────────────────────

const inputCls = (hasError?: string) =>
  [
    "w-full bg-slate-50 dark:bg-[#1e2e3e]",
    "border text-slate-900 dark:text-white text-sm rounded-lg",
    "focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec] outline-none",
    "pl-10 p-2.5 placeholder-slate-400 dark:placeholder-slate-500 transition-shadow",
    hasError
      ? "border-red-400 dark:border-red-500 focus:ring-red-400"
      : "border-slate-200 dark:border-slate-700",
  ].join(" ");

// ─── Progress bar ──────────────────────────────────────────────────────────────

const calcProgress = (form: ProfileFormValues) => {
  const filled = [
    form.avatarUrl,
    form.name,
    form.jobTitle,
    form.bio,
    form.hobbies.length > 0,
  ].filter(Boolean).length;
  return Math.round((filled / 5) * 100);
};

// ─── Main Component ────────────────────────────────────────────────────────────

const ProfileForm = ({
  form,
  setField,
  toggleHobby,
  setAvatarUrl,
  errors,
  onSubmit,
  loading = false,
  submitLabel = "Continue",
}: ProfileFormProps) => {
  const progress = calcProgress(form);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-[#101922] p-4 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      <main className="w-full max-w-3xl bg-white dark:bg-[#182430] rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800/60 relative">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100 dark:bg-[#1e2e3e]">
          <div
            className="h-full bg-[#137fec] rounded-r-full transition-all duration-500"
            style={{ width: `${progress}%`, boxShadow: "0 0 10px rgba(19,127,236,0.5)" }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>

        <div className="flex flex-col md:flex-row min-h-[600px]">
          {/* Sidebar */}
          <aside className="hidden md:flex md:w-1/3 bg-slate-50 dark:bg-[#1e2e3e] p-8 flex-col justify-between border-r border-slate-200 dark:border-slate-800/60 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#137fec]/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="w-10 h-10 bg-[#137fec] rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-[#137fec]/30">
                <Icon name="sparkle" className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Build your presence
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                A complete profile helps you connect with the right people and communities.
              </p>
            </div>
          </aside>

          {/* Form area */}
          <div className="flex-1 p-6 md:p-10 flex flex-col">
            <header className="mb-8">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Complete your profile
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
                Tell us a bit more about yourself.
              </p>
            </header>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
              className="space-y-6 flex-1 overflow-y-auto pr-1"
              noValidate
            >
              {/* Avatar */}
              <AvatarUpload avatarUrl={form.avatarUrl} onChange={setAvatarUrl} />

              <hr className="border-slate-200 dark:border-slate-800/60" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <Field label="Full Name" error={errors.name}>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400 pointer-events-none">
                      <Icon name="person" className="w-5 h-5" />
                    </span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={setField("name")}
                      placeholder="Your full name"
                      className={inputCls(errors.name)}
                      autoComplete="name"
                    />
                  </div>
                </Field>

                {/* Job Title */}
                <Field label="Job Title" error={errors.jobTitle}>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400 pointer-events-none">
                      <Icon name="briefcase" className="w-5 h-5" />
                    </span>
                    <input
                      type="text"
                      value={form.jobTitle}
                      onChange={setField("jobTitle")}
                      placeholder="e.g. Product Designer"
                      className={inputCls(errors.jobTitle)}
                    />
                  </div>
                </Field>

                {/* Bio */}
                <div className="col-span-1 md:col-span-2">
                  <Field
                    label="Short Bio"
                    error={errors.bio}
                    hint={`${form.bio.length}/500`}
                  >
                    <textarea
                      value={form.bio}
                      onChange={setField("bio")}
                      rows={3}
                      placeholder="I'm a digital artist based in..."
                      className={[
                        "w-full bg-slate-50 dark:bg-[#1e2e3e]",
                        "border text-slate-900 dark:text-white text-sm rounded-lg",
                        "focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec] outline-none",
                        "p-2.5 placeholder-slate-400 dark:placeholder-slate-500 resize-none transition-shadow",
                        errors.bio
                          ? "border-red-400 dark:border-red-500"
                          : "border-slate-200 dark:border-slate-700",
                      ].join(" ")}
                    />
                  </Field>
                </div>

                {/* Hobbies */}
                <div className="col-span-1 md:col-span-2">
                  <div className="flex justify-between items-baseline mb-1.5">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Hobbies
                    </label>
                  </div>
                  <HobbySelector
                    selected={form.hobbies}
                    onToggle={toggleHobby}
                    error={errors.hobbies}
                  />
                </div>
              </div>
            </form>

            {/* Footer actions */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between">
              <button
                type="button"
                className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white text-sm font-medium transition-colors"
                onClick={() => window.history.back()}
              >
                Skip for now
              </button>

              <button
                type="button"
                onClick={onSubmit}
                disabled={loading}
                className="bg-[#137fec] hover:bg-[#0f6bd0] disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-lg shadow-[#137fec]/20 flex items-center gap-2 transition-all active:scale-95"
              >
                {loading ? "Menyimpan..." : submitLabel}
                {!loading && <Icon name="arrow" className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileForm;