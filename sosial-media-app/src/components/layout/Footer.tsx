const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-[#182430] border-t border-slate-200 dark:border-slate-800/60 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">

        {/* Branding */}
        <div className="flex items-center gap-2">
          {/* Dot aksen — sama seperti logo sparkle di ProfileForm */}
          <span className="w-2 h-2 rounded-full bg-[#137fec] shadow-[0_0_6px_rgba(19,127,236,0.6)]" />
          <span className="text-sm font-semibold text-slate-800 dark:text-white tracking-tight">
            SukmaPutra
          </span>
        </div>

        {/* Copy */}
        <p className="text-xs text-slate-400 dark:text-slate-500 text-center">
          Dibuat dengan{" "}
          <span className="text-[#137fec] font-medium">React</span>
          {" & "}
          <span className="text-[#137fec] font-medium">Firebase</span>
        </p>

        {/* Tech badges */}
        <div className="flex items-center gap-2">
          {["React", "Firebase", "TypeScript"].map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-[#1e2e3e] text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
            >
              {tech}
            </span>
          ))}
        </div>

      </div>
    </footer>
  );
};

export default Footer;