import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { getPlans, savePlans } from "../utils/storage";
import type { Plan, PlanTask } from "../types";

// ===== DAY COUNTDOWN — same logic as script.js renderPlanner() =====
function getDaysText(endDate: string): { text: string; isOverdue: boolean } {
  const end = new Date(endDate);
  const now = new Date();
  const endT = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
  const nowT = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const diffDays = Math.ceil((endT - nowT) / (1000 * 60 * 60 * 24));

  if (diffDays > 0) return { text: `باقي ${diffDays} يوم`, isOverdue: false };
  if (diffDays === 0) return { text: "النهاردة آخر يوم للجدول!", isOverdue: false };
  return { text: `الجدول انتهى من ${Math.abs(diffDays)} يوم`, isOverdue: true };
}

// ===== TASK DEADLINE DISPLAY =====
function TaskDeadlineBadge({ deadline }: { deadline: string }) {
  if (!deadline) return null;
  const now = new Date();
  const nowT = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const parts = deadline.split("-");
  const tEnd = new Date(
    parseInt(parts[0]),
    parseInt(parts[1]) - 1,
    parseInt(parts[2]),
  ).getTime();
  const tDiff = Math.ceil((tEnd - nowT) / (1000 * 60 * 60 * 24));

  let colorClass = "text-gray-400";
  let txt = `باقي ${tDiff} يوم`;
  if (tDiff < 0) {
    colorClass = "text-[#E30613]";
    txt = `متأخر ${Math.abs(tDiff)} يوم`;
  } else if (tDiff === 0) {
    colorClass = "text-yellow-500";
    txt = "النهاردة!";
  }

  return (
    <span
      className={`text-[10px] sm:text-xs mr-auto px-2 py-1 rounded-full bg-black/20 font-bold whitespace-nowrap ${colorClass}`}
    >
      {txt}
    </span>
  );
}

// ===== TASK ITEM =====
function TaskItem({
  task,
  planId,
  onToggle,
  onDelete,
}: {
  task: PlanTask;
  planId: number;
  onToggle: (planId: number, taskId: number) => void;
  onDelete: (planId: number, taskId: number) => void;
}) {
  return (
    <div
      onClick={() => onToggle(planId, task.id)}
      className="flex items-center gap-3 p-3 bg-white/5 rounded-lg mb-2 hover:bg-white/10 transition group cursor-pointer text-right"
    >
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          e.stopPropagation();
          onToggle(planId, task.id);
        }}
        onClick={(e) => e.stopPropagation()}
        className="w-4 h-4 accent-[#E30613] cursor-pointer shrink-0"
      />
      <span
        className={`text-sm flex-1 transition-all wrap-break-word ${
          task.done ? "text-gray-500 line-through" : "text-white"
        }`}
      >
        {task.text}
      </span>
      <TaskDeadlineBadge deadline={task.deadline} />
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(planId, task.id);
        }}
        className="text-gray-600 hover:text-[#E30613] text-xs opacity-100 md:opacity-0 group-hover:opacity-100 transition p-1 shrink-0"
      >
        مسح
      </button>
    </div>
  );
}

// ===== PLAN CARD =====
function PlanCard({
  plan,
  onDelete,
  onToggleTask,
  onDeleteTask,
  onAddTask,
}: {
  plan: Plan;
  onDelete: (id: number) => void;
  onToggleTask: (planId: number, taskId: number) => void;
  onDeleteTask: (planId: number, taskId: number) => void;
  onAddTask: (planId: number, text: string, deadline: string) => void;
}) {
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");
  const [showDateInput, setShowDateInput] = useState(false);

  const totalTasks = plan.tasks.length;
  const doneTasks = plan.tasks.filter((t) => t.done).length;
  const progress = totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);
  const { text: daysText, isOverdue } = getDaysText(plan.endDate);

  const handleAddTask = () => {
    if (!newTaskText.trim()) return;
    onAddTask(plan.id, newTaskText.trim(), newTaskDeadline);
    setNewTaskText("");
    setNewTaskDeadline("");
    setShowDateInput(false);
  };

  return (
    <div className="bg-[#1a1a1a] p-5 sm:p-6 rounded-2xl border-t-4 border-[#E30613] relative overflow-hidden group/plan mt-2 shadow-sm hover:shadow-md transition">
      {/* Header */}
      <div className="flex justify-between items-start mb-4 pr-1">
        <div className="max-w-[70%] text-right">
          <h3 className="text-xl font-bold text-white mb-1">{plan.title}</h3>
          <span
            className={`inline-block text-xs font-bold px-2 py-1 rounded bg-white/5 ${
              isOverdue ? "text-[#E30613]" : "text-gray-400"
            }`}
          >
            خطة {plan.days} أيام — {daysText}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-1 pl-2 md:pl-0">
          <span className="text-2xl font-black text-[#E30613]">{progress}%</span>
          <button
            onClick={() => onDelete(plan.id)}
            className="text-gray-500 transition p-2 z-10 md:opacity-0 group-hover/plan:opacity-100 bg-white/5 rounded-full hover:bg-[#E30613] hover:text-white flex items-center justify-center shrink-0"
            title="مسح الخطة"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-black/40 h-2.5 rounded-full overflow-hidden mb-6 shadow-inner">
        <div
          className="bg-[#E30613] h-full transition-all duration-1000 ease-out shadow-[0_0_10px_#E30613]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Tasks */}
      <div className="mb-4 text-right">
        <h4 className="text-sm font-bold text-gray-300 mb-3 border-b border-white/5 pb-2">
          المهام المطلوبة
        </h4>
        <div className="space-y-1">
          {plan.tasks.map((t) => (
            <TaskItem
              key={t.id}
              task={t}
              planId={plan.id}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
            />
          ))}
        </div>
      </div>

      {/* Add Task */}
      <div className="flex flex-col sm:flex-row gap-2 mt-4 pt-4 border-t border-white/5">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddTask();
          }}
          placeholder="مهمة جديدة..."
          className="flex-1 bg-white/5 border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-[#E30613] transition placeholder:text-gray-600"
        />
        <input
          type={showDateInput ? "date" : "text"}
          value={newTaskDeadline}
          onFocus={() => setShowDateInput(true)}
          onBlur={() => {
            if (!newTaskDeadline) setShowDateInput(false);
          }}
          onChange={(e) => setNewTaskDeadline(e.target.value)}
          placeholder="تاريخ الانتهاء (اختياري)"
          title="تحديد موعد نهائي للمهمة"
          className="w-full sm:w-32 lg:w-40 bg-white/5 border border-white/10 rounded-lg p-2.5 text-gray-400 text-sm focus:outline-none focus:border-[#E30613] transition placeholder:text-gray-600 sm:text-center shrink-0 focus:text-white"
          style={{ colorScheme: "dark" }}
        />
        <button
          onClick={handleAddTask}
          className="bg-white/10 hover:bg-[#E30613] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition shrink-0"
        >
          إضافة
        </button>
      </div>
    </div>
  );
}

