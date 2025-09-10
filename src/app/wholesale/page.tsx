// src/app/wholesale/page.tsx
import { Button } from "@/components/ui/button";

const FAIRE_URL = "https://www.faire.com/"; // TODO: replace with your actual Faire direct link

export default function WholesalePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Wholesale</h1>
      <p className="text-neutral-700">
        Interested in carrying FS Blends? We offer small-batch wholesale with flexible MOQs and quick lead times.
      </p>

      <ul className="list-disc pl-6 text-neutral-700">
        <li>MOQ: 24 units (mix &amp; match scents)</li>
        <li>Lead time: 1–2 weeks</li>
        <li>Private label available on request</li>
      </ul>

      <div className="flex flex-wrap gap-3">
  <Button variant="outline" disabled>
    Faire account coming soon
  </Button>
  <Button asChild>
    <a href="mailto:hello@fsblends.com?subject=Wholesale%20Inquiry&body=Hi%20FS%20Blends%2C%0A%0AMy%20store%20name%3A%0ALocation%3A%0AEstimated%20monthly%20order%3A%0AQuestions%3A%0A%0AThanks!">
      Request wholesale info
    </a>
  </Button>
</div>


      <p className="text-xs text-neutral-500">
        Tip: update <code>FAIRE_URL</code> above with your direct Faire shop link when you have it.
      </p>
    </div>
  );
}
