import {
  getSubjectsConfig,
  getSubjectsData,
  getCoursesConfig,
  getCoursesData,
} from "../utils/storage";

// ===== STAT CARD =====
function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5 border-t-[3px] border-t-[#E30613] shadow-md hover:bg-white/5 transition flex flex-col items-center justify-center">
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <p className="text-4xl font-black text-white">{value}</p>
      <p className="text-xs text-gray-500 mt-2 bg-black/20 px-3 py-1 rounded-full">
        {sub}
      </p>
    </div>
  );
}

// ===== MINI CARD =====
function MiniCard({
  name,
  percent,
  sub,
}: {
  name: string;
  percent: number;
  sub: string;
}) {
  return (
    <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5 hover:border-white/10 transition group flex flex-col justify-between">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold text-white group-hover:text-[#E30613] transition">
          {name}
        </h3>
        <span className="text-xs font-bold px-2 py-1 rounded bg-[#E30613]/10 text-[#E30613]">
          {percent}%
        </span>
      </div>
      <div>
        <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden mb-2">
          <div
            className="bg-[#E30613] h-full transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 text-left">{sub}</p>
      </div>
    </div>
  );
}

// ===== HOME PAGE =====
export function Home() {
  const subCfg = getSubjectsConfig();
  const subData = getSubjectsData();
  const crsCfg = getCoursesConfig();
  const crsData = getCoursesData();

  // Compute stats — same logic as renderHome() in script.js
  let totalLec = 0;
  let doneLec = 0;
  let subTotal = 0;

  subCfg.forEach((sub) => {
    const lectures = subData[sub.name] ?? Array(sub.lectures).fill(false);
    totalLec += sub.lectures;
    doneLec += lectures.filter(Boolean).length;
    subTotal += Math.round(
      (lectures.filter(Boolean).length / sub.lectures) * 100,
    );
  });

  let crsTotal = 0;
  crsCfg.forEach((c) => {
    crsTotal += crsData[c.name] ?? 0;
  });

  const subAvg = subCfg.length ? Math.round(subTotal / subCfg.length) : 0;
  const crsAvg = crsCfg.length ? Math.round(crsTotal / crsCfg.length) : 0;

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold">
          جاهز لإنجاز جديد{" "}
          <span className="text-[#E30613]">النهاردة؟</span>
        </h1>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mb-12">
        <StatCard
          label="محاضرات خلصت"
          value={String(doneLec)}
          sub={`من ${totalLec} محاضرة`}
        />
        <StatCard
          label="متوسط المواد"
          value={`${subAvg}%`}
          sub="إجمالي التقدم"
        />
        <StatCard
          label="متوسط الكورسات"
          value={`${crsAvg}%`}
          sub="إجمالي التقدم"
        />
      </div>

      {/* Subjects Mini Cards */}
      <p className="text-sm text-gray-400 mb-4 font-bold">مواد الكلية</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mb-12">
        {subCfg.map((sub) => {
          const lectures =
            subData[sub.name] ?? Array(sub.lectures).fill(false);
          const done = lectures.filter(Boolean).length;
          const percent = Math.round((done / sub.lectures) * 100);
          return (
            <MiniCard
              key={sub.name}
              name={sub.name}
              percent={percent}
              sub={`${done} من ${sub.lectures} محاضرة`}
            />
          );
        })}
      </div>

      {/* Courses Mini Cards */}
      <p className="text-sm text-gray-400 mb-4 font-bold">تتبع الكورسات</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl">
        {crsCfg.map((c) => {
          const percent = crsData[c.name] ?? 0;
          return (
            <MiniCard
              key={c.name}
              name={c.name}
              percent={percent}
              sub="التقدم الكلي"
            />
          );
        })}
      </div>
    </div>
  );
}