// ===== PLANNER PAGE =====
export function Planner() {
  const { showToast, showConfirm } = useApp();
  const [plans, setPlans] = useState<Plan[]>(() => getPlans());
  const [planTitle, setPlanTitle] = useState("");
  const [planDays, setPlanDays] = useState("");

  const handleSavePlan = () => {
    const days = parseInt(planDays);
    if (!planTitle.trim() || isNaN(days) || days <= 0) {
      showToast("اكتب اسم الخطة وعدد الأيام بشكل صحيح!", "error");
      return;
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + days);

    const plan: Plan = {
      id: Date.now(),
      title: planTitle.trim(),
      days,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      tasks: [],
    };

    const updated = [plan, ...plans];
    savePlans(updated);
    setPlans(updated);
    setPlanTitle("");
    setPlanDays("");
    showToast("تم إنشاء الخطة بنجاح!", "success");
  };

  const handleDeletePlan = (id: number) => {
    showConfirm(
      "مسح الخطة",
      "أكيد عايز تمسح الخطة دي بكل مهامها وتقاريرها؟",
      () => {
        const updated = plans.filter((p) => p.id !== id);
        savePlans(updated);
        setPlans(updated);
        showToast("تم مسح الخطة.", "success");
      },
    );
  };

  const handleToggleTask = (planId: number, taskId: number) => {
    const updated = plans.map((p) => {
      if (p.id !== planId) return p;
      return {
        ...p,
        tasks: p.tasks.map((t) =>
          t.id === taskId ? { ...t, done: !t.done } : t,
        ),
      };
    });
    savePlans(updated);
    setPlans(updated);
  };

  const handleDeleteTask = (planId: number, taskId: number) => {
    const updated = plans.map((p) => {
      if (p.id !== planId) return p;
      return { ...p, tasks: p.tasks.filter((t) => t.id !== taskId) };
    });
    savePlans(updated);
    setPlans(updated);
  };

  const handleAddTask = (planId: number, text: string, deadline: string) => {
    if (!text) {
      showToast("اكتب المهمة الأول!", "error");
      return;
    }
    const updated = plans.map((p) => {
      if (p.id !== planId) return p;
      return {
        ...p,
        tasks: [
          ...p.tasks,
          { id: Date.now(), text, deadline, done: false } as PlanTask,
        ],
      };
    });
    savePlans(updated);
    setPlans(updated);
  };

  return (
    <div>
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white">
          خطة الأيام
        </h1>
      </header>

      {/* New Plan Form */}
      <div className="bg-[#1a1a1a] p-6 rounded-2xl border-t-4 border-[#E30613] max-w-3xl mb-10">
        <h3 className="text-[#E30613] font-bold text-xl mb-4 border-b border-white/5 pb-2">
          خطة جديدة
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs text-gray-500 block mb-1">
              اسم الخطة / الهدف
            </label>
            <input
              type="text"
              value={planTitle}
              onChange={(e) => setPlanTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSavePlan();
              }}
              placeholder="مثال: زنقة ميد، زنقة فاينل، أو تاسكات"
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#E30613] transition placeholder:text-gray-600"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">
              عدد الأيام
            </label>
            <input
              type="number"
              value={planDays}
              onChange={(e) => setPlanDays(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSavePlan();
              }}
              placeholder="مثال: 10"
              min={1}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#E30613] transition placeholder:text-gray-600"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSavePlan}
            className="bg-[#E30613] text-white px-6 py-2 rounded-lg hover:bg-[#c30510] transition-all font-bold tracking-wide"
          >
            إنشاء الخطة
          </button>
        </div>
      </div>

      {/* Plans List */}
      <div className="max-w-3xl space-y-6">
        {plans.length === 0 ? (
          <div className="text-center py-12 text-gray-600">
            <p className="text-sm">مفيش خطط حالياً.. ابدأ خطط لأهدافك!</p>
          </div>
        ) : (
          plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onDelete={handleDeletePlan}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
              onAddTask={handleAddTask}
            />
          ))
        )}
      </div>
    </div>
  );
}
