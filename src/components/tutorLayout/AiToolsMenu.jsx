import { useEffect, useState } from "react";
import Icon from "./Icons";

export default function AiToolsMenu({ onClose, anchorRef }) {
  const [pos, setPos] = useState({ top: 70, right: 40 });

  // Position dropdown under the AI button
  useEffect(() => {
    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPos({
        top: rect.bottom + 10,
        right: window.innerWidth - rect.right,
      });
    }
  }, [anchorRef]);

  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/10 backdrop-blur-[1px] z-20"
      />

      {/* MENU WRAPPER */}
      <div
        style={{ top: pos.top, right: pos.right }}
        className="
          fixed w-[820px] p-8 bg-[#FFFFFF] rounded-[20px]
          shadow-[5px_5px_50px_0px_rgba(26,32,44,0.06)]
          flex flex-col gap-10 z-30 transition-all
        "
      >

        {/* HEADER */}
        <div className="flex justify-between items-start">
          {/* LEFT TEXT */}
          <div className="w-[380px] flex flex-col gap-2">
            <div className="flex items-center gap-1">

              {/* MAIN ICON — replaced with your Icon component */}
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-Primary-Normal">
                <Icon icon="aiLogo" size={30} />
              </div>

              <p className="text-Black-Heading text-xl font-medium">
                Kynda AI Assistant Tools
              </p>
            </div>

            <p className="text-Black-Body text-sm leading-5">
              Create customised quizzers with multiple question types
            </p>
          </div>

          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="
              p-2 bg-white rounded-full 
              outline outline-1 outline-White-Stroke flex items-center justify-center
              cursor-pointer
            "
          >
            <Icon icon="closeIcon" size={20} />
          </button>
        </div>

        {/* TOOL CARDS */}
        <div className="flex gap-5">

          {/* CARD 1 — LESSON PLAN */}
          <div className="w-64 p-4 bg-[#F9F9F9] rounded-xl outline outline-1 outline-[#E5E5E5] flex flex-col gap-2
              cursor-pointer hover:shadow-[0px_4px_12px_rgba(0,0,0,0.10)]
              hover:outline-[#E6F6F9]
              hover:-translate-y-[2px]">
            <div className="w-10 h-10 bg-[#E6F6F9] rounded-full flex items-center justify-center">
              <Icon icon="bookOpenText" size={22} />
            </div>

            <div className="flex flex-col gap-1 mt-1">
              <p className="text-[#2D2D2D] text-lg font-semibold">
                Lesson Plan Generator
              </p>
              <p className="text-[#6B7280] text-sm leading-5">
                Generate comprehensive lesson plans with activities and assessments
              </p>
            </div>
          </div>

          {/* CARD 2 — QUIZ GENERATOR */}
          <div className="w-64 p-4 bg-[#F9F9F9] rounded-xl outline outline-1 outline-[#E5E5E5] flex flex-col gap-2
              cursor-pointer hover:shadow-[0px_4px_12px_rgba(0,0,0,0.10)]
              hover:outline-[#E6F6F9]
              hover:-translate-y-[2px]">
            <div className="w-10 h-10 bg-[#FFEEE9] rounded-full flex items-center justify-center">
              <Icon icon="questionMark" size={22} />
            </div>

            <div className="flex flex-col gap-1 mt-1">
              <p className="text-[#2D2D2D] text-lg font-semibold">
                Quiz Generator
              </p>
              <p className="text-[#6B7280] text-sm leading-5">
                Create customised quizzers with multiple question types
              </p>
            </div>
          </div>

          {/* CARD 3 — SESSION SUMMARY */}
          <div className="w-64 p-4 bg-[#F9F9F9] rounded-xl outline outline-1 outline-[#E5E5E5] flex flex-col gap-2
              cursor-pointer hover:shadow-[0px_4px_12px_rgba(0,0,0,0.10)]
              hover:outline-[#E6F6F9]
              hover:-translate-y-[2px]">
            <div className="w-10 h-10 bg-[#E9E9F3] rounded-full flex items-center justify-center">
              <Icon icon="files" size={22} />
            </div>

            <div className="flex flex-col gap-1 mt-1">
              <p className="text-[#2D2D2D] text-lg font-semibold">
                Session Summary
              </p>
              <p className="text-[#6B7280] text-sm leading-5">
                Generate detailed summaries of completed tutoring sessions.
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
