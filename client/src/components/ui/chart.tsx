import * as React from "react";
import { cn } from "../../lib/utils"; // adjust if you don’t use this utility

export interface ChartConfig {
    [key: string]: {
        label: string;
        color?: string;
    };
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    config: ChartConfig;
}

export const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
    ({ config, className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                role="figure"
                aria-roledescription="chart"
                className={cn("relative w-full overflow-x-auto", className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);
ChartContainer.displayName = "ChartContainer";

interface ChartTooltipContentProps {
    className?: string;
    labelFormatter?: (label: any) => React.ReactNode;
    nameKey?: string;
}

export function ChartTooltipContent({
    className,
    labelFormatter,
    nameKey = "name",
    ...props
}: ChartTooltipContentProps) {
    return ({ active, payload, label }: any) => {
        if (!active || !payload || !payload.length) return null;

        return (
            <div
                className={cn(
                    "rounded-md border bg-background px-3 py-2 text-sm shadow-sm",
                    className
                )}
                {...props}
            >
                <div className="font-medium">
                    {labelFormatter ? labelFormatter(label) : label}
                </div>
                <div className="mt-2 flex flex-col gap-1">
                    {payload.map((entry: any, index: number) => (
                        <div key={`item-${index}`} className="flex items-center justify-between">
                            <span className="text-muted-foreground">{entry.name}</span>
                            <span>{entry.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };
}

export function ChartTooltip(props: any) {
    return <props.type {...props} />;
}
