"use client";

import { Check, XCircle, CalendarDays, Circle, Plus, Trash2, Save, X } from "lucide-react";

export default function EditStepsPanel({
  steps,
  setSteps,
  onSave,
  onCancel,
}: any) {
  const updateStep = (index: number, key: string, value: any) => {
    const copy = [...steps];
    copy[index][key] = value;
    setSteps(copy);
  };

  const addStep = () => {
    setSteps([...steps, { name: "", done: false, result: "", date: new Date().toISOString().split('T')[0] }]);
  };

  const removeStep = (index: number) => {
    const copy = steps.filter((_: any, i: number) => i !== index);
    setSteps(copy);
  };

  return (
    <div className="mt-8 space-y-6 animate-in fade-in zoom-in-95 duration-300">
      
      {/* HEADER ACTION */}
      <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">Edit Journey Steps</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Customize your application process</p>
        </div>

        <button
          onClick={addStep}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95"
        >
          <Plus size={14} strokeWidth={3} />
          Add Step
        </button>
      </div>

      {/* STEPS LIST */}
      <div className="space-y-4">
        {steps.map((step: any, i: number) => (
          <div
            key={i}
            className="group relative p-5 rounded-[1.5rem] border bg-white dark:bg-slate-900 
            border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:border-blue-500/30"
          >
            {/* DELETE BUTTON (Top Right) */}
            <button 
              onClick={() => removeStep(i)}
              className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-red-500 rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={14} />
            </button>

            <div className="flex flex-col md:flex-row gap-4">
              {/* LEFT SIDE: Name & Status */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                   <div className="flex-shrink-0">
                    {step.done ? (
                      <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
                        <Check size={14} className="text-green-600 dark:text-green-400" strokeWidth={3} />
                      </div>
                    ) : step.result === "FAILED" ? (
                      <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center">
                        <XCircle size={14} className="text-red-600 dark:text-red-400" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <Circle size={14} className="text-slate-400" />
                      </div>
                    )}
                  </div>
                  <input
                    value={step.name}
                    onChange={(e) => updateStep(i, "name", e.target.value)}
                    placeholder="E.g. Technical Interview"
                    className="w-full bg-transparent text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-4 pl-9">
                   {/* TOGGLE DONE */}
                  <label className="flex items-center gap-2 cursor-pointer group/check">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={step.done}
                        onChange={() => updateStep(i, "done", !step.done)}
                        className="peer sr-only"
                      />
                      <div className="w-10 h-5 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-checked:bg-green-500 transition-colors" />
                      <div className="absolute left-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Mark Done</span>
                  </label>

                  {/* SELECT RESULT */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Result:</span>
                    <select
                      value={step.result || ""}
                      onChange={(e) => updateStep(i, "result", e.target.value || null)}
                      className="bg-slate-100 dark:bg-slate-800 text-[11px] font-bold px-2 py-1 rounded-lg text-slate-600 dark:text-slate-300 focus:outline-none ring-1 ring-inset ring-slate-200 dark:ring-slate-700"
                    >
                      <option value="">Pending</option>
                      <option value="PASSED">Passed</option>
                      <option value="FAILED">Failed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: Date Picker */}
              <div className="flex-shrink-0 flex items-end">
                 <div className="relative w-full md:w-44">
                    <CalendarDays size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      type="date"
                      value={step.date || ""}
                      onChange={(e) => updateStep(i, "date", e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER ACTION BUTTONS */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
        >
          <X size={18} />
          Discard
        </button>

        <button
          onClick={onSave}
          className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-slate-900/10 dark:shadow-white/5"
        >
          <Save size={18} />
          Update Timeline
        </button>
      </div>
    </div>
  );
}