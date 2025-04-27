type TooltipVarint = "neutral" | "positive" | "negative";

type TooltipProps = {
  tip: string;
  content: React.ReactNode;
  variant?: TooltipVarint;
};

const getTooltipVariantClassname = (variant: TooltipVarint): string => {
  switch (variant) {
    case "neutral":
      return "tooltip-neutral";
    case "negative":
      return "tooltip-error";
    case "positive":
      return "tooltip-success";
  }
};

const Tooltip = ({ tip, content, variant = "neutral" }: TooltipProps) => {
  const tooltipVariant = getTooltipVariantClassname(variant);
  return (
    <div className={`tooltip ${tooltipVariant}`}>
      <div className="tooltip-content">
        <div>{tip}</div>
      </div>
      {content}
    </div>
  );
};

export default Tooltip;
