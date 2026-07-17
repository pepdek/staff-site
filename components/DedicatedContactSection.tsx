import Reveal from "./Reveal";
import DedicatedContactCard from "./DedicatedContactCard";

export default function DedicatedContactSection() {
  return (
    <section className="border-t border-hairline px-6 py-16">
      <div className="mx-auto max-w-xl">
        <Reveal>
          <DedicatedContactCard />
        </Reveal>
      </div>
    </section>
  );
}
