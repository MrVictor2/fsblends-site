export default function BackgroundLogo() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1]">
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,.35)_0%,transparent_60%)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="/fs-logo.svg"
          alt=""
          className="opacity-100 w-[min(85vw,900px)] h-auto select-none"
          draggable={false}
        />
      </div>
    </div>
  );
}
