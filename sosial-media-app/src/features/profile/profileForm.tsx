import React, { useRef } from "react";
import type { Profile } from "../../type/profile";
import { HOBBY_OPTIONS } from "../../constant/hobbies";

export type ProfileFormProps = {
  form: Profile;
  setField: (field: keyof Profile) => (v: any) => void;
  toggleHobby: (hobby: string) => void;
  setAvatarUrl: (url: string) => void;
  errors: Record<string, string>;
  onSubmit: () => Promise<any> | void;
  loading?: boolean;
};

const Icon = ({ name, className = "w-5 h-5" }: any) => {
  const icons: Record<string, any> = {
    person: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
    briefcase: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0"
        />
      </svg>
    ),
    camera: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
      </svg>
    ),
    check: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
    ),
    arrow: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
      </svg>
    ),
    sparkle: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
        />
      </svg>
    ),
  };
  return icons[name] || null;
};

const Field = ({ label, error, children, hint }: any) => (
  <div>
    <div className="flex justify-between items-baseline mb-1.5">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
      {hint && <span className="text-xs text-slate-400">{hint}</span>}
    </div>
    {children}
    {error && (
      <p className="mt-1.5 text-xs text-red-500 dark:text-red-400 flex items-center gap-1">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
        </svg>
        {error}
      </p>
    )}
  </div>
);

const inputCls = `
  w-full bg-slate-50 dark:bg-[#1e2e3e] border border-slate-200 dark:border-slate-700
  text-slate-900 dark:text-white text-sm rounded-lg
  focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec] outline-none
  pl-10 p-2.5 placeholder-slate-400 dark:placeholder-slate-500
  transition-shadow
`.trim();

const inputWithIconCls = (hasError: any) => `${inputCls} ${hasError ? "border-red-400 dark:border-red-500 focus:ring-red-400" : ""}`;

const AvatarUpload = ({ avatarUrl, onChange }: any) => {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onChange(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center gap-6">
      <div
        className="relative group w-24 h-24 rounded-full bg-slate-100 dark:bg-[#1e2e3e] border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#137fec] transition-colors flex-shrink-0"
        onClick={() => fileRef.current?.click()}
      >
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <Icon name="camera" className="w-8 h-8 text-slate-400" />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
          <Icon name="camera" className="w-6 h-6 text-white" />
        </div>
      </div>

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

      <div>
        <p className="font-semibold text-slate-900 dark:text-white text-sm">Profile Photo</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 mb-3">PNG, JPEG, or GIF under 10MB</p>
        <button type="button" onClick={() => fileRef.current?.click()} className="text-sm font-medium text-[#137fec] hover:text-[#0f6bd0] transition-colors">
          Upload Image
        </button>
      </div>
    </div>
  );
};

export default function ProfileForm({ form, setField, toggleHobby, setAvatarUrl, errors, onSubmit, loading }: ProfileFormProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-[#101922] p-4 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      <main className="w-full max-w-3xl bg-white dark:bg-[#182430] rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800/60 relative">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100 dark:bg-[#1e2e3e]">
          <div
            className="h-full bg-[#137fec] rounded-r-full transition-all duration-500"
            style={{
              width: `${Math.round(([form.avatarUrl, form.name, form.jobTitle, form.bio, form.hobbies.length > 0].filter(Boolean).length / 5) * 100)}%`,
              boxShadow: "0 0 10px rgba(19,127,236,0.5)",
            }}
          />
        </div>

        <div className="flex flex-col md:flex-row min-h-[600px]">
          <aside className="hidden md:flex md:w-1/3 bg-slate-50 dark:bg-[#1e2e3e] p-8 flex-col justify-between border-r border-slate-200 dark:border-slate-800/60 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#137fec]/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="w-10 h-10 bg-[#137fec] rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-[#137fec]/30">
                <Icon name="sparkle" className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Build your presence</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">A complete profile helps you connect with the right people and communities. You're almost there!</p>
            </div>
          </aside>

          <div className="flex-1 p-6 md:p-10 flex flex-col">
            <header className="mb-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Complete your profile</h1>
                  <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Tell us a bit more about yourself.</p>
                </div>
              </div>
            </header>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
              className="space-y-6 flex-1 overflow-y-auto pr-1"
            >
              <AvatarUpload avatarUrl={form.avatarUrl} onChange={setAvatarUrl} />

              <hr className="border-slate-200 dark:border-slate-800/60" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Full Name" error={errors.name}>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400">
                      <Icon name="person" className="w-5 h-5" />
                    </span>
                    <input type="text" value={form.name} onChange={setField("name")} placeholder="Your full name" className={inputWithIconCls(errors.name)} />
                  </div>
                </Field>

                <Field label="Job Title" error={errors.jobTitle}>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400">
                      <Icon name="briefcase" className="w-5 h-5" />
                    </span>
                    <input type="text" value={form.jobTitle} onChange={setField("jobTitle")} placeholder="e.g. Product Designer" className={inputWithIconCls(errors.jobTitle)} />
                  </div>
                </Field>

                <div className="col-span-1 md:col-span-2">
                  <Field label="Short Bio" error={errors.bio} hint={`${form.bio.length}/500`}>
                    <textarea
                      value={form.bio}
                      onChange={setField("bio")}
                      rows={3}
                      placeholder="I'm a digital artist based in..."
                      className={`
                        w-full bg-slate-50 dark:bg-[#1e2e3e] border border-slate-200 dark:border-slate-700
                        text-slate-900 dark:text-white text-sm rounded-lg
                        focus:ring-2 focus:ring-[#137fec] focus:border-[#137fec] outline-none
                        p-2.5 placeholder-slate-400 dark:placeholder-slate-500 resize-none transition-shadow
                        ${errors.bio ? "border-red-400 dark:border-red-500" : ""}
                      `}
                    />
                  </Field>
                </div>

                <div className="col-span-1 md:col-span-2">
                  <Field label="Hobbies" error={errors.hobbies}>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {HOBBY_OPTIONS.map((hobby) => {
                        const active = form.hobbies.includes(hobby);
                        return (
                          <button
                            key={hobby}
                            type="button"
                            onClick={() => toggleHobby(hobby)}
                            className={`
                              flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
                              border transition-all duration-150
                              ${
                                active
                                  ? "bg-[#137fec]/20 border-[#137fec]/40 text-[#137fec] hover:bg-[#137fec]/30"
                                  : "bg-slate-100 dark:bg-[#1e2e3e] border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                              }
                            `}
                          >
                            {hobby}
                            {active && <Icon name="check" className="w-3.5 h-3.5" />}
                          </button>
                        );
                      })}
                    </div>
                  </Field>
                </div>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between">
              <button type="button" className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white text-sm font-medium transition-colors">
                Skip for now
              </button>
              <button
                type="submit"
                onClick={() => onSubmit()}
                disabled={loading}
                className="bg-[#137fec] hover:bg-[#0f6bd0] text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-lg shadow-[#137fec]/20 flex items-center gap-2 transition-all active:scale-95"
              >
                Continue
                <Icon name="arrow" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
