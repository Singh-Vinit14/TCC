import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { gallery } from "@/lib/sample-data";

export const metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <Section eyebrow="Firebase Storage ready" title="Club gallery">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {gallery.map((item) => (
          <article key={item.id} className="group glass overflow-hidden rounded-lg">
            <div className="relative h-72">
              <Image src={item.image} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <div className="p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-turf">{item.tag}</p>
              <h3 className="mt-1 text-xl font-black">{item.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
