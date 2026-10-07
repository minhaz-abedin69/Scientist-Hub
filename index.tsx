import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "শৈবাল — বিবর্তন, বিজ্ঞানী ও মহাকাশ গবেষণা" },
      { name: "description", content: "শৈবালের বিবর্তন ও মহাকাশ গবেষণার বাংলা উপস্থাপনা: বিজ্ঞানীদের পরিচয়, জীবনকাল ও দলের নির্ধারিত অংশ।" },
      { property: "og:title", content: "শৈবাল — বিবর্তন, বিজ্ঞানী ও মহাকাশ গবেষণা" },
      { property: "og:description", content: "বিজ্ঞানী ও দলের অংশসহ শৈবাল নিয়ে বাংলা উপস্থাপনা।" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <iframe className="presentation-frame" src="/algae/presentation.html" title="শৈবাল: বিবর্তন, বৈচিত্র্য ও মহাকাশ গবেষণায় সম্ভাবনা" />
  );
}
