"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type QuickBuyOptions = {
  size: "6oz" | "8oz" | "10oz";
  color: "black" | "white";
};

export function QuickBuyDialog({
  trigger,
  productName,
  onConfirm,
}: {
  trigger: React.ReactNode;                 // the button shown on the card
  productName: string;
  onConfirm: (opts: QuickBuyOptions) => void; // we’ll wire this to the cart later
}) {
  const [open, setOpen] = React.useState(false);
  const [size, setSize] = React.useState<QuickBuyOptions["size"]>("8oz");
  const [color, setColor] = React.useState<QuickBuyOptions["color"]>("black");

  function handleConfirm() {
    onConfirm({ size, color });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle className="text-base md:text-lg">
            Quick buy — {productName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* Size */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Size</Label>
            <RadioGroup
              value={size}
              onValueChange={(v) => setSize(v as QuickBuyOptions["size"])}
              className="grid grid-cols-3 gap-2"
            >
              {(["6oz", "8oz", "10oz"] as const).map((s) => (
                <Label
                  key={s}
                  className={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-2 text-sm font-medium transition hover:bg-muted ${
                    size === s ? "border-black" : "border-neutral-300"
                  }`}
                >
                  <RadioGroupItem value={s} id={`size-${s}`} className="sr-only" />
                  {s.replace("oz", " oz")}
                </Label>
              ))}
            </RadioGroup>
          </div>

          {/* Color */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Color</Label>
            <RadioGroup
              value={color}
              onValueChange={(v) => setColor(v as QuickBuyOptions["color"])}
              className="grid grid-cols-2 gap-2"
            >
              {(["black", "white"] as const).map((c) => (
                <Label
                  key={c}
                  className={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-2 text-sm font-medium transition hover:bg-muted ${
                    color === c ? "border-black" : "border-neutral-300"
                  }`}
                >
                  <RadioGroupItem value={c} id={`color-${c}`} className="sr-only" />
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </Label>
              ))}
            </RadioGroup>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Add to cart</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
