"use client";

import {
    useFloating,
    offset,
    flip,
    shift,
    arrow,
    useHover,
    useClick,
    useDismiss,
    useRole,
    useInteractions,
    FloatingPortal,
    safePolygon,
} from "@floating-ui/react";
import { useRef, useState } from "react";

export default function SmartTooltip({
    children,
    content,
}: {
    children: React.ReactNode;
    content: React.ReactNode;
}) {
    const arrowRef = useRef(null);
    const [open, setOpen] = useState(false);

    const { refs, floatingStyles, middlewareData, placement, context } =
        useFloating({
            open,
            onOpenChange: setOpen,
            placement: "right",
            middleware: [
                offset(10),
                flip(),
                shift({ padding: 8 }),
                arrow({ element: arrowRef }),
            ],
        });

    const hover = useHover(context, {
        handleClose: safePolygon(),
    });

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
        hover,
        click,
        dismiss,
        role,
    ]);

    const { x: arrowX, y: arrowY } = middlewareData.arrow || {};

    const staticSide = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right",
    }[placement.split("-")[0] as "top" | "right" | "bottom" | "left"] as
        | "top"
        | "right"
        | "bottom"
        | "left";

    return (
        <>
            {/* TRIGGER */}
            <div ref={refs.setReference} {...getReferenceProps()}>
                {children}
            </div>

            {/* TOOLTIP */}
            {open && (
                <FloatingPortal>
                    <div
                        ref={refs.setFloating}
                        style={floatingStyles}
                        {...getFloatingProps()}
                        className="
              z-[9999] w-52 p-2.5 rounded-lg text-[11px]
              bg-white text-slate-800
              dark:bg-slate-900 dark:text-slate-100
              border border-slate-200 dark:border-slate-700
              shadow-xl
            "
                    >
                        {content}

                        <div
                            ref={arrowRef}
                            className="
                absolute w-3 h-3 rotate-45
                bg-white dark:bg-slate-900
                border-l border-t
                border-slate-200 dark:border-slate-700
              "
                            style={{
                                left: arrowX != null ? `${arrowX}px` : "",
                                top: arrowY != null ? `${arrowY}px` : "",
                                right: "",
                                bottom: "",
                                [staticSide]: "-6px",
                            }}
                        />
                    </div>
                </FloatingPortal>
            )}
        </>
    );
}